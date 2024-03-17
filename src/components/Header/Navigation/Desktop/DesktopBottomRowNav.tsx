import { useContext } from 'react';
import { HStack, VStack, Text, useColorMode, Select } from '@chakra-ui/react';
import EventContext from '@/context/EventContext';
import RouteNavigation from './RouteNavigation';
import { getDefaultBackgrounds } from '@/utils/theme';

const DesktopBottomRowNav = () => {
  const { colorMode } = useColorMode();
  const { event, setEvent } = useContext(EventContext);
  return (
    <HStack justify='center' align='end' w='full' h='full' pos='relative'>
      <RouteNavigation />
      {import.meta.env.DEV && (
        <VStack position='absolute' right={0} gap={0}>
          <Text fontSize='xs' textTransform='initial'>
            Dev event status
          </Text>
          <Select
            w='fit-content'
            size='xs'
            variant='outline'
            sx={{
              '> option': {
                background: `
                ${
                  colorMode === 'dark'
                    ? getDefaultBackgrounds().dark[0]
                    : getDefaultBackgrounds().light[0]
                }`,
              },
            }}
            value={event.status}
            onChange={e => {
              e.preventDefault();
              setEvent({
                ...event,
                status: e?.target?.value,
              });
              localStorage.setItem('eventLiveStatus', e.target.value); // Update localStorage
            }}
          >
            <option value='active'>active</option>
            <option value='pre'>pre</option>
            <option value='post'>post</option>
            <option value='offseason'>offseason</option>
          </Select>
        </VStack>
      )}
    </HStack>
  );
};

export default DesktopBottomRowNav;
