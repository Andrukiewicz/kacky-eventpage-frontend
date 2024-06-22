import {
  Button,
  Center,
  Divider,
  HStack,
  Link,
  Menu,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useTheme,
  useToast,
} from '@chakra-ui/react';
import AuthModal from '../../AuthModal/AuthModal';
import { logoutServer } from '@/api/api';
import Cookies from 'universal-cookie';
import { useContext, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLogin,
  MdOutlineLogout,
  MdPersonOutline,
} from 'react-icons/md';
import { RiDiscordLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';

const UserNavigation = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authentication, setAuthentication } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const discordUrl = 'https://kacky.gg/discord';

  const SwitchIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);

  const logout = () => {
    logoutServer(authentication.token);
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    cookies.remove('expires', { path: '/' });

    setAuthentication({
      isLoggedIn: false,
      token: '',
      expires: 0,
    });
    toast({
      title: 'Logout',
      description: 'Logged out!',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
    navigate('/');
  };

  useEffect(() => {
    if (new Date().getTime() < authentication.expires) {
      logoutServer(authentication.token);
      const cookies = new Cookies();
      cookies.remove('token', { path: '/' });
      cookies.remove('expires', { path: '/' });

      setAuthentication({
        isLoggedIn: false,
        token: '',
        expires: 0,
      });
    }
  }, [authentication.expires, authentication.token, setAuthentication]);

  const iconSize = useBreakpointValue({
    base: '1.5rem',
    lg: '1.5rem',
  });

  return (
    <HStack h='50px'>
      <Menu autoSelect={false}>
        <HStack spacing={2} h='full'>
          <Button
            aria-label='Change color mode'
            variant='ghost'
            p={{ base: 0, md: 1 }}
            rounded='10'
            h='full'
            display='flex'
            flexDirection='column'
            onClick={toggleColorMode}
            backgroundColor={'transparent'}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          >
            <SwitchIcon size={iconSize} />
            <Text fontSize={'xs'}>Theme</Text>
          </Button>
          <Button
            as={Link}
            variant='ghost'
            p={{ base: 0, md: 1 }}
            rounded='10'
            h='full'
            display='flex'
            flexDirection='column'
            aria-label='Discord link'
            href={discordUrl}
            isExternal
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          >
            <RiDiscordLine
              size={iconSize}
              color={colorMode === 'dark' ? 'white' : 'black'}
            />
            <Text fontSize={'xs'}>Discord</Text>
          </Button>
        </HStack>
        <Center height='50px'>
          <Divider orientation='vertical' />
        </Center>
        <HStack spacing={2} h='full'>
          {authentication.isLoggedIn ? (
            <>
              <Button
                as={NavLink}
                to='/profile'
                aria-label='View profile'
                variant='ghost'
                p={{ base: 0, md: 1 }}
                rounded='10'
                h='full'
                display='flex'
                flexDirection='column'
                filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
              >
                <MdPersonOutline size={iconSize} />
                <Text fontSize={'xs'}>Profile</Text>
              </Button>
              <Button
                aria-label='Log out'
                variant='ghost'
                p={{ base: 0, md: 1 }}
                rounded='10'
                h='full'
                display='flex'
                flexDirection='column'
                onClick={logout}
                filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
              >
                <MdOutlineLogout size={iconSize} />
                <Text fontSize={'xs'}>Log out</Text>
              </Button>
            </>
          ) : (
            <>
              <Button
                aria-label='Log in'
                variant='ghost'
                p={{ base: 0, md: 1 }}
                rounded='10'
                onClick={onOpen}
                h='full'
                display='flex'
                flexDirection='column'
                backgroundColor={'transparent'}
                filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
              >
                <MdOutlineLogin size={iconSize} />
                <Text fontSize={'xs'}>Log in</Text>
              </Button>
            </>
          )}
        </HStack>
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </Menu>
    </HStack>
  );
};

export default UserNavigation;
