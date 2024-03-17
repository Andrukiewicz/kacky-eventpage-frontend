import { getDefaultBackgrounds } from '@/utils/theme';
import { Center, useColorMode, VStack } from '@chakra-ui/react';
import DesktopTopRowNav from './Desktop/DesktopTopRowNav';
import DesktopBottomRowNav from './Desktop/DesktopBottomRowNav';
import MobileNavigation from './HeaderMobile';

const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Center
      as='header'
      pos='fixed'
      display={{ base: 'none', md: 'flex' }}
      bottom={{ md: 'auto' }}
      zIndex='sticky'
      w='100%'
      height='100%'
      px={{ md: 8 }}
      h={{ md: 'fit-content' }}
      bg={
        colorMode === 'dark'
          ? getDefaultBackgrounds().dark[1]
          : getDefaultBackgrounds().light[1]
      }
      borderBottom={{ md: '1px solid' }}
      // outline='1px solid'
      borderTop={{ md: 'none' }}
      borderColor={
        colorMode === 'dark'
          ? 'whiteAlpha.300 !important'
          : 'blackAlpha.300 !important'
      }
      backdropFilter='auto'
      backdropBlur='16px'
    >
      <VStack
        as='nav'
        spacing={0}
        gap={0}
        h='full'
        w={{ base: 'full', md: 'container.xl' }}
      >
        <DesktopTopRowNav />
        <DesktopBottomRowNav />
        <MobileNavigation />
      </VStack>
    </Center>
  );
};

export default Header;
