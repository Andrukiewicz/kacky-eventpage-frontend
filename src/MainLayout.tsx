import {
  Box,
  HStack,
  Center,
  useColorMode,
  useTheme,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import KrLogo2023 from '@/assets/logos/krLogo2023';
import RouteNavigation from '@/components/Header/Navigation/RouteNavigation';
import UserNavigation from '@/components/Header/Navigation/UserNavigation';
import { getDefaultBackgrounds } from '@/utils/theme';

const MainLayout = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const logoSize = useBreakpointValue({
    base: '120px',
    md: '160px',
    lg: '220px',
    xl: '260px',
  });

  return (
    <VStack>
      <Center
        as='header'
        pos='fixed'
        bottom={{ base: '0', md: 'auto' }}
        zIndex='sticky'
        w='100%'
        height='100%'
        px={{ base: 0, md: 8 }}
        h={{ base: '60px', md: '80px' }}
        bg={
          colorMode === 'dark'
            ? getDefaultBackgrounds().dark[1]
            : getDefaultBackgrounds().light[1]
        }
        borderBottom={{ base: 'none', md: '1px solid' }}
        // outline='1px solid'
        borderTop={{ base: '1px solid', md: 'none' }}
        borderColor={
          colorMode === 'dark'
            ? 'whiteAlpha.300 !important'
            : 'blackAlpha.300 !important'
        }
        backdropFilter='auto'
        backdropBlur='16px'
      >
        <HStack
          as='nav'
          spacing={0}
          gap={0}
          pt={{ base: 1, md: 4 }}
          h='full'
          w={{ base: 'full', md: 'container.xl' }}
        >
          <Box
            display={{ base: 'none', md: 'block' }}
            px={{ base: 4, md: 2, lg: 4 }}
            borderBottom='1px'
            mt='1px'
            borderColor={
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            }
            h='full'
          >
            <Box
              as={NavLink}
              display='flex'
              alignContent='end'
              mt={{ md: 9, lg: 7, xl: 5 }}
              filter={theme.shadows.dropGlow}
              _hover={{
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out', // Combine all transition properties
              }}
            >
              <KrLogo2023
                color={colorMode === 'dark' ? 'white' : 'black'}
                width={logoSize}
              />
            </Box>
          </Box>
          <HStack justify='space-between' align='end' w='full' h='full'>
            <RouteNavigation />
            <UserNavigation />
          </HStack>
        </HStack>
      </Center>
      <VStack w='full' minH='100vh' justify='space-between'>
        <Box
          as='main'
          mt={{ base: '16px', md: '80px' }}
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
