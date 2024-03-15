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
      <Text
        width='50%'
        textShadow='glow'
        letterSpacing='0.2em'
        fontSize='lg'
        fontWeight='400'
      >
        World Record:
      </Text>
      <Text lineHeight='6' w='50%'>
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
