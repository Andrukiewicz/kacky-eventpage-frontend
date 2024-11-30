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
          Kacky Reloaded 5
        </Heading>
        <Text>1.11.2024 - 30.11.2024</Text>
      </VStack>
      <Flex flexDir={'row'} gap={{ base: 0, md: 10 }}>
        <PlayerCard name='Mikmos' rank={2} fins={75} avg={10.280} wrs={2} />
        <PlayerCard name='Simo' rank={1} fins={75} avg={7.627} wrs={7} />
        <PlayerCard name='Silenz' rank={3} fins={75} avg={11.960} wrs={3} />
      </Flex>
      <Text fontSize={{ base: 'md', md: 'xl' }} textTransform='none' px={4}>
        Try harder next time so your name gets here!
        <br />
        Join the Kacky Servers in Trackmania Nations Forever or the &quot;Kacky
        Reloaded&quot; Club in Trackmania 2020!
      </Text>
    </VStack>
  </Center>
);

export default OffSeason;
