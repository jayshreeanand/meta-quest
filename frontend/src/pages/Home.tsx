import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaGamepad, FaQuest, FaCoins, FaShieldAlt } from 'react-icons/fa';

const Feature = ({ icon, title, text }: { icon: any; title: string; text: string }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      rounded="xl"
      shadow="md"
      align="start"
      spacing={4}
      height="100%"
    >
      <Icon as={icon} w={8} h={8} color="blue.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>
    </VStack>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <VStack spacing={8} align="center" textAlign="center">
        <Heading size="2xl" bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">
          Welcome to Meta Quest
        </Heading>
        <Text fontSize="xl" maxW="2xl">
          Experience the future of gaming with AI-generated quests and blockchain-powered rewards.
          Every adventure is unique, and every reward is yours to keep.
        </Text>
        <Button
          size="lg"
          colorScheme="blue"
          onClick={() => navigate('/game')}
        >
          Start Your Adventure
        </Button>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mt={16}>
        <Feature
          icon={FaGamepad}
          title="Dynamic Gameplay"
          text="AI-generated levels and quests that adapt to your playstyle and progress."
        />
        <Feature
          icon={FaQuest}
          title="Unique Quests"
          text="Every quest is procedurally generated, ensuring a fresh experience every time."
        />
        <Feature
          icon={FaCoins}
          title="Blockchain Rewards"
          text="Earn and trade unique NFTs and tokens as you complete quests and defeat bosses."
        />
        <Feature
          icon={FaShieldAlt}
          title="Secure Assets"
          text="Your in-game assets are securely stored on the Aptos blockchain."
        />
      </SimpleGrid>
    </Box>
  );
};

export default Home; 