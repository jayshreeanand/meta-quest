import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Progress,
  HStack,
  Badge,
  useColorModeValue,
  Spinner,
  Divider,
} from '@chakra-ui/react';
import { useWallet } from '../hooks/useWallet';
import { useQuests } from '../hooks/useQuests';

const Quest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { quests, loading, error, completeQuest } = useQuests();
  const [quest, setQuest] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    if (quests.length > 0 && id) {
      const foundQuest = quests.find((q) => q.id === id);
      if (foundQuest) {
        setQuest(foundQuest);
      } else {
        navigate('/game');
      }
    }
  }, [quests, id, navigate]);

  useEffect(() => {
    // Simulate quest progress
    if (quest?.status === 'in_progress') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quest?.status]);

  if (!isConnected) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Heading>Connect Your Wallet</Heading>
        <Text>Please connect your wallet to view quest details.</Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Spinner size="xl" />
        <Text>Loading quest details...</Text>
      </VStack>
    );
  }

  if (error || !quest) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Text color="red.500">Error loading quest details: {error}</Text>
      </VStack>
    );
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box
          p={6}
          bg={bgColor}
          rounded="xl"
          shadow="md"
          border="1px"
          borderColor={borderColor}
        >
          <VStack align="start" spacing={6}>
            <HStack justify="space-between" width="100%">
              <Heading size="xl">{quest.title}</Heading>
              <Badge
                colorScheme={
                  quest.difficulty === 'easy'
                    ? 'green'
                    : quest.difficulty === 'medium'
                    ? 'yellow'
                    : 'red'
                }
                fontSize="md"
                px={3}
                py={1}
              >
                {quest.difficulty}
              </Badge>
            </HStack>

            <Text fontSize="lg">{quest.description}</Text>

            <Divider />

            <VStack align="start" spacing={4} width="100%">
              <Heading size="md">Quest Progress</Heading>
              <Progress
                value={progress}
                colorScheme="blue"
                width="100%"
                height="20px"
                rounded="full"
              />
              <Text>{progress}% Complete</Text>
            </VStack>

            <Divider />

            <VStack align="start" spacing={4} width="100%">
              <Heading size="md">Rewards</Heading>
              <HStack spacing={4}>
                <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                  {quest.rewards.tokens} Tokens
                </Badge>
                {quest.rewards.nft && (
                  <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                    NFT Reward
                  </Badge>
                )}
              </HStack>
            </VStack>

            {quest.status === 'in_progress' && progress === 100 && (
              <Button
                colorScheme="green"
                size="lg"
                width="100%"
                onClick={() => completeQuest(quest.id)}
              >
                Claim Rewards
              </Button>
            )}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Quest; 