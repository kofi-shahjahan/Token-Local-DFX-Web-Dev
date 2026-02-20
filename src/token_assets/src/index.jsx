// This project used to use internet identity but it was removed for simplicity.

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent"; 
import { Principal } from '@dfinity/principal';

const init = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  const userPrincipal="2vxsx-fae"
  root.render(<App loggedInPrincipal={userPrincipal} />);
};

init();
