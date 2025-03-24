import React from 'react';
import { Box, Flex, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

const Navbar: React.FC = () => {
  const { connect, disconnect, isConnected, address } = useWallet();
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Heading size="md" as={RouterLink} to="/" cursor="pointer">
            Meta Quest
          </Heading>
        </Flex>
        
        <Flex alignItems="center" gap={4}>
          <Button as={RouterLink} to="/game" variant="ghost">
            Play
          </Button>
          <Button as={RouterLink} to="/inventory" variant="ghost">
            Inventory
          </Button>
          {isConnected ? (
            <Button onClick={disconnect} colorScheme="red" variant="outline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          ) : (
            <Button onClick={connect} colorScheme="blue">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 