import EventContext from '@/context/EventContext';
import {
  useColorMode,
  useTheme,
  HStack,
  Menu,
  Button,
  Text,
  useBreakpointValue,
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

const RouteNavigation = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { event } = useContext(EventContext);

  const iconSize = useBreakpointValue({
    base: '1.5rem',
    md: '1.25rem',
  });

  return (
    <HStack h='40px'>
      <Menu autoSelect={false}>
        <Button
          as={NavLink}
          aria-label='Dashboard'
          variant='ghost'
          roundedBottom={1}
          h='full'
          to='/'
          flexDirection={{ base: 'column', lg: 'row' }}
          _activeLink={{
            bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          }}
          letterSpacing={0}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          gap={{ base: 0, md: 0, lg: 2 }}
        >
          <MdOutlineDashboard size={iconSize} />
          <Text display={{ base: 'none', md: 'block' }}>Dashboard</Text>
        </Button>
        {event.status === 'active' && (
          <Button
            as={NavLink}
            aria-label='Ranking'
            variant='ghost'
            roundedBottom={1}
            h='full'
            to={`https://kackyreloaded.com/event/editions/ranking.php?edition=5`}
            flexDirection={{ base: 'column', lg: 'row' }}
            _activeLink={{
              bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
            }}
            letterSpacing={0}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            gap={{ base: 0, md: 0, lg: 2 }}
          >
            <LuTrophy size={iconSize} />
            <Text display={{ base: 'none', md: 'block' }}>Ranking</Text>
          </Button>
        )}
        {event.status === 'active' && (
          <Button
            as={NavLink}
            aria-label='Schedule'
            variant='ghost'
            roundedBottom={1}
            h='full'
            to='/schedule'
            flexDirection={{ base: 'column', lg: 'row' }}
            _activeLink={{
              bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
            }}
            letterSpacing={0}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            gap={{ base: 0, md: 0, lg: 2 }}
          >
            <MdOutlineEvent size={iconSize} />
            <Text display={{ base: 'none', md: 'block' }}>Schedule</Text>
          </Button>
        )}
        <Button
          as={NavLink}
          aria-label='Hunting'
          variant='ghost'
          to='/hunting'
          flexDirection={{ base: 'column', lg: 'row' }}
          _activeLink={{
            bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          }}
          roundedBottom={1}
          h='full'
          letterSpacing={0}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          gap={{ base: 0, md: 0, lg: 2 }}
        >
          <MdOutlineDataExploration size={iconSize} />
          <Text display={{ base: 'none', md: 'block' }}>Hunting</Text>
        </Button>
        <Button
          as={NavLink}
          aria-label='World records'
          variant='ghost'
          to='/wrs'
          flexDirection={{ base: 'column', lg: 'row' }}
          _activeLink={{
            bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100',
          }}
          roundedBottom={1}
          h='full'
          letterSpacing={0}
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          gap={{ base: 0, md: 0, lg: 2 }}
        >
          <MdBarChart size={iconSize} />
          <Text display={{ base: 'none', md: 'block' }}>WR's</Text>
        </Button>
      </Menu>
    </HStack>
  );
};

export default RouteNavigation;
