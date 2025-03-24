import { useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import { AptosClient } from 'aptos';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewards: {
    nft?: boolean;
    tokens: number;
  };
  status: 'available' | 'in_progress' | 'completed';
}

export const useQuests = () => {
  const { isConnected, address } = useWallet();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to backend
        const response = await fetch('/api/quests');
        if (!response.ok) {
          throw new Error('Failed to fetch quests');
        }
        const data = await response.json();
        setQuests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quests');
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      fetchQuests();
    } else {
      setQuests([]);
      setLoading(false);
    }
  }, [isConnected]);

  const startQuest = async (questId: string) => {
    try {
      // TODO: Replace with actual API call to backend
      const response = await fetch(`/api/quests/${questId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to start quest');
      }

      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === questId
            ? { ...quest, status: 'in_progress' }
            : quest
        )
      );
    } catch (err) {
      console.error('Failed to start quest:', err);
      throw err;
    }
  };

  const completeQuest = async (questId: string) => {
    try {
      // TODO: Replace with actual API call to backend
      const response = await fetch(`/api/quests/${questId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete quest');
      }

      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === questId
            ? { ...quest, status: 'completed' }
            : quest
        )
      );
    } catch (err) {
      console.error('Failed to complete quest:', err);
      throw err;
    }
  };

  return {
    quests,
    loading,
    error,
    startQuest,
    completeQuest,
  };
}; 