import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  useToast,
  Flex,
  Box,
} from '@chakra-ui/react';

import { resetPasswordStep2 } from '@/api/api';

// Define Zod schema for input validation
const validationSchema = z.object({
  token: z
    .string()
    .length(6, { message: 'Token must be 6 characters long' }) // Exact length
    .regex(/^[a-z0-9]+$/, { message: 'Incorrect pattern of token' }), // Regex for alphanumeric
  password: z.string().min(8).max(80),
});

const ResetPasswordConfirmToken = ({
  setMode,
}: {
  setMode: (mode: string) => void;
}) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordResetToken>({ mode: 'onChange' });

  const resetPasswordStep2Mutation = useMutation({
    mutationKey: ['resetPasswordStep2'],
    mutationFn: async (data: PasswordResetToken) => {
      await resetPasswordStep2(data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Reset token has been sent to your email!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
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

  return (
    <Flex
      direction='column'
      w='full'
      h='75%'
      align='center'
      justify='space-around'
    >
      <Text textShadow='glow' letterSpacing='0.1em' fontSize='xl'>
        Reset Password - Confirm Token
      </Text>
      <VStack spacing={6} w='full' as='form' onSubmit={handleSubmit}>
        <FormControl isInvalid={!tokenValid}>
          <FormLabel>Token (Check E-Mails)</FormLabel>
          <Input
            placeholder='6 characters'
            value={token}
            onChange={handleTokenChange}
            onBlur={validateToken}
          />
          <FormErrorMessage>{errorToken}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!passwordValid}>
          <FormLabel>New Password</FormLabel>
          <Input
            type='password'
            placeholder=''
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
          />
          <FormErrorMessage>{errorPassword}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={password !== confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type='password'
            placeholder=''
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {password !== confirmPassword && (
            <FormErrorMessage>Passwords do not match.</FormErrorMessage>
          )}
        </FormControl>
        <Box height={5} />
        <Button type='submit' w='full'>
          Submit
        </Button>
      </VStack>
    </Flex>
  );
};

export default ResetPasswordConfirmToken;
