import {
  Center,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  Badge,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  useTheme,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DateTime } from 'luxon';
import { MdOutlineCheckCircle } from 'react-icons/md';
import MapImageModal from '@/components/MapImageModal';

import { getMapImageUrl } from '@/api/api';
// import mapImageFallback from '@/assets/images/mapImageFallback.jpg';
import EventContext from '@/context/EventContext';
import { diffBadgeColorArr, getDefaultBackgrounds } from '@/utils/theme';

const nextMapsFontWeight = ['medium', 'normal', 'light'];

const ServerCard = ({
  serverNumber,
  serverDifficulty,
  maps,
  timeLimit,
  timeLeft,
}: Server) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalNextMap1 = useDisclosure();
  const modalNextMap2 = useDisclosure();
  const modalNextMap3 = useDisclosure();

  const nextMapModals = [modalNextMap1, modalNextMap2, modalNextMap3];

  const imageUrl = getMapImageUrl(event.type, maps[0].number);

  return (
    <Box
      // Image fallback doesn't work for some reason with bgImage
      bgImage={`url(${imageUrl})`}
      bgColor={`${colorMode === 'dark' ? 'black' : 'white'}`}
      bgPosition='center'
      bgRepeat='no-repeat'
      bgSize='cover'
      position='relative'
    >
      <Box
        w='full'
        h='full'
        bgColor={`${
          colorMode === 'dark'
            ? getDefaultBackgrounds().dark[1]
            : getDefaultBackgrounds().light[1]
        }75`}
      >
        <Center
          px={{ base: 4, md: 8 }}
          w='full'
          h='full'
          bgGradient={{
            base: `linear(to-r, background 0%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 55%,  ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            } 100%)`,
            md: `linear(to-r, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 0%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            }80 55%,  ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 100%)`,
            xl: `linear(to-r, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 0%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            }80 55%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 100%)`,
          }}
        >
          <Flex
            direction={{ base: 'column', md: 'row', xl: 'row' }}
            align={{ base: 'center' }}
            // pl={{ base: 8, sm: 16, xl: 0 }}
            py={{ base: 8, lg: 2 }}
            gap={{ base: 8 }}
            justify={{ base: 'center', md: 'space-between' }}
            w='container.xl'
          >
            {/* SERVER */}
            <HStack
              spacing={4}
              alignItems={['center']}
              justifyContent={{ base: 'center', xl: 'start' }}
            >
              <Text textShadow='glow' w='85px' fontSize='5xl' lineHeight='48px'>
                # {serverNumber}
              </Text>
              {serverDifficulty !== '' ? ( // Servers do not have a difficulty in Phase 1
                <Badge
                  fontSize={'xl'}
                  visibility={
                    serverDifficulty === 'undefined' ? 'hidden' : 'visible'
                  }
                  variant={diffBadgeColorArr[serverDifficulty].variant}
                >
                  {serverDifficulty}
                </Badge>
              ) : null}
            </HStack>

            {/* MAP NUMBER */}
            <HStack
              px={4}
              onClick={onOpen}
              cursor='pointer'
              _hover={{ transform: 'scale(1.05)' }}
              transition='transform 0.1s ease-in-out'
            >
              <Text
                fontSize='2xl'
                lineHeight='24px'
                letterSpacing='0.4em'
                fontWeight='light'
                align='right'
                textShadow='glow'
              >
                {event.type === 'kk' ? 'Kackiest' : 'Kacky'}
                <br />
                {event.type === 'kk' ? 'Kacky' : 'Reloaded'}
              </Text>
              <HStack spacing={0}>
                <Text
                  lineHeight='60px'
                  textShadow='glow'
                  fontSize='6xl'
                  letterSpacing='0.1em'
                  fontWeight='bold'
                >
                  {maps[0].number}
                </Text>
                {maps[0].finished ? (
                  <Icon
                    color={colorMode === 'dark' ? 'green.300' : 'green.500'}
                    boxSize='20px'
                    alignSelf='flex-start'
                    filter={
                      colorMode === 'dark'
                        ? theme.shadows.finGlowDark
                        : theme.shadows.finGlowLight
                    }
                    as={MdOutlineCheckCircle}
                  />
                ) : null}
              </HStack>
            </HStack>

            {/* NEXT MAPS */}
            <Flex
              direction={'row'}
              justify='end'
              align='center'
              gap={{ base: '2', md: '4', lg: '10', xl: '10' }}
            >
              <Flex direction='row' gap={2}>
                <Flex
                  h='88px'
                  direction='column'
                  justify='stretch'
                  align='center'
                >
                  <Box
                    bg={colorMode === 'dark' ? 'white' : 'black'}
                    w='2px'
                    h='full'
                    boxShadow='glow'
                  />
                  <Box
                    filter={
                      colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                    }
                  >
                    <svg
                      fill={colorMode === 'dark' ? 'white' : 'black'}
                      height='12px'
                      width='12px'
                    >
                      <polygon points='0,0 12,0 6,12' />
                    </svg>
                  </Box>
                </Flex>
                <Flex direction='column' align='flex-start' gap={2}>
                  {maps.slice(1).map((map: ServerMap, index: number) => (
                    <HStack
                      onClick={nextMapModals[index].onOpen}
                      cursor='pointer'
                      w='100%'
                      justify='flex-start'
                      _hover={{ transform: 'scale(1.05)' }}
                      transition='transform 0.1s ease-in-out'
                      spacing={1}
                      key={map.number}
                    >
                      <Text
                        lineHeight='24px'
                        fontWeight={nextMapsFontWeight[index]}
                        fontSize='2xl'
                        letterSpacing='0.1em'
                        textShadow='glow'
                        w='100%'
                      >
                        {map.number}
                      </Text>
                      {map.finished ? (
                        <Icon
                          color={
                            colorMode === 'dark' ? 'green.300' : 'green.500'
                          }
                          boxSize='20px'
                          filter={
                            colorMode === 'dark'
                              ? theme.shadows.finGlowDark
                              : theme.shadows.finGlowLight
                          }
                          as={MdOutlineCheckCircle}
                        />
                      ) : null}
                      <MapImageModal
                        mapNumber={map.number}
                        author={map.author}
                        isFinished={map.finished}
                        isOpen={nextMapModals[index].isOpen}
                        onClose={nextMapModals[index].onClose}
                        eventtype={event.type}
                      />
                    </HStack>
                  ))}
                </Flex>
              </Flex>
              {/* TIME LEFT */}
              <Flex justify='center' align='center' h='7rem' w='7rem'>
                <AnimatePresence>
                  {timeLeft <= 0 ? (
                    <motion.div
                      key='loading'
                      initial={{ opacity: 0, scale: 1.1, position: 'absolute' }} // Start slightly enlarged
                      animate={{ opacity: 1, scale: 1, position: 'absolute' }} // Animate layout changes
                      exit={{ opacity: 0, scale: 0.9, position: 'absolute' }} // End slightly smaller
                      transition={{ duration: 0.5 }}
                    >
                      <Text
                        align='center'
                        width='114px'
                        color='red.500'
                        filter={
                          colorMode === 'dark'
                            ? theme.shadows.dropGlowDark
                            : theme.shadows.dropGlow
                        }
                        _dark={{ color: 'red.500' }}
                        fontWeight='bold'
                        fontSize={{ base: 'xl', md: 'xl', xl: 'lg' }}
                        letterSpacing='0.1em'
                        m={0}
                      >
                        Loading next Map
                      </Text>
                    </motion.div>
                  ) : (
                    <motion.div
                      key='timer'
                      initial={{ opacity: 0, scale: 0.9, position: 'absolute' }} // Start slightly shrunk
                      animate={{ opacity: 1, scale: 1, position: 'absolute' }}
                      exit={{ opacity: 0, scale: 1.1, position: 'absolute' }} // End slightly enlarged
                      transition={{ duration: 0.5 }}
                    >
                      <CircularProgress
                        trackColor='transparent'
                        thickness='2px'
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        value={timeLeft > 0 ? (timeLeft / timeLimit) * 100 : 0}
                        filter={
                          colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                        }
                        size='114px'
                      >
                        <CircularProgressLabel
                          fontWeight='semilight'
                          fontSize='2xl'
                          letterSpacing='0.1em'
                          sx={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {DateTime.fromSeconds(timeLeft).toFormat('mm:ss')}
                        </CircularProgressLabel>
                      </CircularProgress>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Flex>
            </Flex>
          </Flex>
        </Center>
      </Box>
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
export default ServerCard;
