import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent"; 
import { Principal } from '@dfinity/principal';

const init = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container);

  // const isLocal = import.meta.env.VITE_DFX_NETWORK !== "ic";

  // const authClient = await AuthClient.create();

  // if (await authClient.isAuthenticated()) {
  //   console.log("Already authenticated!");
  //   handleAuthenticated(authClient);
  //   return;
  // }

  // if (isLocal) {
  //   const agent = authClient.getAgent?.() ?? new HttpAgent({ host: "http://127.0.0.1:4943" });
  //   await agent.fetchRootKey().catch((err) => {
  //     console.warn("Error while fetching local root key:", err);
  //   });
  // }

  // const iiCanisterId = import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY || "rdmx6-jaaaa-aaaaa-aaadq-cai";
  // const identityProvider = isLocal
  //   ? `http://${iiCanisterId}.localhost:4943/#authorize`
  //   : "https://identity.ic0.app";

  // await authClient.login({
  //   identityProvider,
  //   onSuccess: () => {
  //     console.log("Authenticated!");
  //     handleAuthenticated(authClient);
  //   },
  //   onError: (error) => {
  //     console.error("Error while logging in:", error);
  //   }
  // });

  // async function handleAuthenticated(authClient) {
  //   const identity = await authClient.getIdentity();
  //   const userPrincipal = identity.getPrincipal().toText();
  //   console.log("User Principal:", userPrincipal);
  //   root.render(<App loggedInPrincipal={userPrincipal} />);
  // }
  const userPrincipal="2vxsx-fae"
  root.render(<App loggedInPrincipal={userPrincipal} />);
};

init();

// Course version (Not working):

// import App from './components/App';
// import { AuthClient } from "@dfinity/auth-client";

// const init = async () => {
//   const authClient = await AuthClient.create();

//   if (authClient.isAuthenticated()) {
//     console.log("logged in");
//   }

//   await authClient.login({
//     identityProvider: "https://identity.ic0.app/#authorize",
//     onSuccess: () => {
//       ReactDOM.render(<App />, document.getElementById('root'));
//   });
// };

// init();
