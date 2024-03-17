import { getDefaultBackgrounds } from '@/utils/theme';
import { Center, HStack, useColorMode } from '@chakra-ui/react';
import MobileRightColNav from './Mobile/MobileRightColNav';
import MobileLeftColNav from './Mobile/MobileLeftColNav';

const MobileNavigation = () => {
  const { colorMode } = useColorMode();

  return (
    <Center
      as='header'
      pos='fixed'
      display={{ base: 'flex', md: 'none' }}
      bottom={{ base: '0' }}
      zIndex='sticky'
      w='100%'
      height='100%'
      px={{ base: 0 }}
      h={{ base: '60px' }}
      bg={
        colorMode === 'dark'
          ? getDefaultBackgrounds().dark[1]
          : getDefaultBackgrounds().light[1]
      }
      borderBottom={{ base: 'none' }}
      // outline='1px solid'
      borderTop={{ base: '1px solid' }}
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
        h='full'
        py={2}
        px={2}
        w='full'
        justify='space-between'
      >
        <MobileLeftColNav />
        <MobileRightColNav />
      </HStack>
    </Center>
  );
};

export default MobileNavigation;
