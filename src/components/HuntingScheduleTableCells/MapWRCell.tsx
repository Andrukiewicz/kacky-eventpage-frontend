import { Text } from '@chakra-ui/react';
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
    <>
      <Text fontSize='lg' fontWeight='400'>
        {wrScore !== 0
          ? DateTime.fromMillis(wrScore).toFormat('mm:ss.SSS')
          : '-'}
        {authentication.isLoggedIn ? (
          <>
            <br />
            by {wrHolder !== '' ? wrHolder : '-'}
          </>
        ) : null}
      </Text>
    </>
  );
});

export default MapWRCell;
