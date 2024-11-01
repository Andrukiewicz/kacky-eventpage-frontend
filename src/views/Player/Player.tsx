import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Center,
  Text,
  VStack,
  HStack,
  Box,
  Grid,
  GridItem,
  useColorMode,
} from '@chakra-ui/react';

// import { MdInfoOutline } from 'react-icons/md';
import { getMapFins } from '@/api/api';

import { motion } from 'framer-motion';

const Player = () => {
  const { playerName } = useParams();
  const { colorMode } = useColorMode();

  const { data: mapfins } = useQuery({
    queryKey: ['mapfins', playerName],
    queryFn: () => getMapFins(playerName as string),
    enabled: !!playerName,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    retry: false,
  });

  const numbers = Array.from({ length: 75 }, (_, i) => i + 301);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Center px={8} w='100%'>
        <VStack gap={6} direction='column' align='center' w='full'>
          <Text
            textShadow='glow'
            letterSpacing='0.1em'
            fontSize='xl'
            textAlign={'center'}
            style={{ textWrap: 'pretty' }}
          >
            Maps finished by {playerName}
          </Text>
          <Grid
            templateColumns={[
              'repeat(3, 1fr)',
              'repeat(5, 1fr)',
              'repeat(10, 1fr)',
            ]}
            gap={[2, 2]}
            justifyItems='center'
          >
            {numbers.map(number => {
              const mapid = number.toString();
              const isFinished = mapfins?.mapids?.includes(mapid);
              return (
                <GridItem
                  key={mapid}
                  w={[16, 16]}
                  h={[16, 16]}
                  bg={
                    isFinished
                      ? 'green.500'
                      : colorMode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200'
                  }
                  borderRadius='md'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Text fontSize='md' textShadow='glow' fontWeight='hairline'>
                    {number}
                  </Text>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>
      </Center>
    </motion.div>
  );
};

export default Player;
