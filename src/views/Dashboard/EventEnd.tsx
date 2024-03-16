import {
  useColorMode,
  Text,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Icon,
  useTheme,
  Stack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineCheckCircle, MdOutlineLeaderboard } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';

import EventContext from '@/context/EventContext';
import AuthContext from '@/context/AuthContext';
import { getFinishes } from '@/api/api';

const rank = {
  none: { color: 'auto', name: 'no', text: 'Better luck next time!' },
  plastic: { color: '#21C8FF', name: 'plastic', text: 'It´s a start!' },
  bronze: { color: '#CD7F32', name: 'bronze', text: 'Not bad!' },
  silver: { color: '#C0C0C0', name: 'silver', text: 'Wow!' },
  gold: { color: '#FFD700', name: 'gold', text: 'Impressive!' },
  kacky: { color: '#fc2f21', name: 'kacky', text: 'Nice! You won KR4!' },
};

const EventEnd = () => {
  const [finishes, setFinishes] = useState(0);

  const { event } = useContext(EventContext);
  const { authentication } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const getRank = () => {
    if (finishes < 10) return rank.none;
    if (finishes < 25) return rank.plastic;
    if (finishes < 50) return rank.bronze;
    if (finishes < 65) return rank.silver;
    if (finishes === 69) return rank.kacky;
    if (finishes < 75) return rank.gold;
    if (finishes === 75) return rank.kacky;

    return rank.none;
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['profile', authentication.token],
    queryFn: () => getFinishes(authentication.token),
    enabled: authentication.isLoggedIn,
    retry: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isSuccess) {
      setFinishes(data.finishes);
    }
  }, [data, isSuccess]);

  return (
    <Stack spacing={16} px={{ base: 4, md: 8 }} textAlign='center'>
      <Stack>
        <Text
          textShadow='glow'
          letterSpacing='0.2em'
          fontSize={{ base: '2xl', md: '4xl' }}
        >
          {event.type === 'kk' || 'KK' ? 'Kackiest Kacky' : 'Kacky Reloaded'}{' '}
          {event.edition} is over!
        </Text>
        <Text
          fontWeight='500'
          textShadow='glow'
          letterSpacing='0.2em'
          fontSize={{ base: 'lg', md: '2xl' }}
        >
          Thanks for participating in the Event!
        </Text>
      </Stack>
      {authentication.isLoggedIn ? (
        <Flex
          justify='center'
          gap={{ base: '4rem', md: '6rem' }}
          direction={{ base: 'column', md: 'row' }}
          align='center'
          w='full'
        >
          {isSuccess ? (
            <Stack order={{ base: 3, md: 1 }} align='center'>
              <Icon
                filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
                boxSize='32px'
                as={MdOutlineCheckCircle}
              />
              <Text
                textShadow='glow'
                letterSpacing='0.2em'
                fontSize='lg'
                fontWeight='400'
              >
                You finished
              </Text>
              <Text
                letterSpacing='0.2em'
                fontSize='3xl'
                color='green.300'
                filter='drop-shadow(0px 0px 20px #4afc47);'
              >
                {finishes}
              </Text>
              <Text
                textShadow='glow'
                letterSpacing='0.2em'
                fontSize='lg'
                fontWeight='400'
              >
                Maps this Edition!
              </Text>
            </Stack>
          ) : null}

          <Box
            m='-14rem'
            order={2}
            bgGradient='radial(rgba(74, 252, 71, 0.1) 0%, transparent 60%)'
            p={48}
            position='relative'
          >
            <CircularProgress
              trackColor={
                colorMode === 'dark'
                  ? 'rgba(256,256,256, 0.1)'
                  : 'rgba(0,0,0, 0.05)'
              }
              thickness='1px'
              min={0}
              // This is static please grab length of maps for event
              max={75}
              color='green.300'
              value={finishes}
              size='15rem'
              filter='drop-shadow(0px 0px 20px #4afc47);'
            >
              <Text
                position='absolute'
                fontSize='sm'
                color='red'
                letterSpacing={0}
                style={{ textWrap: 'balance' }}
              >
                Max finishes is static please grab length of maps for event
              </Text>
              <CircularProgressLabel
                fontSize='4xl'
                color='green.300'
                letterSpacing='0.2em'
              >
                {/* This is static please grab length of maps for event */}
                {finishes} / 75
              </CircularProgressLabel>
            </CircularProgress>
          </Box>

          {isSuccess ? (
            <Stack order={4} align='center'>
              <Icon
                filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
                boxSize='32px'
                as={MdOutlineLeaderboard}
              />
              <Text
                textShadow='glow'
                letterSpacing='0.2em'
                fontSize='lg'
                fontWeight='400'
              >
                This grants you {finishes > 9 && 'the'}
              </Text>
              <Text
                letterSpacing='0.2em'
                fontSize='3xl'
                color={getRank().color}
                filter={`drop-shadow(0px 0px 10px ${getRank().color});`}
              >
                {getRank().name}
              </Text>
              <Text
                textShadow='glow'
                letterSpacing='0.2em'
                fontSize='lg'
                fontWeight='400'
              >
                Rank!
              </Text>
            </Stack>
          ) : null}
        </Flex>
      ) : null}
      {authentication.isLoggedIn && isSuccess ? (
        <Text
          fontWeight='500'
          textShadow='glow'
          letterSpacing='0.2em'
          fontSize={{ base: 'lg', md: '2xl' }}
        >
          {getRank().text}
        </Text>
      ) : (
        <Text
          fontWeight='500'
          textShadow='glow'
          letterSpacing='0.2em'
          fontSize={{ base: 'lg', md: '2xl' }}
        >
          See you next Edition!
        </Text>
      )}
    </Stack>
  );
};

export default EventEnd;
