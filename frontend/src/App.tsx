import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Quest from './pages/Quest';
import Inventory from './pages/Inventory';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Container maxW="container.xl" py={8}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/quest/:id" element={<Quest />} />
              <Route path="/inventory" element={<Inventory />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App; 