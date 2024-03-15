import { Center, Flex, VStack, Text, Heading } from '@chakra-ui/react';
import PlayerCard from './PlayerCard';

const OffSeason = () => (
  <Center textAlign='center'>
    <VStack spacing={12} mb={10}>
      <Heading
        fontWeight='500'
        textShadow='glow'
        letterSpacing='0.2em'
        size='2xl'
        m={0}
      >
        Kacky Reloaded 4
      </Heading>
      <Flex flexDir={'row'} gap={{ base: 0, md: 10 }}>
        <PlayerCard name='Skandear' rank={2} fins={65} avg={41.1} />
        <PlayerCard name='Tekky' rank={1} fins={69} avg={40.5} />
        <PlayerCard name='Dazzzyy' rank={3} fins={63} avg={60.8} />
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
