import EventContext from '@/context/EventContext';
import {
  Button,
  Flex,
  HStack,
  Menu,
  Text,
  useBreakpointValue,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';
import { useContext } from 'react';
import {
  MdBarChart,
  MdOutlineDashboard,
  MdOutlineDataExploration,
  MdOutlineEvent,
} from 'react-icons/md';
import { LuTrophy } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';

const MobileLeftColNav = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { event } = useContext(EventContext);

  const iconSize = useBreakpointValue({
    base: '1.2rem',
  });
  return (
    <HStack spacing={0} h='full' w='full' justify='space-between'>
      <Menu autoSelect={false}>
        <Button
          as={NavLink}
          aria-label='Dashboard'
          variant='ghost'
          rounded={10}
          p={1}
          h='full'
          to='/'
          flexDirection={{ base: 'column' }}
          _activeLink={{
            bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          }}
          letterSpacing={0}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          gap={{ base: 0, md: 0, lg: 2 }}
        >
          <MdOutlineDashboard size={iconSize} />
          <Text fontSize='xs' display={{ base: 'block', md: 'block' }}>
            Dashboard
          </Text>
        </Button>
        {event.status === 'active' && (
          <Button
            as={NavLink}
            aria-label='Ranking'
            variant='ghost'
            rounded={10}
            p={1}
            h='full'
            to='/leaderboard'
            flexDirection={{ base: 'column' }}
            _activeLink={{
              bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
            }}
            letterSpacing={0}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            gap={{ base: 0, md: 0, lg: 2 }}
          >
            <LuTrophy size={iconSize} />
            <Text fontSize='xs' display={{ base: 'block', md: 'block' }}>
              Ranking
            </Text>
          </Button>
        )}
        {event.status === 'active' && (
          <Button
            as={NavLink}
            aria-label='Schedule'
            variant='ghost'
            rounded={10}
            p={1}
            h='full'
            to='/schedule'
            flexDirection={{ base: 'column' }}
            _activeLink={{
              bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
            }}
            letterSpacing={0}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            gap={{ base: 0, md: 0, lg: 2 }}
          >
            <MdOutlineEvent size={iconSize} />
            <Text fontSize='xs' display={{ base: 'block', md: 'block' }}>
              Schedule
            </Text>
          </Button>
        )}
        <Button
          as={NavLink}
          aria-label='Hunting'
          variant='ghost'
          to='/hunting'
          flexDirection={{ base: 'column' }}
          _activeLink={{
            bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          }}
          rounded={10}
          p={1}
          h='full'
          letterSpacing={0}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          gap={{ base: 0, md: 0, lg: 2 }}
        >
          <MdOutlineDataExploration size={iconSize} />
          <Text fontSize='xs' display={{ base: 'block', md: 'block' }}>
            Hunting
          </Text>
        </Button>
        <Button
          as={NavLink}
          aria-label='World records'
          variant='ghost'
          to='/wrs'
          flexDirection={{ base: 'column' }}
          _activeLink={{
            bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          }}
          rounded={10}
          p={1}
          h='full'
          letterSpacing={0}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          gap={{ base: 0, md: 0, lg: 2 }}
        >
          <MdBarChart size={iconSize} />
          <Text fontSize='xs' display={{ base: 'block', md: 'block' }}>
            WR's
          </Text>
        </Button>
      </Menu>
    </HStack>
  );
};

export default MobileLeftColNav;
