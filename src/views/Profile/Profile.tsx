import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import {
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Stack,
  FormErrorMessage,
  Link,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  useDisclosure,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';

// import { MdInfoOutline } from 'react-icons/md';
import {
  postProfileData,
  getProfileData,
  deleteAccount,
  logoutServer,
} from '@/api/api';

import AuthContext from '@/context/AuthContext';

import { motion } from 'framer-motion';

const validationSchema = z.object({
  tmnf: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(80, { message: 'Really? Sleeping on your Keyboard?' })
    .regex(/^[a-z0-9]+$/, { message: 'Only letters and numbers allowed' }),
  tm20: z
    .string()
    .min(4, { message: 'Email must be min 4 chars long' })
    .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
  discord: z
    .string()
    .min(4, { message: 'Email must be min 4 chars long' })
    .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
  // pwd: z
  //   .string()
  //   .min(6, { message: 'Password must be atleast 6 characters' })
  //   .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
  // confirmPwd: z
  //   .string()
  //   .min(1, { message: 'Confirm Password is required' })
  //   .max(80, { message: 'Really? Sleeping on your Keyboard?' }),
  token: z.string(),
  // terms: z.literal(true, {
  //   errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
  // }),
});
// .refine(data => data.pwd === data.confirmPwd, {
//   path: ['confirmPwd'],
//   message: "Password don't match",
// });

export type ProfileDataFormSchema = z.infer<typeof validationSchema>;

const Profile = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { authentication } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const toast = useToast();

  const { data: profileData } = useQuery({
    queryKey: ['profile', authentication.token],
    queryFn: () => getProfileData(authentication.token),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileDataFormSchema>();

  useEffect(() => {
    if (profileData) {
      setValue('tmnf', profileData.tmnf);
      setValue('tm20', profileData.tm20);
      setValue('discord', profileData.discord);
    }
  }, [profileData, setValue]); // Dependency array for clarity

  const updateProfileMutation = useMutation({
    mutationKey: ['updateProfile', authentication.token],
    mutationFn: async (data: ProfileDataFormSchema) => {
      await postProfileData(data); // Await the postProfileData function
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Profile updated!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['updateProfile'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: "Couldn't update profile! Please try again later",
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: () => deleteAccount(authentication.token),
    onSuccess: () => {
      logoutServer(authentication.token).catch(() => {});
      const cookies = new Cookies();
      cookies.remove('token', { path: '/' });
      cookies.remove('expires', { path: '/' });

      toast({
        title: 'Success',
        description: 'Account deleted!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: "Couldn't delete account! Please try again later",
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<ProfileDataFormSchema> = data => {
    try {
      // Append the token to mutation data

      const newData = { ...data, token: authentication.token };
      // Call the mutation to update the profile data
      updateProfileMutation.mutateAsync(newData);
    } catch (error) {
      // If api returns error, display an toast with error message
      toast({
        title: 'Error',
        description: 'Something went wrong! Please try again later',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleDelete = () => {
    deleteAccountMutation.mutate();
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  if (!authentication.isLoggedIn)
    return <Text>Login to see your Profile!</Text>;

  // Ugly but I dont know better
  let admin = false;
  try {
    if (JSON.parse(atob(authentication.token.split('.')[1])).isAdmin) {
      admin = true;
    }
  } catch {
    admin = false;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Center px={8} w='100%'>
        <VStack gap={6} direction='column' align='center' w='full'>
          {admin ? (
            <Button as={Link} href='/kackend'>
              Admin Backend
            </Button>
          ) : null}
          <Text textShadow='glow' letterSpacing='0.1em' fontSize='xl'>
            Your Profile
          </Text>
          <VStack gap={4} as='form' onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.tmnf)} w='xs'>
              <VStack spacing={2} mb={2} w='full'>
                <FormLabel m='0'>TMNF Login</FormLabel>
                <Input
                  id='tmnf'
                  placeholder='Enter TMNF Login'
                  autoComplete='off' // or "tmnf"
                  {...register('tmnf')}
                />
                {!errors.tmnf ? (
                  <FormHelperText>Enter your TMNF login here</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.tmnf && errors.tmnf?.message?.toString()}
                  </FormErrorMessage>
                )}
              </VStack>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.tm20)} w='xs'>
              <VStack spacing={2} mb={2} w='full'>
                <FormLabel m='0'>Trackmania 2020 Login</FormLabel>
                <Input
                  id='tm20'
                  placeholder='Enter TM2020 Login'
                  autoComplete='off' // or "tm20"
                  {...register('tm20')}
                />
                {!errors.tm20 ? (
                  <FormHelperText>Enter your TM20 login here</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.tm20 && errors.tm20?.message?.toString()}
                  </FormErrorMessage>
                )}
              </VStack>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.discord)} w='xs'>
              <VStack spacing={2} mb={2} w='full'>
                <FormLabel m='0'>Discord ID</FormLabel>
                <Input
                  id='discord'
                  placeholder='Enter Discord Login'
                  autoComplete='off' // or "discord"
                  {...register('discord')}
                />
                {!errors.discord ? (
                  <FormHelperText>Enter your Discord ID here</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.discord && errors.discord?.message?.toString()}
                  </FormErrorMessage>
                )}
              </VStack>
            </FormControl>
            {/* Fix API /usermgmnt for that to work */}
            {/* <FormControl isInvalid={Boolean(errors.mail)} w='xs'>
              <VStack spacing={2} mb={2} w='full'>
                <FormLabel m='0'>Enter new E-mail</FormLabel>
                <Input
                  id='mail'
                  placeholder='New E-mail'
                  autoComplete='off' // or "mail"
                  defaultValue={profileData.mail}
                  {...register('mail', {
                    required: false,
                  })}
                />
                {!errors.mail ? (
                  <FormHelperText>Enter your new E-mail here</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.mail && errors.mail?.message?.toString()}
                  </FormErrorMessage>
                )}
              </VStack>
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
            </FormControl> */}
            <Button mt={4} disabled={isSubmitting} type='submit'>
              Submit
            </Button>
          </VStack>
          <Stack>
            <Button variant='danger' onClick={onOpen}>
              Delete Account
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Account?
                  </AlertDialogHeader>

                  <AlertDialogBody textTransform='none'>
                    You are about to delete your Account! Are you sure?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant='danger' onClick={handleDelete} ml={3}>
                      Yeet it!
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        </VStack>
      </Center>
    </motion.div>
  );
};

export default Profile;
