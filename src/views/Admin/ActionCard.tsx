import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export interface ActionCardProps {
  icon: React.ComponentType<any>; // Type for the icon component (generic)
  title: string;
  description: string;
  linkTarget: string; // Optional link target prop
}

const ActionCard = ({
  icon: IconComponent,
  title,
  description,
  linkTarget,
}: ActionCardProps) => (
  <Link to={linkTarget}>
    <Box
      bg='gray.700'
      border={1}
      borderRadius={16}
      p={2}
      display='flex'
      alignItems='center'
      w={400}
      _hover={{
        bg: 'gray.800',
        cursor: 'pointer',
      }}
    >
      <Box ml={5}>
        <IconComponent size={40} />
      </Box>
      <Box m={2} mr={0} alignItems='center' width='full'>
        <Text fontSize='lg' fontWeight='bold' letterSpacing='0.1em' mb={2}>
          {title}
        </Text>
        <Text fontSize='s'>{description}</Text>
      </Box>
    </Box>
  </Link>
);

export default ActionCard;
