import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordStep2 } from '@/api/api';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  useToast,
  Flex,
  Heading,
  FormHelperText,
} from '@chakra-ui/react';

// Define Zod schema for input validation
const validationSchema = z
  .object({
    token: z
      .string()
      .length(6, { message: 'Token must be 6 characters long' }) // Exact length
      .regex(/^[a-z0-9]+$/, { message: 'Incorrect pattern of token' }), // Regex for alphanumeric
    pwd: z
      .string()
      .min(8, { message: 'Password must be atleast 8 characters' })
      .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
    confirmPwd: z
      .string()
      .min(8, { message: 'Confirm Password is required' })
      .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    // }),
  })
  .refine(data => data.pwd === data.confirmPwd, {
    path: ['confirmPwd'],
    message: "Password don't match",
  });

export type PasswordResetConfirmFormSchema = z.infer<typeof validationSchema>;

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
  } = useForm<PasswordResetConfirmFormSchema>();

  const resetPasswordStep2Mutation = useMutation({
    mutationKey: ['resetPasswordStep2'],
    mutationFn: async (data: PasswordResetConfirmFormSchema) => {
      await resetPasswordStep2(data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Your password has been reset!',
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

  const onSubmit: SubmitHandler<PasswordResetConfirmFormSchema> = data => {
    try {
      resetPasswordStep2Mutation.mutateAsync(data); // Call the mutation to reset password
      setMode('login');
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
      <Heading
        m={0}
        textShadow='glow'
        letterSpacing='0.1em'
        fontSize='xl'
        textAlign={'center'}
      >
        Confirm Token
      </Heading>
      <VStack spacing={6} w='full'>
        <FormControl isInvalid={Boolean(errors.token)}>
          <FormLabel>Token (Check E-Mails)</FormLabel>
          <Input
            {...register('token')}
            id='token'
            placeholder=''
            autoComplete='token'
          />
          {!errors.token ? (
            <FormHelperText>Enter your token</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.token && errors.token?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.pwd)}>
          <FormLabel>New Password</FormLabel>
          <Input
            {...register('pwd')}
            id='password'
            type='password'
            placeholder='Password'
            autoComplete='new-password'
          />
          {!errors.pwd ? (
            <FormHelperText>Enter new password here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.pwd && errors.pwd?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.confirmPwd)}>
          <FormLabel>Confirm new password</FormLabel>
          <Input
            {...register('confirmPwd')}
            id='passwordConfirm'
            type='password'
            placeholder='Password'
            autoComplete='new-password'
          />
          {!errors.confirmPwd ? (
            <FormHelperText>Confirm new password here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.confirmPwd && errors.confirmPwd?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>
      <VStack spacing={4} w='full'>
        <Button w='full' type='submit'>
          Register
        </Button>
      </VStack>
    </Flex>
  );
};

export default ResetPasswordConfirmToken;
