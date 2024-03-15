import {
  Box,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  Heading,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import ServerCard from './ServerCard';

import { getDashboardData } from '@/api/api';

import AuthContext from '@/context/AuthContext';
import { getDefaultBackgrounds } from '@/utils/theme';
import KrLogo2023 from '@/assets/logos/krLogo2023';
import { IMAGES } from '@/utils/Images';
import CompactServerList from '@/components/ServerWidgets/CompactServerList';

const mapChangeEstimate = 0;

// Difficulty Badge Color Array with Types
const diffBadgeColorArr: Record<Difficulty, DiffBadgeColor> = {
  white: { variant: 'white', text: 'White' },
  green: { variant: 'green', text: 'Green' },
  blue: { variant: 'blue', text: 'Blue' },
  red: { variant: 'red', text: 'Red' },
  black: { variant: 'black', text: 'Black' },
  hard: { variant: 'orange', text: 'Hard' },
  harder: { variant: 'red', text: 'Harder' },
  hardest: { variant: 'purple', text: 'Hardest' },
};

// Difficulty Levels with Default Label
type Difficulty =
  | 'white'
  | 'green'
  | 'blue'
  | 'red'
  | 'black'
  | 'hard'
  | 'harder'
  | 'hardest';

interface DiffBadgeColor {
  variant: string;
  text: string;
}

const Dashboard = () => {
  const queryClient = useQueryClient();
  const newQueryCount = useRef([0]);
  const { colorMode } = useColorMode();

  const { authentication } = useContext(AuthContext);
  const [servers, setServers] = useState<Server[]>([]);
  const [counter, setCounter] = useState([0]);

  // Fetch servers data
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['servers', authentication.token],
    queryFn: () => getDashboardData(authentication.token),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Collect all unique difficulty levels
  const difficultyLevels = Array.from(
    new Set(servers.map(server => server.serverDifficulty))
  ) as Difficulty[];

  // Filter servers by difficulty level
  const filteredServersByDifficulty = difficultyLevels.map(difficulty =>
    servers.filter(server => server.serverDifficulty === difficulty)
  );

  useEffect(() => {
    if (isSuccess) {
      const timeLeftArr: number[] = [];
      const formattedData: Server[] = [];

      data.servers.forEach((server: Server) => {
        timeLeftArr.push(server.timeLeft + mapChangeEstimate);
        const formattedServer: Server = {
          serverNumber: server.serverNumber,
          maps: server.maps,
          serverDifficulty: server.serverDifficulty,
          timeLimit: server.timeLimit * 60,
          timeLeft: server.timeLeft + mapChangeEstimate, // Update timeLeft here
        };
        formattedData.push(formattedServer);
      });

      setServers(formattedData);
      setCounter(timeLeftArr);
      newQueryCount.current = new Array(timeLeftArr.length).fill(0);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const counterCopy = [...counter];
    const timer = setInterval(() => {
      counter.forEach((_, index) => {
        if (counterCopy[index] > 0) counterCopy[index] -= 1;
        if (counterCopy[index] === 0) {
          newQueryCount.current[index] =
            (newQueryCount.current[index] + 1) % 20;
          if (newQueryCount.current[index] === 0) {
            queryClient.invalidateQueries({ queryKey: ['servers'] });
          }
        }

        if (counter.length - 1 === index) setCounter(counterCopy);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, queryClient]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          display={['flex']} // Use flexbox layout
          flexDirection={['column', 'column', 'column']} // Stack items vertically on small screens, horizontally on larger screens
          justifyContent={['flex-start', 'flex-start', 'center']} // Align items to the start on small screens, space them evenly on larger screens
          alignItems={['flex-start']} // Align items to the start vertically
          flexWrap='wrap' // Allow items to wrap to the next line if there's not enough space
          gap='8px' // Add gap between items
          w='full'
        >
          {[...Array(7)].map((_, idx) => (
            <Box
              key={idx}
              width={['100%', '100%', '100%']} // Full width on small screens, half width on larger screens with gap adjustment
              marginBottom={['8px', '8px', '0']} // Add bottom margin to create space between rows on small screens
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Skeleton
                  height='100px'
                  startColor={`${
                    colorMode === 'dark'
                      ? getDefaultBackgrounds().dark[0]
                      : getDefaultBackgrounds().light[0]
                  }75`}
                  endColor={`${
                    colorMode === 'dark'
                      ? getDefaultBackgrounds().dark[1]
                      : getDefaultBackgrounds().light[1]
                  }75`}
                />
              </motion.div>
            </Box>
          ))}
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Center mb='5rem' w='full'>
        <Flex
          maxW={{ base: 'container.sm', xl: 'container.xl' }}
          w={['full', 500, 500]}
          justifyContent='center'
          align='center'
          direction='column'
          // w='full'
          gap={4}
          rounded='1.5rem'
          overflow='hidden'
          bg={colorMode === 'dark' ? 'neutral.900' : 'neutral.100'}
          shadow='md'
        >
          <Box
            py={3}
            px={4}
            bg={colorMode === 'dark' ? 'neutral.800' : 'neutral.200'}
            w='full'
            position='relative'
          >
            <Flex justify='space-between' align='center'>
              <HStack align='center'>
                <Image h='2rem' src={IMAGES.favicon} />
                <Box m={0} pt={1}>
                  <KrLogo2023
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    height='1.5rem'
                    width='100%'
                  />
                </Box>
                <Text fontWeight='bold' fontSize='1.2rem'>
                  Remixed 3
                </Text>
              </HStack>
              {/* <Text textTransform='initial'>
                  {servers[0].timeLimit / 60}m/map
                </Text> */}
            </Flex>
          </Box>
          <Box justifyContent='center' alignContent='center' w='full' gap={0}>
            {isSuccess ? (
              <>
                <HStack justify='space-between' px={4}>
                  <Text
                    fontSize='sm'
                    fontWeight='light'
                    color={colorMode === 'dark' ? 'neutral.400' : 'neutral.700'}
                  >
                    Active now
                  </Text>
                  <Text
                    fontSize='sm'
                    fontWeight='light'
                    color={colorMode === 'dark' ? 'neutral.400' : 'neutral.700'}
                  >
                    Next maps
                  </Text>
                </HStack>
                {servers.map((server, idx) => (
                  <Fragment key={server.serverNumber}>
                    <CompactServerList
                      {...server}
                      timeLeft={counter[idx] - mapChangeEstimate}
                      // key={server.serverNumber}
                    />

                    <Divider _last={{ display: 'none' }} />
                  </Fragment>
                ))}
              </>
            ) : (
              <Text
                fontSize='sm'
                fontWeight='light'
                color={colorMode === 'dark' ? 'neutral.400' : 'neutral.700'}
              >
                No active servers
              </Text>
            )}
          </Box>
        </Flex>
      </Center>
      <Box>
        <Heading as='h2' textAlign='center'>
          All servers
        </Heading>
        <Tabs
          width='100%'
          justifyContent='center'
          maxW={{ xl: 'container.xl' }}
          variant='enclosed'
          align='center'
          isLazy
        >
          <TabList gap={2}>
            {difficultyLevels.map((difficulty, index) => (
              <Tab
                _selected={{
                  color:
                    diffBadgeColorArr[difficulty].variant === 'white'
                      ? 'black'
                      : 'white',
                  bg: diffBadgeColorArr[difficulty].variant,
                }}
                textTransform='uppercase'
                color={`${colorMode === 'dark' ? 'white' : 'black'}`}
                fontSize='xl'
                key={index}
                backgroundColor={`${
                  colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'
                }`}
              >
                {difficulty ? difficulty : 'Phase 1'}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {filteredServersByDifficulty.map((serversByDifficulty, index) => (
              <TabPanel key={index} width='100%' px={'0'}>
                {isSuccess ? (
                  serversByDifficulty.map((server: Server, idx) => {
                    const modifiedServer: Server = {
                      ...server,
                      timeLeft:
                        counter[servers.indexOf(server)] - mapChangeEstimate,
                    };
                    return (
                      <Box
                        key={idx}
                        width={['100%', '100%', '100%']} // Full width on small screens, half width on larger screens with gap adjustment
                        marginBottom={['8px', '8px', '0']} // Add bottom margin to create space between rows on small screens
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                          <ServerCard
                            {...modifiedServer}
                            key={server.serverNumber}
                          />
                        </motion.div>
                      </Box>
                    );
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
