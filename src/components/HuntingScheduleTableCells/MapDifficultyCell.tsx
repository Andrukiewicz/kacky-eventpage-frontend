/* eslint-disable react/prop-types */
import { useContext, useState, memo } from 'react';

import {
  Text,
  Badge,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useToast,
} from '@chakra-ui/react';

import { useMutation } from '@tanstack/react-query';

import AuthContext from '@/context/AuthContext';
import { postSpreadsheetData } from '@/api/api';
import { SubmitHandler } from 'react-hook-form';

interface DiffBadgeColor {
  variant: string;
  text: string;
}

const diffBadgeColorArr: DiffBadgeColor[] = [
  { variant: 'outline', text: 'Not Set' },
  { variant: 'white', text: 'Free' },
  { variant: 'green', text: 'Easy' },
  { variant: 'yellow', text: 'Medium' },
  { variant: 'orange', text: 'Hard' },
  { variant: 'red', text: 'Imp' },
];

interface MapDifficultyCellProps {
  difficulty: number;
  eventtype: string;
  rowIndex: number;
  table: any; // Replace with the actual type of the `table` prop
  mapId: number;
}

const MapDifficultyCell = memo<MapDifficultyCellProps>(
  ({ difficulty, eventtype, rowIndex, table, mapId }) => {
    const { authentication } = useContext(AuthContext);
    const [renderMenuList, setRenderMenuList] = useState(false);
    const [newDifficulty, setNewDifficulty] = useState(difficulty);

    const toast = useToast();

    // Type annotation for newDifficulty
    // let newDifficulty: number;
    const mutation = useMutation({
      mutationKey: ['postSpreadsheetMapDifficulty'],
      mutationFn: async (data: MapDifficultyCellSubmitProps) => {
        await postSpreadsheetData(data, eventtype);
      },
      onSuccess: () => {
        table.options.meta.updateData(rowIndex, 'difficulty', newDifficulty);
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

    const onSubmit: SubmitHandler<MapDifficultyCellSubmitProps> = data => {
      if (typeof data.diff !== 'undefined') {
        setNewDifficulty(data.diff);
      }
      mutation.mutateAsync(data);
    };

    return (
      <Menu autoSelect={false}>
        <MenuButton
          onClick={() => setRenderMenuList(true)}
          disabled={!authentication.isLoggedIn}
          _hover={{ bg: 'whiteAlpha.200' }}
          textAlign='left'
          w='100'
          h='full'
          borderRadius='none'
        >
          <Badge
            variant={diffBadgeColorArr[newDifficulty].variant}
            fontSize='medium'
          >
            {diffBadgeColorArr[newDifficulty].text}
          </Badge>
        </MenuButton>
        {renderMenuList ? (
          <MenuList minW='0' w='auto' p='0'>
            {diffBadgeColorArr.map((diff, index) => (
              <MenuItem
                onClick={() =>
                  onSubmit({
                    mapid: mapId,
                    diff: index,
                    token: authentication.token,
                  })
                }
                key={diff.text}
                px={6}
                h={10}
                justifyContent='center'
              >
                {diff.text === 'undefined' ? (
                  <Text>none</Text>
                ) : (
                  <Badge variant={diff.variant} fontSize='medium'>
                    {diff.text}
                  </Badge>
                )}
              </MenuItem>
            ))}
          </MenuList>
        ) : null}
      </Menu>
    );
  }
);

export { diffBadgeColorArr, MapDifficultyCell };
