import { Divider, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const LinkComponent = ({ url, title }: { url: string; title: string }) => {
  return (
    <Link
      as={NavLink}
      _activeLink={{
        bg: 'blackAlpha.400',
        isDisabled: 'true',
        rounded: 5,
        px: 4,
        py: 1,
      }}
      to={url}
    >
      <Text as='u'>{title}</Text>
    </Link>
  );
};

export const Widgets = () => {
  return (
    <VStack>
      <VStack>
        <Heading
          size='sm'
          textAlign='center'
          m={1}
          bg='blackAlpha.500'
          py={3}
          px={4}
          rounded='full'
          w='fit-content'
        >
          List of widget ideas
        </Heading>
        <VStack>
          <LinkComponent url={'/widgets'} title='Server widgets' />
        </VStack>
        <Divider my={5} w='full' />
      </VStack>
      <VStack
        w='full'
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: '0.3' }}
        width='full'
      >
        <Outlet />
      </VStack>
    </VStack>
  );
};
