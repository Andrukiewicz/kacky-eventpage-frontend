import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Text,
  useToast,
  FormHelperText,
  Heading,
} from '@chakra-ui/react';

import { resetPasswordStep1 } from '@/api/api';

// Define Zod schema for input validation
const validationSchema = z.object({
  user: z
    .string()
    .min(1, { message: 'Username is required' })
    .regex(/^[a-z0-9]+$/, { message: 'Only letters and numbers allowed' }),
  mail: z
    .string()
    .min(4, { message: 'Email must be min 4 chars long' })
    .max(80, { message: 'Really? Sleeping on your Keyboard?' })
    .email({
      message: 'Must be a valid email',
    }),
});

export type PasswordResetFormSchema = z.infer<typeof validationSchema>;

const ResetPassword = ({ setMode }: { setMode: (mode: string) => void }) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordResetFormSchema>();

  // React Query mutation
  const resetPasswordStep1Mutation = useMutation({
    mutationKey: ['resetPasswordStep1'],
    mutationFn: async (data: PasswordResetFormSchema) => {
      await resetPasswordStep1(data);
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

  const onSubmit: SubmitHandler<PasswordResetFormSchema> = data => {
    try {
      resetPasswordStep1Mutation.mutateAsync(data); // Call the mutation to reset password
      setMode('confirmReset');
    } catch (error) {
      // Handle validation or mutation errors
      toast({
        title: 'Error',
        description: 'An error occurred!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction='column'
      w='full'
      h='full'
      align='center'
      justify='center'
      as='form'
      onSubmit={handleSubmit(onSubmit)}
      gap={4}
    >
      <Heading m={0} textShadow='glow' letterSpacing='0.1em' fontSize='xl'>
        Reset Password
      </Heading>
      <VStack spacing={6} w='full' as='form' onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.user)}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder=''
            {...register('user')} // assign value to the react hook form
          />
          {!errors.user ? (
            <FormHelperText>Enter your username here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.user && errors.user?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.mail)}>
          <FormLabel>E-Mail</FormLabel>
          <Input
            placeholder=''
            {...register('mail')} // assign value to the react hook form
          />
          {!errors.mail ? (
            <FormHelperText>Enter your email here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.mail && errors.mail?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button type='submit' w='full'>
          Reset my Password
        </Button>
      </VStack>
    </Flex>
  );
};

export default ResetPassword;
