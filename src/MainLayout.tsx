import { Box, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header/Navigation/Header';
import HeaderMobile from './components/Header/Navigation/HeaderMobile';
import Footer from './components/Footer/Footer';

function ResponsiveHeader() {
  const content = useBreakpointValue({
    base: <HeaderMobile />,
    md: <Header />,
  });

  return content;
}

const MainLayout = () => {
  return (
    <VStack>
      <ResponsiveHeader />
      <VStack w='full' minH='100vh' justify='space-between'>
        <Box
          as='main'
          mt={{ base: '0', md: '100px' }}
          py={{ base: '2rem', md: '3rem' }}
          px={{ base: 4, md: 8 }}
          w='full'
          maxW={{ base: 'full', md: 'container.xl' }}
        >
          <Outlet />
        </Box>
        <Footer />
      </VStack>
    </VStack>
  );
};

export default MainLayout;
