import { useContext } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
  Flex,
  FormHelperText,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/react';

import Cookies from 'universal-cookie';

import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/api';

import AuthContext from '@/context/AuthContext';

const validationSchema = z.object({
  user: z
    .string()
    .min(1, { message: 'Username is required' })
    .regex(/^[a-z0-9]+$/, { message: 'Only letters and numbers allowed' }),
  pwd: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' })
    .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
});

export type LoginUserFormSchema = z.infer<typeof validationSchema>;

interface AuthModalProps {
  setMode: (mode: string) => void;
  onClose: () => void;
}

const Login = ({ setMode, onClose }: AuthModalProps) => {
  const toast = useToast();

  const { setAuthentication } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginUserFormSchema>();

  const cookies = new Cookies();
  const { mutate } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async (data: LoginRequest) => {
      const response = await login(data);
      return response; // Return the response data from login function
    },
    onSuccess: response => {
      cookies.set('token', response.access_token, { path: '/' });
      cookies.set('expires', response.expires, { path: '/' });

      setAuthentication({
        isLoggedIn: true,
        token: response.access_token,
        expires: response.expires,
      });

      toast({
        title: 'Login',
        description: 'Login successful!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      onClose();
    },
    onError: (error: any) => {
      // Handle API errors here
      toast({
        title: 'Login Error',
        description: error.message || 'Login failed. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: LoginRequest) => mutate(data);

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
        Login
      </Heading>
      <VStack spacing={{ base: 4, md: 2, xl: 6 }} w='full'>
        <FormControl isInvalid={Boolean(errors.user)}>
          <FormLabel>Username</FormLabel>
          <Input
            {...register('user')}
            id='username'
            placeholder=''
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
        <FormControl isInvalid={Boolean(errors.pwd)}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register('pwd', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum length should be 8' },
              maxLength: {
                value: 80,
                message: 'Really? Sleeping on your Keyboard?',
              },
            })}
            id='password'
            type='password'
            placeholder=''
            autoComplete='current-password'
          />
          {!errors.pwd ? (
            <FormHelperText>Enter your password here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.pwd && errors.pwd?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>

      <VStack spacing={4} w='full'>
        <Button type='submit' w='full'>
          Login
        </Button>
        <Text
          letterSpacing='0.1em'
          textDecoration='underline'
          color='blue.500'
          _dark={{ color: 'blue.100' }}
          fontSize='sm'
          textShadow='glow'
          _hover={{ color: 'blue.200', cursor: 'pointer' }}
          onClick={() => setMode('resetPassword')}
        >
          Forgot your Password?
        </Text>
      </VStack>
      <HStack justify='center' spacing={4} w='full'>
        <Text letterSpacing='0.1em' fontSize='sm' textShadow='glow'>
          No Account?
        </Text>
        <Text
          letterSpacing='0.1em'
          textDecoration='underline'
          color='blue.500'
          _dark={{ color: 'blue.100' }}
          fontSize='sm'
          textShadow='glow'
          _hover={{ color: 'blue.200', cursor: 'pointer' }}
          onClick={() => setMode('register')}
        >
          Register here
        </Text>
        {/* <Text onClick={() => setMode('confirmReset')}>asd</Text> */}
      </HStack>
    </Flex>
  );
};

export default Login;
