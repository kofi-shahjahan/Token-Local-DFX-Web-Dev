import { Actor, HttpAgent } from "@dfinity/agent";

import { idlFactory } from "../../declarations/token/token.did.js";

export const canisterId = import.meta.env.VITE_CANISTER_ID_TOKEN;

export const createActor = (canisterId, options = {}) => {
  const host = import.meta.env.DEV ? "http://127.0.0.1:4943" : "https://ic0.app";

  const agent = options.agent || new HttpAgent({ 
    host: host,
    ...options.agentOptions 
  });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  if (import.meta.env.DEV) {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const token = canisterId ? createActor(canisterId) : null;