import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Spinner,
  Image,
  Button,
} from '@chakra-ui/react';
import { useWallet } from '../hooks/useWallet';
import { useInventory } from '../hooks/useInventory';

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

const Inventory: React.FC = () => {
  const { isConnected } = useWallet();
  const { nfts, tokens, loading, error, transferNFT, transferToken } = useInventory();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!isConnected) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Heading>Connect Your Wallet</Heading>
        <Text>Please connect your wallet to view your inventory.</Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Spinner size="xl" />
        <Text>Loading inventory...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack spacing={4} align="center" justify="center" minH="60vh">
        <Text color="red.500">Error loading inventory: {error}</Text>
      </VStack>
    );
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Heading>Your Inventory</Heading>

        <Box>
          <Heading size="md" mb={4}>NFTs</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {nfts.map((nft) => (
              <Box
                key={nft.id}
                p={4}
                bg={bgColor}
                rounded="xl"
                shadow="md"
                border="1px"
                borderColor={borderColor}
                cursor="pointer"
                onClick={() => setSelectedNFT(nft)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              >
                <VStack spacing={4}>
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    borderRadius="lg"
                    width="200px"
                    height="200px"
                    objectFit="cover"
                  />
                  <VStack align="start" width="100%" spacing={2}>
                    <Heading size="sm">{nft.name}</Heading>
                    <Text fontSize="sm" color="gray.500">
                      {nft.description}
                    </Text>
                    <HStack spacing={2}>
                      <Badge colorScheme="blue">{nft.type}</Badge>
                      <Badge
                        colorScheme={
                          nft.rarity === 'legendary'
                            ? 'purple'
                            : nft.rarity === 'epic'
                            ? 'pink'
                            : nft.rarity === 'rare'
                            ? 'blue'
                            : 'gray'
                        }
                      >
                        {nft.rarity}
                      </Badge>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Tokens</Heading>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {tokens.map((token) => (
              <Box
                key={token.id}
                p={4}
                bg={bgColor}
                rounded="xl"
                shadow="md"
                border="1px"
                borderColor={borderColor}
                cursor="pointer"
                onClick={() => setSelectedToken(token)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              >
                <VStack spacing={4}>
                  <Heading size="md">{token.name}</Heading>
                  <Text fontSize="xl" fontWeight="bold">
                    {token.balance} {token.symbol}
                  </Text>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement transfer functionality
                    }}
                  >
                    Transfer
                  </Button>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default Inventory; 