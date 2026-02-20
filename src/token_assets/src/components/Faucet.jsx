import React, {useState} from "react";
import { canisterId, createActor } from "../actor.js";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

function Faucet(props) {
  const [isDisabled, setDisabled] = useState(false)
  const [buttonText, setText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const agent = new HttpAgent({ identity });

    const authenticatedCanister = createActor(
      canisterId, 
      { 
        options: { 
          agent,
        }, 
      }
    );

    const userPrincipal = identity.getPrincipal();

    const result = await authenticatedCanister.payOut(userPrincipal);
    setText(result);
    setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Monsuun tokens here! Claim 10,000 MNSN coins to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
