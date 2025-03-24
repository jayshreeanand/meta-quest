import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { NightlyWallet } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { OpenBlockWallet } from '@openblockhq/wallet-adapter';
import { TokenPocketWallet } from '@tp-lab/aptos-wallet-adapter';
import { TrustWallet } from '@trustwallet/aptos-wallet-adapter';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { BitkeepWallet } from '@bitkeep/aptos-wallet-adapter-plugin';
import { BloctoWallet } from '@blocto/aptos-wallet-adapter-plugin';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

const wallets = [
  new PetraWallet(),
  new PontemWallet(),
  new NightlyWallet(),
  new OpenBlockWallet(),
  new TokenPocketWallet(),
  new TrustWallet(),
  new MartianWallet(),
  new RiseWallet(),
  new BitkeepWallet(),
  new BloctoWallet(),
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect>
        <App />
      </AptosWalletAdapterProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals(); 