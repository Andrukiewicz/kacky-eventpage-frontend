/* eslint-disable react/prop-types */
import { useState, FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  IconButton,
} from '@chakra-ui/react';

import { MdOutlineArrowBack } from 'react-icons/md';

import Login from './Login';
import ResetPassword from './ResetPassword';
import Register from './Register';
import ResetPasswordConfirmToken from './ResetPasswordConfirmToken';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login');

  return (
    <Modal
      size={{ base: 'md' }}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior='inside'
    >
      <ModalOverlay backdropFilter='auto' backdropBlur='10px' />
      <ModalContent>
        <ModalBody
          w='full'
          h={{ base: 'fit-content' }}
          px='48px'
          py={{ base: '2rem' }}
        >
          {mode === 'login' ? (
            <Login onClose={onClose} setMode={setMode} />
          ) : null}
          {mode === 'resetPassword' ? (
            <ResetPassword setMode={setMode} />
          ) : null}
          {mode === 'confirmReset' ? (
            <ResetPasswordConfirmToken setMode={setMode} />
          ) : null}
          {mode === 'register' ? <Register setMode={setMode} /> : null}
          {mode !== 'login' && (
            <IconButton
              onClick={() => setMode('login')}
              borderRadius='full'
              top='8px'
              left='5px'
              position='absolute'
              variant='ghost'
              fontSize='xl'
              icon={<MdOutlineArrowBack />}
              aria-label='Go back to login' // Replace with appropriate description
            />
          )}
          <ModalCloseButton
            onClick={() => setMode('login')}
            boxSize='40px'
            borderRadius='full'
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
