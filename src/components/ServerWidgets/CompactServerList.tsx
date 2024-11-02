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
  Badge,
  useDisclosure,
  Icon,
  CircularProgressLabel,
  useTheme,
} from '@chakra-ui/react';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { getMapImageUrl } from '@/api/api';
// import mapImageFallback from '@/assets/images/mapImageFallback.jpg';
import EventContext from '@/context/EventContext';
import { diffBadgeColorArr, getDefaultBackgrounds } from '@/utils/theme';
import { IMAGES } from '@/utils/Images';
import { NavLink } from 'react-router-dom';
import MapImageModal from '../MapImageModal';

// eslint-disable-next-line no-unused-vars
const CompactServerList = ({
  serverNumber,
  serverDifficulty,
  maps,
  timeLeft,
  serverJoin,
  isSuccess,
  isLoading,
}: Server) => {
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalNextMap1 = useDisclosure();
  const modalNextMap2 = useDisclosure();
  const modalNextMap3 = useDisclosure();
  const theme = useTheme();

  const nextMapModals = [modalNextMap1, modalNextMap2, modalNextMap3];

  const imageUrl = getMapImageUrl(event.type, maps[0].number);
  // const imageUrl = getMapImageUrl('kr', 250);

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
            style={{ position: 'absolute', zIndex: 5 }}
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
              zIndex={5}
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
            style={{ position: 'absolute', zIndex: 5 }}
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

            <svg
              className='neon'
              style={{ filter: 'url(#neon)', zIndex: 5 }}
              x={0}
              y={0}
            >
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
      <Center w='full' h='full'>
        <Flex
          direction='row'
          align='center'
          justify='space-between'
          position='relative'
          w='full' // Image fallback doesn't work for some reason with bgImage
          bgImage={`url(${imageUrl})`}
          bgColor={`${colorMode === 'dark' ? 'black' : 'white'}`}
          bgPosition='center'
          bgRepeat='no-repeat'
          bgSize='cover'
          transition='transform 0.1s ease-in-out'
          p={0}
          // filter={timeLeft < 3 ? 'grayscale(100%)' : 'grayscale(0%)'}
        >
          <Flex
            direction='row'
            align='center'
            justify='space-between'
            position='relative'
            w='full'
            px={{ base: 3, md: 4 }}
            bgColor={`${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }99`}
          >
            {/* <Image
            src={getMapImageUrl(event.type, maps[0].number)}
            onClick={onOpen}
            cursor='pointer'
            _hover={{ transform: 'scale(1.05)' }}
            transition='transform 0.1s ease-in-out'
            // fallback={IMAGES.mapImageFallback}
            h='full'
            w='full'
            objectFit='cover'
            position='absolute'
            rounded='1rem'
            filter={timeLeft < 3 ? 'grayscale(100%)' : 'grayscale(0%)'}
          /> */}
            {serverDifficulty !== '' ? ( // Servers do not have a difficulty in Phase 1
              <Badge
                w={'1rem'}
                h={'100%'}
                left={0}
                position={'absolute'}
                visibility={
                  serverDifficulty === 'undefined' ? 'hidden' : 'visible'
                }
                variant={diffBadgeColorArr[serverDifficulty].variant}
              ></Badge>
            ) : null}
            <HStack gap={4} pl={2}>
              <Box position='relative' alignContent={'center'} w={'2rem'}>
                <Text
                  fontWeight='medium'
                  fontSize={'2xl'}
                  rounded='full'
                  filter={timeLeft < 1 ? 'grayscale(100%)' : 'grayscale(0%)'}
                  transition='transform 1s ease-in-out'
                  textAlign={'center'}
                >
                  #{serverNumber}
                </Text>
              </Box>
              <VStack
                gap='1'
                align='start'
                lineHeight={0.75}
                textTransform='initial'
              >
                <AnimatePresence mode='wait'>
                  {timeLeft <= 0 ? (
                    <motion.div
                      key={'mapnumberloadingserver'}
                      initial={{ opacity: 0 }} // Start with 0 opacity
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{ ease: 'easeInOut', duration: 0.3 }}
                    >
                      <Text
                        as='span'
                        fontWeight='bold'
                        color={colorMode === 'dark' ? 'blue.500' : 'blue.500'}
                        filter={
                          colorMode === 'dark'
                            ? theme.shadows.dropGlowDark
                            : theme.shadows.dropGlow
                        }
                      >
                        Loading {maps[1].number} ...
                      </Text>
                    </motion.div>
                  ) : (
                    <>
                      {isSuccess && (
                        <motion.div
                          key={'mapnumberready'}
                          initial={{ opacity: 0 }} // Start with 0 opacity
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          transition={{ ease: 'easeInOut', duration: 0.3 }}
                        >
                          <HStack
                            // fontWeight='thin'
                            gap={2}
                            color={
                              colorMode === 'dark'
                                ? 'neutral.100'
                                : 'neutral.900'
                            }
                            align='end'
                            fontSize={'2xl'}
                            onClick={onOpen}
                            cursor='pointer'
                            _hover={{ transform: 'scale(1.05)' }}
                            transition='transform 0.1s ease-in-out'
                          >
                            {/* <Text as='span'>Map</Text> */}
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
                              filter={
                                maps[0].finished
                                  ? colorMode === 'dark'
                                    ? theme.shadows.finGlowDark
                                    : theme.shadows.finGlowLight
                                  : colorMode === 'dark'
                                    ? theme.shadows.dropGlowDark
                                    : theme.shadows.dropGlow
                              }
                            >
                              {maps[0].number}
                            </Text>
                            <Text
                              fontSize='sm'
                              display={{ base: 'none', sm: 'block' }}
                              filter={
                                colorMode === 'dark'
                                  ? theme.shadows.dropGlowDark
                                  : theme.shadows.dropGlow
                              }
                            >
                              {' '}
                              by {maps[0].author}{' '}
                            </Text>
                          </HStack>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </VStack>
            </HStack>
            <HStack
              w='fit-content'
              gap={4}
              justify='space-between'
              textTransform='initial'
            >
              <HStack
                justify='center'
                alignContent='start'
                textAlign='start'
                flexGrow={1}
              >
                {timeLeft <= 0 ? (
                  <motion.div
                    key={'timerrestarting'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Text
                      as='span'
                      textColor='red'
                      fontWeight={'bold'}
                      sx={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      00:00
                    </Text>
                  </motion.div>
                ) : (
                  <motion.div
                    key={'timerrunning'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Flex justify='center' align='center' h='2rem' w='3rem'>
                      <Text
                        alignContent={'center'}
                        as='span'
                        fontWeight={'bold'}
                        textColor={
                          timeLeft < 300
                            ? colorMode === 'dark'
                              ? 'orange.500'
                              : 'orange.500'
                            : ''
                        }
                        sx={{ fontVariantNumeric: 'tabular-nums' }}
                        filter={
                          colorMode === 'dark'
                            ? theme.shadows.dropGlowDark
                            : theme.shadows.dropGlow
                        }
                      >
                        {/* {timeLeft > 60
                        ? Math.floor(timeLeft / 60)
                            .toString()
                            .padStart(1, '0')
                        : '1'}
                      m left */}
                        {DateTime.fromSeconds(timeLeft).toFormat('mm:ss')}
                      </Text>
                    </Flex>
                  </motion.div>
                )}
              </HStack>

              <VStack display={{ base: 'none', md: 'flex' }}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={'mapjoinloading'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Flex
                      gap={0}
                      textColor={colorMode === 'dark' ? 'white' : 'black'}
                    >
                      <Button
                        as={NavLink}
                        to={`${serverJoin}`}
                        position='relative'
                        w='fit'
                        fontSize={'xs'}
                        h='2rem'
                        p={1}
                        _hover={{
                          bg:
                            colorMode === 'dark'
                              ? 'neutral.700 !important'
                              : 'neutral.300 !important',
                        }}
                        fontWeight='bold'
                        bg={
                          colorMode === 'dark'
                            ? 'neutral.800 !important'
                            : 'neutral.200 !important'
                        }
                        textAlign='center'
                        alignItems={'center'}
                        justifyContent={'center'}
                        filter={
                          colorMode === 'dark'
                            ? theme.shadows.dropGlowDark
                            : theme.shadows.dropGlow
                        }
                      >
                        Join
                      </Button>
                    </Flex>
                  </motion.div>
                </AnimatePresence>
              </VStack>
              <VStack>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={'mapnumberloadingnext'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
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
                      justify={'end'}
                      minW={'2rem'}
                    >
                      {maps.slice(1).map((map: ServerMap, index: number) => (
                        <Fragment key={map.number}>
                          <Text
                            onClick={nextMapModals[index].onOpen}
                            cursor='pointer'
                            _hover={{ transform: 'scale(1.1)' }}
                            fontWeight={'bold'}
                            transition='transform 0.1s ease-in-out'
                            color={
                              map.finished
                                ? colorMode === 'dark'
                                  ? 'green.300'
                                  : 'green.500'
                                : ''
                            }
                            filter={
                              map.finished
                                ? colorMode === 'dark'
                                  ? theme.shadows.finGlowDark
                                  : theme.shadows.finGlowLight
                                : colorMode === 'dark'
                                  ? theme.shadows.dropGlowDark
                                  : theme.shadows.dropGlow
                            }
                          >
                            {map.number}
                          </Text>
                          <MapImageModal
                            mapNumber={map.number}
                            author={map.author}
                            isFinished={map.finished}
                            isOpen={nextMapModals[index].isOpen}
                            onClose={nextMapModals[index].onClose}
                            eventtype={event.type}
                          />
                        </Fragment>
                      ))}
                    </VStack>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            </HStack>
          </Flex>
        </Flex>
      </Center>
      <MapImageModal
        mapNumber={maps[0].number}
        author={maps[0].author}
        isFinished={maps[0].finished}
        isOpen={isOpen}
        onClose={onClose}
        eventtype={event.type}
      />
    </Box>
  );
};

export default CompactServerList;
