import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

persistent actor Token {
    var owner : Principal = Principal.fromText("atgcn-2romk-43qmh-22aa5-mmwlc-pj2u5-n3lh3-zt3kf-njpvk-tusee-uqe");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "MNSN";

    private var balanceEntries : [(Principal, Nat)] = [];

    private transient var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who : Principal) : async Nat {
        switch (balances.get(who)) {
            case (?n) { n };
            case (null) { 0 };
        };
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared func payOut(who : Principal) : async Text {
        // if (balances.get(msg.caller) != null) {
        //     return "Already claimed.";
        // };

        let currentBalance = await balanceOf(who);
        if (currentBalance > 0) {
            return "Already claimed. Your balance is " # debug_show (currentBalance) # " MNSN.";
        };
        let amount = 10000;
        let result = await transfer(who, amount);
        return result;
    };

    public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance > amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance : Nat = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success!";
        } else {
            return "Insufficient funds.";
        };
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        };
    };
};
