import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/api/api';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Divider,
  Flex,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Toast,
  useToast,
} from '@chakra-ui/react';

const validationSchema = z
  .object({
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
    pwd: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' })
      .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
    confirmPwd: z
      .string()
      .min(1, { message: 'Confirm Password is required' })
      .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
    // terms: z.literal(true, {
    //   errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    // }),
  })
  .refine(data => data.pwd === data.confirmPwd, {
    path: ['confirmPwd'],
    message: "Password don't match",
  });

export type RegisterUserFormSchema = z.infer<typeof validationSchema>;

const Register = ({ setMode }: { setMode: (mode: string) => void }) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterUserFormSchema>();

  // Fetch data from API and response with
  const mutation = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: async (data: RegisterUserFormSchema) => {
      await registerUser(data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Account created!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setMode('login');
    },
    onError: () => {
      Toast({
        title: 'Error',
        description: 'Register failed. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterUserFormSchema> = data =>
    mutation.mutateAsync(data);

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
        Register
      </Heading>
      <VStack spacing={6} w='full'>
        <FormControl isInvalid={Boolean(errors.mail)}>
          <FormLabel>E-Mail</FormLabel>
          <Input
            {...register('mail')}
            type='email'
            id='mailadress'
            placeholder='E-Mail'
            autoComplete='email'
          />
          {!errors.mail ? (
            <FormHelperText>Enter your E-Mail here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.mail && errors.mail?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.user)}>
          <FormLabel>Username</FormLabel>
          <Input
            {...register('user')}
            id='username'
            placeholder='Username'
            autoComplete='username'
          />
          {!errors.user ? (
            <FormHelperText>Enter your username here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.user && errors.user?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <Divider />
        <FormControl isInvalid={Boolean(errors.pwd)}>
          <FormLabel>Your Password</FormLabel>
          <Input
            {...register('pwd')}
            id='password'
            type='password'
            placeholder='Password'
            autoComplete='new-password'
          />
          {!errors.pwd ? (
            <FormHelperText>Enter your password here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.pwd && errors.pwd?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.confirmPwd)}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            {...register('confirmPwd')}
            id='passwordConfirm'
            type='password'
            placeholder='Password'
            autoComplete='new-password'
          />
          {!errors.confirmPwd ? (
            <FormHelperText>Confirm your password here</FormHelperText>
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
export default Register;
