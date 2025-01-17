import { Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
type TPlayerCard = {
  name: string;
  rank: number;
  fins: number;
  avg: number;
  wrs: number;
};

const PlayerCard = ({ name, rank, fins, avg, wrs }: TPlayerCard) => {
  let rankcolor = '#000000';
  let medal = '';
  if (rank === 1) {
    rankcolor = '#FFD700';
    medal = '🥇';
  }
  if (rank === 2) {
    rankcolor = '#C0C0C0';
    medal = '🥈';
  }
  if (rank === 3) {
    rankcolor = '#CD7F32';
    medal = '🥉';
  }

  return (
    <Flex
      flexDir={'column'}
      marginTop={(rank - 1) * 5}
      width={{ base: 115, md: 160 }}
    >
      <Text
        fontSize={rank === 1 ? 30 : 25}
        color={rankcolor}
        whiteSpace={{ base: 'pre-line', md: 'unset' }}
      >
        {medal}
        {'\n'}
        {name}
      </Text>
      <Text fontSize='lg'>Fins: {fins}</Text>
      <Text fontSize='lg'>Average: {avg}</Text>
      <Text fontSize='lg'>Wr's: {wrs}</Text>
    </Flex>
  );
};

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  fins: PropTypes.number.isRequired,
  avg: PropTypes.number.isRequired,
};

export default PlayerCard;
