/* eslint-disable react/prop-types */
import { useContext, memo } from 'react';

import { Switch, useToast } from '@chakra-ui/react';

import { useMutation } from '@tanstack/react-query';

import AuthContext from '@/context/AuthContext';
import { postSpreadsheetData } from '@/api/api';

type MapDiscordCellProps = {
  discordPing: boolean;
  eventtype: string;
  rowIndex: number;
  table: any;
  mapId: number;
};

const MapDiscordCell = memo<MapDiscordCellProps>(
  ({ discordPing, eventtype, rowIndex, table, mapId }) => {
    const { authentication } = useContext(AuthContext);

    const toast = useToast();

    let alarmState = discordPing;
    const mutation = useMutation({
      mutationKey: ['postMapClipCell'],
      mutationFn: async (data: MapDifficultyCellSubmitProps) => {
        await postSpreadsheetData(data, eventtype);
      },
      onSuccess: () => {
        table.options.meta.updateData(rowIndex, 'discordPing', alarmState);
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'An error occurred!',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    });

    // Cork doesnt want the actual value xdd
    // eslint-disable-next-line no-unused-vars
    function onSubmit() {
      alarmState = !alarmState;
      const data = {
        mapid: mapId,
        alarm: alarmState,
        token: authentication.token,
      };
      mutation.mutate(data);
    }

    return (
      <Switch
        isDisabled={!authentication.isLoggedIn}
        // isDisabled="true"
        // onChange={e => onSubmit(e.target.value)}
        onChange={() => onSubmit()}
        defaultChecked={alarmState}
      />
    );
  }
);

export default MapDiscordCell;
