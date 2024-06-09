import { Icon, Text, HStack, Badge, Flex } from '@chakra-ui/react';

import {
  MdOutlineCheckCircle,
  MdTag,
  MdLabelOutline,
  MdTimeline,
  MdAccessTime,
  MdStars,
  MdOutlineLeaderboard,
  MdOutlinePlayCircle,
  MdOutlineDns,
} from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
import { FaDiscord } from 'react-icons/fa';

import { createColumnHelper } from '@tanstack/react-table';

import { DateTime } from 'luxon';

import MapNumberCell from '@/components/HuntingScheduleTableCells/MapNumberCell';
import MapFinishedCell from '@/components/HuntingScheduleTableCells/MapFinishedCell';
import MapClipCell from '@/components/HuntingScheduleTableCells/MapClipCell';
// eslint-disable-next-line no-unused-vars
import MapDiscordCell from '@/components/HuntingScheduleTableCells/MapDiscordCell';

const columnHelper = createColumnHelper();

const diffColorArr = [
  'outline',
  'white',
  'green',
  'yellow',
  'orange',
  'red',
  'purple',
];

const defaultColumns = [
  columnHelper.accessor('finished', {
    id: 'finished',
    header: () => (
      <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdOutlineCheckCircle} />
    ),
    cell: info => (
      <Flex align={'center'} justify={'center'}>
        <MapFinishedCell finished={info.getValue()} />
      </Flex>
    ),
    sortingFn: (rowA, rowB) => {
      if (
        rowA.getValue('finished') + rowA.getValue('difficulty') / 10 >
        rowB.getValue('finished') + rowB.getValue('difficulty') / 10
      ) {
        return 1;
      }
      if (
        rowA.getValue('finished') + rowA.getValue('difficulty') / 10 <
        rowB.getValue('finished') + rowB.getValue('difficulty') / 10
      ) {
        return -1;
      }
      return 0;
    },
  }),
  columnHelper.accessor('difficulty', {
    id: 'difficulty',
    header: () => (
      <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdTimeline} />
    ),
    cell: info => (
      <Flex align={'center'} justify={'center'}>
        <Badge variant={diffColorArr[info.getValue()]}>&nbsp;&nbsp;</Badge>
      </Flex>
    ),
    sortingFn: (rowA, rowB) => {
      if (
        rowA.getValue('finished') / 10 + rowA.getValue('difficulty') >
        rowB.getValue('finished') / 10 + rowB.getValue('difficulty')
      ) {
        return 1;
      }
      if (
        rowA.getValue('finished') / 10 + rowA.getValue('difficulty') <
        rowB.getValue('finished') / 10 + rowB.getValue('difficulty')
      ) {
        return -1;
      }
      return 0;
    },
  }),
  columnHelper.accessor('number', {
    id: 'number',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdTag} />
        <Text display={{ base: 'none', xl: 'inline' }}>Map</Text>
      </Flex>
    ),
    cell: info => (
      <MapNumberCell
        author={info.row.original.author}
        finished={info.row.original.finished}
        number={info.getValue()}
        version={info.row.original.version}
      />
    ),
  }),
  columnHelper.accessor('author', {
    id: 'author',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdLabelOutline} />
        <Text display={{ base: 'none', xl: 'inline' }}>Author</Text>
      </Flex>
    ),
    cell: info => (
      <Text
        letterSpacing='0.1em'
        textShadow='glow'
        fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
      >
        {info.getValue().toString()}
      </Text>
    ),
  }),
  columnHelper.accessor('upcomingIn', {
    id: 'upcomingIn',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdAccessTime} />
        <Text display={{ base: 'none', xl: 'inline' }}>Upcoming</Text>
      </Flex>
    ),
    cell: info => (
      <HStack
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight='medium'
        letterSpacing='0.1em'
        textShadow='glow'
      >
        {info.getValue() > 0 ? (
          <Flex align={'center'} justify={'center'}>
            <Text display={info.getValue() >= 60 ? 'block' : 'none'}>
              {String(Math.floor(info.getValue() / 60)).padStart(2, '0')}
            </Text>
            <Text display={info.getValue() >= 60 ? 'block' : 'none'}>h</Text>
            <Text pl={1}>{String(info.getValue() % 60).padStart(2, '0')}</Text>
            <Text>m</Text>
          </Flex>
        ) : (
          <Text color={'green.400'}>Live now</Text>
        )}
      </HStack>
    ),
  }),
  columnHelper.accessor('server', {
    id: 'server',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdOutlineDns} />
        <Text display={{ base: 'none', xl: 'inline' }}>Server</Text>
      </Flex>
    ),
    cell: info => (
      <HStack align={'center'} justify={'center'}>
        <Text
          textShadow='glow'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          fontWeight='hairline'
        >
          #
        </Text>
        <Text
          textShadow='glow'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          fontWeight='medium'
        >
          {info.getValue()}
        </Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('personalBest', {
    id: 'personalBest',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdAccessTime} />
        <Text display={{ base: 'none', xl: 'inline' }}>PB</Text>
      </Flex>
    ),
    cell: info => (
      <Flex align={'center'} justify={'center'}>
        <Text
          letterSpacing='0.1em'
          textShadow='glow'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          fontWeight='medium'
        >
          {info.getValue() !== 0
            ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
            : '-'}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor('wrScore', {
    id: 'wrScore',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdStars} />
        <Text display={{ base: 'none', xl: 'inline' }}>WR</Text>
      </Flex>
    ),
    cell: info => (
      <Text
        letterSpacing='0.1em'
        textShadow='glow'
        fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
        fontWeight='medium'
      >
        {info.getValue() !== 0
          ? DateTime.fromMillis(info.getValue()).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('wrHolder', {
    id: 'wrHolder',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdStars} />
        <Text display={{ base: 'none', xl: 'inline' }}>WR Holder</Text>
      </Flex>
    ),
    cell: info => (
      <Text
        letterSpacing='0.1em'
        textShadow='glow'
        fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
        fontWeight='medium'
      >
        {info.getValue() !== '' ? info.getValue() : '-'}
      </Text>
    ),
  }),
  columnHelper.accessor('kackyRank', {
    id: 'kackyRank',
    header: () => (
      <Flex
        align={'center'}
        justify={'center'}
        fontSize={{ base: 'sm' }}
        gap={1}
      >
        <Icon
          boxSize={{ base: '16px', lg: '20px' }}
          as={MdOutlineLeaderboard}
        />
        <Text display={{ base: 'none', xl: 'inline' }}>Local</Text>
      </Flex>
    ),
    cell: info => (
      <HStack align={'center'} justify={'center'}>
        <Text
          textShadow='glow'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          fontWeight='hairline'
        >
          {info.getValue() !== 0 ? '#' : ''}
        </Text>
        <Text
          textShadow='glow'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          fontWeight='medium'
        >
          {info.getValue() !== 0 ? info.getValue() : '-'}
        </Text>
      </HStack>
    ),
  }),
  columnHelper.accessor('clip', {
    id: 'clip',
    header: () => (
      <>
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={MdOutlinePlayCircle} />
        <Text display={{ base: 'none', xl: 'inline' }}>Clip</Text>
      </>
    ),
    cell: info => (
      <MapClipCell
        rowIndex={info.row.index}
        table={info.table}
        mapId={info.row.original.number}
        clip={info.getValue()}
      />
    ),
  }),
  columnHelper.accessor('discordPing', {
    id: 'discordPing',
    header: () => (
      <>
        <Icon boxSize={{ base: '16px', lg: '20px' }} as={FaDiscord} />
        <Text display={{ base: 'none', xl: 'inline' }}>Ping</Text>
      </>
    ),
    cell: info => (
      <MapDiscordCell
        rowIndex={info.row.index}
        table={info.table}
        mapId={info.row.original.number}
        discordPing={info.getValue()}
      />
    ),
  }),
];

export default defaultColumns;
