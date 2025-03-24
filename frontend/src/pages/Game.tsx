import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useQuests } from '../hooks/useQuests';

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

const Game: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { quests, loading, error, startQuest, completeQuest } = useQuests();
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!isConnected) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Heading>Connect Your Wallet</Heading>
        <Text>Please connect your wallet to view and start quests.</Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Spinner size="xl" />
        <Text>Loading quests...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Text color="red.500">Error loading quests: {error}</Text>
      </VStack>
    );
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Heading>Available Quests</Heading>
        
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {quests.map((quest) => (
            <Box
              key={quest.id}
              p={6}
              bg={bgColor}
              rounded="xl"
              shadow="md"
              border="1px"
              borderColor={borderColor}
              cursor="pointer"
              onClick={() => setSelectedQuest(quest)}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            >
              <VStack align="start" spacing={4}>
                <HStack justify="space-between" width="100%">
                  <Heading size="md">{quest.title}</Heading>
                  <Badge
                    colorScheme={
                      quest.difficulty === 'easy'
                        ? 'green'
                        : quest.difficulty === 'medium'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {quest.difficulty}
                  </Badge>
                </HStack>
                
                <Text>{quest.description}</Text>
                
                <HStack spacing={4}>
                  <Badge colorScheme="blue">
                    {quest.rewards.tokens} Tokens
                  </Badge>
                  {quest.rewards.nft && (
                    <Badge colorScheme="purple">NFT Reward</Badge>
                  )}
                </HStack>

                <Button
                  colorScheme="blue"
                  width="100%"
                  onClick={(e) => {
                    e.stopPropagation();
                    startQuest(quest.id);
                  }}
                  isDisabled={quest.status !== 'available'}
                >
                  {quest.status === 'available' ? 'Start Quest' : 'In Progress'}
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default Game; 