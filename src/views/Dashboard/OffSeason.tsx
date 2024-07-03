import { Center, Flex, VStack, Text, Heading } from '@chakra-ui/react';
import PlayerCard from './PlayerCard';

const OffSeason = () => (
  <Center textAlign='center'>
    <VStack spacing={12} mb={10}>
      <VStack>
        <Heading
          fontWeight='500'
          textShadow='glow'
          letterSpacing='0.2em'
          size='2xl'
          m={0}
        >
          Kackiest Kacky 9
        </Heading>
        <Text>1.06.2024 - 30.06.2024</Text>
      </VStack>
      <Flex flexDir={'row'} gap={{ base: 0, md: 10 }}>
        <PlayerCard name='redank' rank={2} fins={50} avg={7.22} wrs={5} />
        <PlayerCard name='Social' rank={1} fins={50} avg={5.42} wrs={18} />
        <PlayerCard name='Link' rank={3} fins={50} avg={12.48} wrs={5} />
      </Flex>
      <Text fontSize={{ base: 'md', md: 'xl' }} textTransform='none' px={4}>
        Better get training so your name is here next time!
        <br />
        Join the Kacky Servers in Trackmania Nations Forever or the &quot;Kacky
        Reloaded&quot; Club in Trackmania 2020!
      </Text>
    </VStack>
  </Center>
);

export default OffSeason;
