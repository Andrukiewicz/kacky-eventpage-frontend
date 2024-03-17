import { logoutServer } from '@/api/api';
import AuthContext from '@/context/AuthContext';
import {
  Button,
  Center,
  Divider,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Toast,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import {
  MdOutlineArrowDropUp,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlineSettings,
  MdPerson,
  MdPersonOutline,
} from 'react-icons/md';
import { RiDiscordLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AuthModal from '../../AuthModal/AuthModal';
const MobileRightColNav = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MdOutlineDarkMode, MdOutlineLightMode);
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authentication, setAuthentication } = useContext(AuthContext);
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
    Toast({
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
  });

  return (
    <HStack spacing={0} h='full'>
      <Center h='full' mx={2}>
        <Divider orientation='vertical' />
      </Center>
      {authentication.isLoggedIn ? (
        <Menu isLazy>
          <MenuButton as={IconButton} variant='ghost'>
            <Button
              variant='ghost'
              p={{ base: 0 }}
              rounded={10}
              h='full'
              filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            >
              <MdPerson size={iconSize} />
            </Button>
          </MenuButton>

          <MenuList borderRadius={10}>
            <Button
              as={Link}
              variant='ghost'
              p={2}
              px={3}
              gap={3}
              h='full'
              w='full'
              justifyContent='start'
              aria-label='Discord link'
              href='https://kacky.gg/discord'
              isExternal
              filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            >
              <RiDiscordLine
                size={iconSize}
                color={colorMode === 'dark' ? 'white' : 'black'}
              />
              Kacky Discord
            </Button>
            <MenuItem
              as={Button}
              aria-label='Change color mode'
              variant='ghost'
              h='full'
              w='full'
              onClick={toggleColorMode}
              backgroundColor={'transparent'}
              filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
              icon={<SwitchIcon size={iconSize} />}
            >
              Change theme
            </MenuItem>
            <MenuGroup title='Profile'>
              <MenuItem
                icon={<MdOutlineSettings size={iconSize} />}
                as={NavLink}
                to='/profile'
              >
                Account settings
              </MenuItem>
              <MenuItem
                icon={<MdOutlineLogout size={iconSize} />}
                onClick={logout}
                as='a'
                href='#'
              >
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button
            aria-label='Log in'
            variant='ghost'
            p={{ base: 0 }}
            onClick={onOpen}
            rounded={10}
            h='full'
            backgroundColor={'transparent'}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          >
            <MdOutlineLogin size={iconSize} />
          </Button>
        </>
      )}
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default MobileRightColNav;
