import { memo, useContext } from 'react';
import {
  Text,
  Flex,
  Center,
  useDisclosure,
  Box,
  Tooltip,
  Image,
  Divider,
  HStack,
  VStack,
} from '@chakra-ui/react';

import { getMapImageUrl } from '@/api/api';
import MapDiscordCell from './MapDiscordCell';
import { MapDifficultyCell } from './MapDifficultyCell';
import MapClipCell from './MapClipCell';
import MapImageModal from '@/components/MapImageModal';
import AuthContext from '@/context/AuthContext';
import MapWRCell from './MapWRCell';
import MapPBCell from './MapPBCell';

type DataProps = {
  author: string;
  default_clip: string;
  clip: string;
  difficulty: number;
  discordPing: boolean;
  finished: boolean;
  kackyRank: number;
  number: number;
  personalBest: number;
  rating: number;
  wrHolder: string;
  wrScore: number;
  // version: string; // check if needed
};

type MapDetailCellProps = {
  data: DataProps;
  mode: string;
  eventtype: string;
  // edition: number;
  table: Object; // React table component prop fix is necessary
  rowIndex: number;
};

const MapDetailCell = memo<MapDetailCellProps>(
  ({ data, mode, eventtype, table, rowIndex }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { authentication } = useContext(AuthContext);

    return (
      <Flex margin={3} w='full'>
        <Center display={{ base: 'none', xl: 'initial' }} position='relative'>
          <Image
            w={[200, 250, 300]}
            alt='Map'
            fallbackSrc='/assets/images/mapImageFallback.jpg'
            src={getMapImageUrl(eventtype, data.number)}
            onClick={onOpen}
            cursor='pointer'
          />
          <MapImageModal
            mapNumber={data.number}
            author={data.author}
            isFinished={data.finished}
            isOpen={isOpen}
            onClose={onClose}
            eventtype={eventtype}
          />
        </Center>
        <HStack px={4} w='full'>
          <VStack
            direction='column'
            justifyContent='space-around'
            align='start'
            px={2}
            w='50%'
          >
            <Flex alignContent='center' align='center' w='full'>
              <Text
                width='50%'
                textShadow='glow'
                letterSpacing='0.2em'
                fontSize='lg'
                fontWeight='400'
              >
                Author:
              </Text>
              <Text w='50%'>{data.author}</Text>
            </Flex>
            <Flex w='full' alignContent='center' align='center'>
              <MapWRCell wrScore={data.wrScore} wrHolder={data.wrHolder} />
            </Flex>
            {mode === 'minimal' ? null : (
              <Flex w='full' align='center'>
                <MapPBCell
                  personalBest={data.personalBest}
                  wrHolder={data.wrHolder}
                  kackyRank={data.kackyRank}
                />
              </Flex>
            )}
          </VStack>
          <Center h='full'>
            <Divider orientation='vertical' />
          </Center>
          {authentication.isLoggedIn && mode !== 'minimal' ? (
            <VStack w='50%' align='start' px={2} justifyContent='space-around'>
              <Flex alignContent='center' align='center'>
                <Tooltip
                  label={`Rated Difficulty: ${data.rating}`}
                  placement='top'
                >
                  <Text
                    textShadow='glow'
                    letterSpacing='0.2em'
                    fontSize='lg'
                    fontWeight='400'
                  >
                    Difficulty:
                  </Text>
                </Tooltip>
                <MapDifficultyCell
                  difficulty={data.difficulty}
                  mapId={data.number}
                  eventtype={eventtype}
                  // edition={edition}
                  table={table}
                  rowIndex={rowIndex}
                />
              </Flex>
              <Flex height='40px' align='center'>
                <Text
                  width='200px'
                  textShadow='glow'
                  letterSpacing='0.2em'
                  fontSize='lg'
                  fontWeight='400'
                >
                  Your clip:
                </Text>
                <MapClipCell
                  default_clip={data.default_clip}
                  clip={data.clip}
                  mapId={data.number}
                  eventtype={eventtype}
                  // edition={edition}
                  rowIndex={rowIndex}
                  table={table}
                />
              </Flex>
              <Flex
                alignContent='center'
                height='40px'
                align='center'
                display={mode === 'hunting' ? 'none' : 'inherit'}
              >
                <Box>
                  <Text
                    width='200px'
                    textShadow='glow'
                    letterSpacing='0.2em'
                    fontSize='lg'
                    fontWeight='400'
                  >
                    Discord Alarm:
                  </Text>
                  <MapDiscordCell
                    discordPing={data.discordPing}
                    eventtype={eventtype}
                    // edition={edition} // not used ?
                    table={table}
                    rowIndex={rowIndex}
                    mapId={data.number}
                  />
                </Box>
              </Flex>
            </VStack>
          ) : mode === 'minimal' ? null : (
            <Flex
              marginLeft='20'
              direction='column'
              justifyContent='space-around'
            >
              <Flex alignContent='center' height='40px' align='center'>
                <Tooltip
                  label={`Rated Difficulty: ${data.rating}`}
                  placement='start'
                >
                  <Text
                    width='200px'
                    textShadow='glow'
                    letterSpacing='0.2em'
                    fontSize='lg'
                    fontWeight='400'
                  >
                    Difficulty:
                  </Text>
                </Tooltip>
                <MapDifficultyCell
                  difficulty={data.difficulty}
                  mapId={data.number}
                  eventtype={eventtype}
                  // edition={edition} // not used?
                  table={table}
                  rowIndex={rowIndex}
                />
              </Flex>
            </Flex>
          )}
        </HStack>
      </Flex>
    );
  }
);

export default MapDetailCell;
