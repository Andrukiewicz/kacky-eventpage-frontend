import { memo, useContext, useState } from 'react';

import { Text, IconButton, HStack, useDisclosure } from '@chakra-ui/react';

import { MdOutlineImage } from 'react-icons/md';

import MapImageModal from '@/components/MapImageModal';
import EventContext from '@/context/EventContext';

type MapNumberCellProps = {
  number: number;
  version: string;
  finished: boolean;
  author: string;
  eventtype: string;
};

const MapNumberCell = memo<MapNumberCellProps>(
  ({ number, version, finished, author, eventtype }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [renderImage, setRenderImage] = useState(false);

    const { event } = useContext(EventContext);

    return (
      <HStack
        w='100px'
        onMouseEnter={() => setRenderImage(true)}
        onMouseLeave={() => setRenderImage(false)}
        role='group'
        spacing={4}
      >
        <Text
          letterSpacing='0.1em'
          textShadow='glow'
          fontSize='xl'
          fontWeight='700'
        >
          {number} {version}
        </Text>
        {eventtype !== 'hunting' && renderImage ? (
          <>
            <IconButton
              aria-label='map number cell image'
              onClick={onOpen}
              visibility={{ base: 'visible', lg: 'hidden' }}
              _groupHover={{
                visibility: 'visible',
              }}
              icon={<MdOutlineImage fontSize='24px' />}
            />
            <MapImageModal
              mapNumber={number}
              author={author}
              isFinished={finished}
              isOpen={isOpen}
              onClose={onClose}
              eventtype={event.type}
            />
          </>
        ) : null}
      </HStack>
    );
  }
);

// MapNumberCell.defaultProps = {
//   version: '',
//   finished: false,
//   eventtype: 'hunting',
// };

export default MapNumberCell;
