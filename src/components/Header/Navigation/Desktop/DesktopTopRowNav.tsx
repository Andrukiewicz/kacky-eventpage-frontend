import KrLogo2023 from '@/assets/logos/krLogo2023';
import {
  Box,
  HStack,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import UserNavigation from './UserNavigation';
import { NavLink } from 'react-router-dom';
import theme, { getDefaultBackgrounds } from '@/utils/theme';

const DesktopTopRowNav = () => {
  const { colorMode } = useColorMode();
  const logoSize = useBreakpointValue({
    base: '120px',
    md: '200px',
    lg: '220px',
  });
  return (
    <HStack justify='space-between' w='full' py={2}>
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
          // mt={{ md: 9, lg: 7, xl: 5 }}
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
      <UserNavigation />
    </HStack>
  );
};

export default DesktopTopRowNav;
