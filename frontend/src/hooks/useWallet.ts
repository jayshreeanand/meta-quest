import { useState, useCallback } from 'react';
import { AptosClient, AptosWalletAdapter, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { useWallet as useAptosWallet } from '@aptos-labs/wallet-adapter-react';

export const useWallet = () => {
  const { connected, account, connect, disconnect } = useAptosWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = useCallback(async () => {
    try {
      setIsConnecting(true);
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [connect]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, [disconnect]);

  return {
    isConnected: connected,
    address: account?.address,
    connect: handleConnect,
    disconnect: handleDisconnect,
    isConnecting,
  };
}; 