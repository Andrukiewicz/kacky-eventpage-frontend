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
      <Text fontSize='lg' fontWeight='400'>
        {authentication.isLoggedIn
          ? personalBest !== 0
            ? `${DateTime.fromMillis(personalBest).toFormat(
                'mm:ss.SSS'
              )} (Rank ${kackyRank.toString()})`
            : '-'
          : wrHolder}
      </Text>
    );
  }
);

export default MapPBCell;
