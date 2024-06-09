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
        <HStack w='full' ml={{ base: 0, xl: 3 }}>
          <HStack
            justifyContent='space-around'
            align='center'
            h='8rem'
            textShadow='glow'
            letterSpacing='0.2em'
            fontSize='lg'
            fontWeight='400'
          >
            <VStack
              align='start'
              justifyContent='space-around'
              w='full'
              h='fit'
              gap={{ base: 3, md: 6 }}
            >
              <Text>Author:</Text>
              <Text>World record:</Text>
              <Text>
                {authentication.isLoggedIn ? (
                  <>Personal Best:</>
                ) : (
                  <>WR Holder:</>
                )}
              </Text>
            </VStack>
            <VStack
              align='start'
              justifyContent='space-around'
              w='full'
              h='fit'
              gap={{ base: 3, md: 6 }}
            >
              <Text fontSize='lg' fontWeight='400'>
                {data.author}
              </Text>
              <MapWRCell wrScore={data.wrScore} wrHolder={data.wrHolder} />
              {mode === 'minimal' ? null : (
                <>
                  <MapPBCell
                    personalBest={data.personalBest}
                    wrHolder={data.wrHolder}
                    kackyRank={data.kackyRank}
                  />
                </>
              )}
            </VStack>
          </HStack>
          <Center h='full'>
            <Divider orientation='vertical' />
          </Center>
          {authentication.isLoggedIn && mode !== 'minimal' ? (
            <HStack
              px={2}
              justifyContent='space-around'
              align='center'
              textShadow='glow'
              letterSpacing='0.2em'
              fontSize='lg'
              fontWeight='400'
              h='fit'
            >
              <VStack
                align='start'
                justifyContent='space-between'
                w='full'
                h='full'
                gap={{ base: 3, md: 6 }}
              >
                <Tooltip
                  label={`Rated Difficulty: ${data.rating}`}
                  placement='top'
                >
                  <Text>Difficulty:</Text>
                </Tooltip>
                <Text>Your clip:</Text>
                <Text display={mode === 'hunting' ? 'none' : 'inherit'}>
                  Discord Alarm:
                </Text>
              </VStack>
              <VStack
                alignContent='center'
                align='center'
                w='full'
                h='fit'
                gap={{ base: 3, md: 4 }}
              >
                <MapDifficultyCell
                  difficulty={data.difficulty}
                  mapId={data.number}
                  eventtype={eventtype}
                  // edition={edition}
                  table={table}
                  rowIndex={rowIndex}
                />
                <MapClipCell
                  default_clip={data.default_clip}
                  clip={data.clip}
                  mapId={data.number}
                  eventtype={eventtype}
                  // edition={edition}
                  rowIndex={rowIndex}
                  table={table}
                />
                <Flex
                  alignContent='center'
                  align='center'
                  display={mode === 'hunting' ? 'none' : 'inherit'}
                >
                  <MapDiscordCell
                    discordPing={data.discordPing}
                    eventtype={eventtype}
                    // edition={edition} // not used ?
                    table={table}
                    rowIndex={rowIndex}
                    mapId={data.number}
                  />
                </Flex>
              </VStack>
            </HStack>
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
                  <Text>Difficulty:</Text>
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
