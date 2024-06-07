import {
  Center,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  Button,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { getMapImageUrl } from '@/api/api';
// import mapImageFallback from '@/assets/images/mapImageFallback.jpg';
import EventContext from '@/context/EventContext';
import { IMAGES } from '@/utils/Images';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const CompactServerList = ({
  serverNumber,
  maps,
  timeLeft,
  serverJoin,
}: Server) => {
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!divRef.current) return;

    const { width, height, top, left } = divRef.current.getBoundingClientRect();

    setDimensions({ width, height, top, left });
  }, []);
  return (
    <Box
      // Image fallback doesn't work for some reason for bgImage
      //   bgImage={`url(${getMapImageUrl(event.type, maps[0].number)})`}
      bgPosition='center'
      bgRepeat='no-repeat'
      bgSize='cover'
      w='full'
      h='full'
      ref={divRef}
    >
      <AnimatePresence>
        {timeLeft <= 0 && (
          <motion.div
            key={serverNumber + 'loader'}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            exit={{
              opacity: 0,
              transition: { ease: 'easeOut', duration: 0.3 },
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Box
              bg={colorMode === 'dark' ? 'neutral.400' : 'neutral.700'}
              position='absolute'
              opacity={0.1}
              h={dimensions.height + 'px'}
              w={dimensions.width}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {timeLeft <= 0 && (
          <motion.svg
            style={{ position: 'absolute' }}
            width={dimensions.width + 'px'}
            height={dimensions.height + 'px'}
            viewBox={`0 0 ${dimensions.width + 0} ${dimensions.height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { ease: 'easeOut', duration: 0.3 },
            }}
          >
            <defs>
              <filter
                id='neon'
                filterUnits='userSpaceOnUse'
                x='-50%'
                y='-50%'
                width='200%'
                height='200%'
              >
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='5'
                  result='blur5'
                />
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='10'
                  result='blur10'
                />
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='20'
                  result='blur20'
                />
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='30'
                  result='blur30'
                />
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='50'
                  result='blur50'
                />

                <feMerge result='blur-merged'>
                  <feMergeNode in='blur10' />
                  <feMergeNode in='blur20' />
                  <feMergeNode in='blur30' />
                  <feMergeNode in='blur50' />
                </feMerge>

                <feColorMatrix
                  result='red-blur'
                  in='blur-merged'
                  type='matrix'
                  values='1 0 0 0 0
                      0 0.06 0 0 0
                      0 0 0.44 0 0
                      0 0 0 1 0'
                />
                <feMerge>
                  <feMergeNode in='red-blur' />
                  <feMergeNode in='blur5' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            </defs>

            <svg className='neon' style={{ filter: 'url(#neon)' }} x={0} y={0}>
              <motion.path
                d={`M 0 0 h ${dimensions.width} v ${dimensions.height} h -${dimensions.width} v -${dimensions.height}`}
                stroke='LightSteelBlue'
                strokeWidth='2'
                animate={{
                  pathLength: [0, 1],
                  pathOffset: [0, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatType: 'loop',
                }}
              />
            </svg>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* SERVER */}
      <Center w='full' h='full' py={3} px={4} position='relative'>
        <Button
          as={NavLink}
          to={`${serverJoin}`}
          position='absolute'
          w='full'
          h='full'
          opacity='0'
          _hover={{ opacity: '80%' }}
          zIndex={10}
          fontWeight='bold'
          bg={colorMode === 'dark' ? 'neutral.800' : 'neutral.200'}
          textAlign='center'
          alignItems={'center'}
          justifyContent={'center'}
        >
          Connect to server #{serverNumber}
        </Button>
        <Flex
          direction='row'
          align='center'
          justify='space-between'
          position='relative'
          w='full'
        >
          <HStack>
            <Box position='relative' h={12} w={12}>
              <Image
                src={getMapImageUrl(event.type, maps[0].number)}
                // fallback={IMAGES.mapImageFallback}
                h={12}
                w={12}
                objectFit='cover'
                position='absolute'
                rounded='full'
                filter={timeLeft <= 0 ? 'grayscale(100%)' : 'grayscale(0%)'}
              />
              <Box position='absolute' bottom={0} right={0}>
                <Box
                  position='absolute'
                  rounded='full'
                  bottom={0}
                  right={0}
                  h={4}
                  w={4}
                  outline='3px solid'
                  outlineColor={
                    colorMode === 'dark'
                      ? 'neutral.800 !important'
                      : 'neutral.200 !important'
                  }
                  bg={
                    colorMode === 'dark'
                      ? 'neutral.800 !important'
                      : 'neutral.200 !important'
                  }
                >
                  <AnimatePresence mode='wait'>
                    {timeLeft <= 0 ? (
                      <Box
                        as={motion.div}
                        key={serverNumber + 'statusloading'}
                        initial={{ opacity: 0 }} // Start slightly enlarged
                        animate={{
                          opacity: 1,
                          transition: {
                            ease: 'backInOut',
                            duration: 0.3,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          transition: {
                            ease: 'easeOut',
                            duration: 0.3,
                          },
                        }}
                        rounded='full'
                        bg='red.600'
                        position='absolute'
                        h={4}
                        w={4}
                      />
                    ) : (
                      <Box
                        as={motion.div}
                        key={serverNumber + 'statusready'}
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                          transition: { ease: 'backInOut', duration: 0.3 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { ease: 'easeOut', duration: 0.3 },
                        }}
                        rounded='full'
                        bg='green.600'
                        position='absolute'
                        h={4}
                        w={4}
                      />
                    )}
                  </AnimatePresence>
                </Box>
              </Box>
            </Box>
            <VStack
              gap='1'
              align='start'
              lineHeight={1}
              textTransform='initial'
            >
              <Text fontWeight='medium'>Server {serverNumber}</Text>
              <AnimatePresence mode='wait'>
                {timeLeft <= 0 ? (
                  <motion.div
                    key={'mapnumberloading'}
                    initial={{ opacity: 0 }} // Start slightly enlarged
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Text as='span' fontWeight='thin' color='blue.500'>
                      Loading map {maps[1].number} ...
                    </Text>
                  </motion.div>
                ) : (
                  <motion.div
                    key={'mapnumberready'}
                    initial={{ opacity: 0 }} // Start slightly enlarged
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <HStack
                      fontWeight='thin'
                      gap={2}
                      color={
                        colorMode === 'dark' ? 'neutral.400' : 'neutral.700'
                      }
                      align='end'
                    >
                      <Text as='span'>Map</Text>
                      <Text
                        as='span'
                        fontWeight='bold'
                        color={
                          maps[0].finished
                            ? colorMode === 'dark'
                              ? 'green.300'
                              : 'green.500'
                            : ''
                        }
                      >
                        {maps[0].number}
                      </Text>
                      <Text
                        fontSize='xs'
                        display={{ base: 'none', sm: 'block' }}
                      >
                        {' '}
                        by {maps[0].author}{' '}
                      </Text>
                    </HStack>
                  </motion.div>
                )}
              </AnimatePresence>
            </VStack>
          </HStack>
          <HStack w='40%' justify='space-between' textTransform='initial'>
            <HStack
              justify='center'
              alignContent='start'
              textAlign='start'
              flexGrow={1}
            >
              {timeLeft < 3 ? (
                <motion.div
                  key={'timerrestarting'}
                  initial={{ opacity: 0 }} // Start slightly enlarged
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                >
                  <Text as='span' textColor='red'>
                    Restarting ...
                  </Text>
                </motion.div>
              ) : (
                <motion.div
                  key={'timerrunning'}
                  initial={{ opacity: 0 }} // Start slightly enlarged
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                >
                  <Text as='span' textColor={timeLeft < 300 ? 'orange' : ''}>
                    {timeLeft > 60
                      ? Math.floor(timeLeft / 60)
                          .toString()
                          .padStart(1, '0')
                      : '1'}
                    m left
                  </Text>
                </motion.div>
              )}
            </HStack>
            <VStack>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={'mapnumberloading'}
                  initial={{ opacity: 0 }} // Start slightly enlarged
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                >
                  <VStack
                    gap={0}
                    textColor={colorMode === 'dark' ? 'white' : 'black'}
                  >
                    <Text
                      color={
                        maps[1].finished
                          ? colorMode === 'dark'
                            ? 'green.300'
                            : 'green.500'
                          : ''
                      }
                    >
                      {maps[1].number}
                    </Text>
                    <Text
                      color={
                        maps[2].finished
                          ? colorMode === 'dark'
                            ? 'green.300'
                            : 'green.500'
                          : ''
                      }
                    >
                      {maps[2].number}
                    </Text>
                  </VStack>
                </motion.div>
              </AnimatePresence>
            </VStack>
          </HStack>
        </Flex>
      </Center>
    </Box>
  );
};

export default CompactServerList;
