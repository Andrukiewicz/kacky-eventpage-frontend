import { memo } from 'react';

import { Icon, useTheme, useColorMode } from '@chakra-ui/react';

import { MdOutlineCheckCircle } from 'react-icons/md';

interface Props {
  finished: boolean; // Define the prop type
}

const MapFinishedCell = memo<Props>(({ finished }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Icon
      color={
        colorMode === 'dark'
          ? finished
            ? 'green.300'
            : 'whiteAlpha.200'
          : finished
            ? 'green.500'
            : 'blackAlpha.200'
      }
      boxSize={{ base: '16px', lg: '20px' }}
      alignSelf={'center'}
      filter={
        colorMode === 'dark' && finished
          ? theme.shadows.finGlowDark
          : theme.shadows.finGlowLight
      }
      as={MdOutlineCheckCircle}
    />
  );
});

export default MapFinishedCell;
