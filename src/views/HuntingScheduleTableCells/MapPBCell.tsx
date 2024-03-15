import { Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { memo, useContext } from 'react';
import AuthContext from '@/context/AuthContext';

type MapPBCellProps = {
  personalBest: number;
  kackyRank: number;
  wrHolder: string;
};

const MapPBCell = memo<MapPBCellProps>(
  ({ personalBest, kackyRank, wrHolder }) => {
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
          {authentication.isLoggedIn ? <>Personal Best:</> : <>WR Holder:</>}
        </Text>
        <Text w='50%' lineHeight='6'>
          {authentication.isLoggedIn
            ? personalBest !== 0
              ? `${DateTime.fromMillis(personalBest).toFormat(
                  'mm:ss.SSS'
                )} (Rank ${kackyRank.toString()})`
              : '-'
            : wrHolder}
        </Text>
      </>
    );
  }
);

export default MapPBCell;
