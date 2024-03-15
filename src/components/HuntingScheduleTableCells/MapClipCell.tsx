/* eslint-disable react/prop-types */
import { useContext, memo, useState } from 'react';

import {
  IconButton,
  HStack,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Link,
  Icon,
  useToast,
} from '@chakra-ui/react';

import {
  MdOutlinePlayCircle,
  MdAddCircleOutline,
  MdOutlineModeEdit,
} from 'react-icons/md';

import { useMutation } from '@tanstack/react-query';

import AuthContext from '@/context/AuthContext';
import { postSpreadsheetData } from '@/api/api';
import { SubmitHandler } from 'react-hook-form';

type MapClipCellProps = {
  default_clip: string;
  clip: string;
  eventtype: string;
  rowIndex: number;
  table: any;
  mapId: number;
};

const MapClipCell = memo<MapClipCellProps>(
  ({ clip, eventtype, rowIndex, table, mapId }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { authentication } = useContext(AuthContext);
    const [renderPopOver, setRenderPopOver] = useState(true);

    const toast = useToast();

    const [currentClip, setCurrentClip] = useState(clip);
    const mutation = useMutation({
      mutationKey: ['postMapClipCell'],
      mutationFn: async (data: MapDifficultyCellSubmitProps) => {
        await postSpreadsheetData(data, eventtype);
      },
      onSuccess: () => {
        table.options.meta.updateData(rowIndex, 'clip', currentClip);
      },
      onError: error => {
        toast({
          title: 'Error',
          description: `An error occurred!${error}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      },
    });

    const onSubmit: SubmitHandler<MapDifficultyCellSubmitProps> = data => {
      mutation.mutate(data);
      onClose();
    };

    return (
      <HStack
        w='100px'
        h='40px'
        onMouseEnter={() => setRenderPopOver(true)}
        onMouseLeave={() => setRenderPopOver(true)}
      >
        {renderPopOver || isOpen ? (
          <>
            <Link
              sx={
                clip === '' || !authentication.isLoggedIn
                  ? { pointerEvents: 'none' }
                  : undefined
              }
              href={clip}
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconButton
                aria-label='popover button'
                disabled={clip === '' || !authentication.isLoggedIn}
                icon={<MdOutlinePlayCircle fontSize='24px' />}
              />
            </Link>

            <Popover
              placement='right'
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
            >
              <PopoverTrigger>
                <IconButton
                  aria-label='popover button edit outline'
                  disabled={!authentication.isLoggedIn}
                  onClick={onOpen}
                  icon={
                    clip === '' ? (
                      <MdAddCircleOutline fontSize='24px' />
                    ) : (
                      <MdOutlineModeEdit fontSize='24px' />
                    )
                  }
                />
              </PopoverTrigger>
              <PopoverContent>
                <HStack>
                  <Input
                    onChange={e => setCurrentClip(e.target.value)}
                    placeholder='Enter Clip Url'
                    defaultValue={clip}
                  />
                  <Button
                    disabled={currentClip === clip}
                    onClick={() =>
                      onSubmit({
                        mapid: mapId,
                        clip: currentClip,
                        token: authentication.token,
                      })
                    }
                  >
                    Save
                  </Button>
                </HStack>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          clip !== '' && <Icon m={2} boxSize='24px' as={MdOutlinePlayCircle} />
        )}
      </HStack>
    );
  }
);

export default MapClipCell;
