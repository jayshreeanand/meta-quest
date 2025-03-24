import { useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import { AptosClient } from 'aptos';

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'weapon' | 'armor' | 'achievement';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
}

export const useInventory = () => {
  const { isConnected, address } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls to backend
        const [nftsResponse, tokensResponse] = await Promise.all([
          fetch(`/api/inventory/nfts?address=${address}`),
          fetch(`/api/inventory/tokens?address=${address}`),
        ]);

        if (!nftsResponse.ok || !tokensResponse.ok) {
          throw new Error('Failed to fetch inventory');
        }

        const [nftsData, tokensData] = await Promise.all([
          nftsResponse.json(),
          tokensResponse.json(),
        ]);

        setNfts(nftsData);
        setTokens(tokensData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch inventory');
      } finally {
        setLoading(false);
      }
    };

    if (isConnected && address) {
      fetchInventory();
    } else {
      setNfts([]);
      setTokens([]);
      setLoading(false);
    }
  }, [isConnected, address]);

  const transferNFT = async (nftId: string, recipientAddress: string) => {
    try {
      // TODO: Replace with actual API call to backend
      const response = await fetch(`/api/inventory/nfts/${nftId}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: address,
          to: recipientAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to transfer NFT');
      }

      // Update local state
      setNfts((prevNfts) => prevNfts.filter((nft) => nft.id !== nftId));
    } catch (err) {
      console.error('Failed to transfer NFT:', err);
      throw err;
    }
  };

  const transferToken = async (tokenId: string, recipientAddress: string, amount: number) => {
    try {
      // TODO: Replace with actual API call to backend
      const response = await fetch(`/api/inventory/tokens/${tokenId}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: address,
          to: recipientAddress,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to transfer token');
      }

      // Update local state
      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId
            ? { ...token, balance: token.balance - amount }
            : token
        )
      );
    } catch (err) {
      console.error('Failed to transfer token:', err);
      throw err;
    }
  };

  return {
    nfts,
    tokens,
    loading,
    error,
    transferNFT,
    transferToken,
  };
}; 