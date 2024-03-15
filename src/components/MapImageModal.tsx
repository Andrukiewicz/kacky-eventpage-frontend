import {
  Modal,
  ModalOverlay,
  Image,
  ModalContent,
  ModalCloseButton,
  Flex,
  HStack,
  Text,
  useColorMode,
  useTheme,
  Icon,
} from '@chakra-ui/react';

import { MdOutlineCheckCircle } from 'react-icons/md';

import { getMapImageUrl } from '../api/api';
import { IMAGES } from '@/utils/Images';
import { AnimatePresence, motion } from 'framer-motion';

type MapImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  author: string;
  mapNumber: number;
  isFinished: boolean;
  eventtype: string;
};

const fadeIn = {
  opacity: 0,
  transition: { duration: 0.5 },
};

const fadeOut = {
  opacity: 1,
  transition: { duration: 0.5 },
};

const MapImageModal = ({
  isOpen,
  onClose,
  author,
  mapNumber,
  isFinished,
  eventtype,
}: MapImageModalProps) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  return (
    <Modal
      blockScrollOnMount={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent maxW='1024px'>
        <AnimatePresence>
          <motion.div initial={fadeIn} animate={fadeOut}>
            <Image
              alt='Map'
              src={getMapImageUrl(eventtype, mapNumber)}
              fallbackSrc={IMAGES.mapImageFallback}
              fallbackStrategy='onError'
            />
          </motion.div>
        </AnimatePresence>

        <Flex
          direction='column'
          role='group'
          w='full'
          h='full'
          p={4}
          align='flex-end'
          justify='flex-end'
          position='absolute'
          left='50%'
          top='50%'
          transform='translate(-50%, -50%);'
          bgGradient={
            colorMode === 'dark'
              ? 'linear(to-br, transparent 0%, transparent 50%, black 100%)'
              : 'linear(to-br, transparent 0%, transparent 50%, white 90%, white 100%)'
          }
        >
          <HStack>
            <Text
              fontSize='2xl'
              lineHeight='24px'
              letterSpacing='0.4em'
              fontWeight='light'
              align='right'
              textShadow='glow'
            >
              {eventtype === 'kk' ? 'Kackiest' : 'Kacky'}
              <br />
              {eventtype === 'kk' ? 'Kacky' : 'Reloaded'}
            </Text>
            <HStack spacing='0'>
              <Text
                lineHeight='60px'
                textShadow='glow'
                fontSize='6xl'
                letterSpacing='0.1em'
                fontWeight='bold'
              >
                {mapNumber.toString().includes(' ')
                  ? mapNumber.toString().split(' ')[0]
                  : mapNumber}
              </Text>
              {mapNumber.toString().includes(' ') ? (
                <Text fontSize='xl'>{mapNumber.toString().split(' ')[1]}</Text>
              ) : null}
              {isFinished ? (
                <Icon
                  color='green.300'
                  boxSize='20px'
                  alignSelf='flex-start'
                  filter={theme.shadows.finGlow}
                  as={MdOutlineCheckCircle}
                />
              ) : null}
            </HStack>
          </HStack>
          <HStack mr={2} py={2}>
            <Text fontWeight='hairline' textShadow='glow' letterSpacing='0.1em'>
              by
            </Text>
            <Text
              fontWeight='normal'
              textShadow='glow'
              letterSpacing='0.1em'
              alignSelf='flex-end'
            >
              {author}
            </Text>
          </HStack>
          <ModalCloseButton
            boxSize='40px'
            borderRadius='full'
            bg='blackAlpha.800'
            _hover={{ bg: 'blackAlpha.600' }}
            color='white'
            m={2}
          />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default MapImageModal;
