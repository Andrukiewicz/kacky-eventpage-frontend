import { HStack, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { memo, useContext } from 'react';
import AuthContext from '@/context/AuthContext';

type MapWRCellProps = {
  wrScore: number;
  wrHolder: string;
};

const MapWRCell = memo<MapWRCellProps>(({ wrScore, wrHolder }) => {
  const { authentication } = useContext(AuthContext);

  return (
    <HStack gap={1} alignItems={'baseline'}>
      <Text fontSize='lg' fontWeight='400'>
        {wrScore !== 0
          ? DateTime.fromMillis(wrScore).toFormat('mm:ss.SSS')
          : '-'}
      </Text>
      {authentication.isLoggedIn ? (
        <Text fontSize={'xs'}>by {wrHolder !== '' ? wrHolder : '-'}</Text>
      ) : null}
    </HStack>
  );
});

export default MapWRCell;
