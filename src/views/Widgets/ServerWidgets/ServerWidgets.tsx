import { Fragment, useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDashboardData } from '@/api/api';
import UnfinishedTracker from '@/components/ServerWidgets/UnfinishedTracker';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import CompactServerList from '@/components/ServerWidgets/CompactServerList';
import { IMAGES } from '@/utils/Images';
import KrLogo2023 from '@/assets/logos/krLogo2023';

export const ServerWidgets = () => {
  const { colorMode } = useColorMode();

  const queryClient = useQueryClient();
  const newQueryCount = useRef([0]);

  const [servers, setServers] = useState<Server[]>([]);
  const [counter, setCounter] = useState([0]);

  const mapChangeEstimate = 0;

  // Fetch servers data
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['servers'],
    queryFn: () => getDashboardData(),
    refetchOnWindowFocus: false,
    retry: false,
    // refetchInterval: 120 * 1000,
  });

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

  const filteredServers = servers.filter(
    server =>
      server.maps[0].finished === false || server.maps[1].finished === false
  );

  return (
    <VStack w='full'>
      {/* Unfinished Tracker */}
      {filteredServers.length ? (
        <Box mb='5rem' w='full'>
          <VStack mb={8}>
            <Heading size='md' m={0}>
              You have 69/75 maps left to finish Kacky Remixed 3
            </Heading>
          </VStack>
          <Flex
            maxW={{ xl: 'container.xl' }}
            justifyContent='center'
            align='center'
            width='100%'
            gap={4}
          >
            {filteredServers.map((server, idx) => (
              <Box key={idx} justifyContent='center' alignContent='center'>
                {isSuccess ? (
                  <UnfinishedTracker
                    {...server}
                    timeLeft={counter[idx] - mapChangeEstimate}
                    key={server.serverNumber}
                  />
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
            ))}
          </Flex>
        </Box>
      ) : (
        <Box mb='5rem' gap={0}>
          <Heading textAlign='center' m={2}>
            No active events
          </Heading>
        </Box>
      )}
      {servers.length ? (
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
                      color={
                        colorMode === 'dark' ? 'neutral.400' : 'neutral.700'
                      }
                    >
                      Active now
                    </Text>
                    <Text
                      fontSize='sm'
                      fontWeight='light'
                      color={
                        colorMode === 'dark' ? 'neutral.400' : 'neutral.700'
                      }
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
      ) : (
        <Box mb='5rem' gap={0}>
          <Heading textAlign='center' m={2}>
            No active events
          </Heading>
        </Box>
      )}
    </VStack>
  );
};
