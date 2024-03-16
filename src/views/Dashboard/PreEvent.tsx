import {
  Text,
  Stack,
  HStack,
  Center,
  Link,
  List,
  ListItem,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const PreEvent = () => {
  interface TimerState {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }

  const eventStart: DateTime = DateTime.fromISO('2023-08-18T20:00:00.000', {
    zone: 'CET',
  });
  const mappingDeadline: DateTime = DateTime.fromISO(
    '2023-07-31T22:00:00.000',
    {
      zone: 'CET',
    }
  );

  function updateTimer(diffDate: DateTime): TimerState {
    const now = DateTime.now();
    const remainDays = Math.floor(
      diffDate.diff(now, 'milliseconds').milliseconds / (1000 * 60 * 60 * 24)
    );
    const remainHours = Math.floor(
      (diffDate.diff(now, 'milliseconds').milliseconds / (1000 * 60 * 60)) % 24
    );
    const remainMinutes = Math.floor(
      (diffDate.diff(now, 'milliseconds').milliseconds / (1000 * 60)) % 60
    );
    const remainSeconds = Math.floor(
      (diffDate.diff(now, 'milliseconds').milliseconds / 1000) % 60
    );
    return {
      days: String(remainDays).padStart(2, '0'),
      hours: String(remainHours).padStart(2, '0'),
      minutes: String(remainMinutes).padStart(2, '0'),
      seconds: String(remainSeconds).padStart(2, '0'),
    };
  }

  const [remainingTime, setRemainingTime] = useState<TimerState>(
    updateTimer(eventStart)
  );
  const [mappingEnd, setMappingEnd] = useState<TimerState>(
    updateTimer(mappingDeadline)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(updateTimer(eventStart));
      setMappingEnd(updateTimer(mappingDeadline));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array for continuous updates

  function isMappingEnded(): boolean {
    return (
      Number(mappingEnd.days) +
        Number(mappingEnd.hours) +
        Number(mappingEnd.minutes) +
        Number(mappingEnd.seconds) >
      0
    );
  }

  function toCETtoUserTime(datetimeString: string): string {
    const inputDateTime: DateTime = DateTime.fromISO(datetimeString, {
      zone: 'Europe/Berlin',
    });
    const userTimezone = DateTime.local().zoneName;
    const userDateTime = inputDateTime.setZone(userTimezone);

    const intlDate = userDateTime.toLocaleString({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const intlTime = userDateTime.toLocaleString({
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    return `${intlDate.toString()}, ${intlTime.toString()} (${userDateTime.toFormat('ZZZZ')})`;
  }

  return (
    <Stack
      spacing={8}
      mt={8}
      mb={32}
      px={{ base: 4, md: 8 }}
      textAlign='center'
      justify='center'
      align='center'
    >
      <Heading
        fontWeight='500'
        textShadow='glow'
        letterSpacing='0.2em'
        fontSize={{ base: '2xl', md: '4xl' }}
        m={0}
      >
        <Text>Kacky Reloaded 4</Text>
        <Text>August 2023</Text>
      </Heading>
      <Center>
        <HStack
          fontWeight='500'
          textShadow='glow'
          letterSpacing='0.2em'
          fontSize={{ base: '2xl', md: '4xl' }}
        >
          <Text>{`${remainingTime.days}`}</Text>
          <Text>:</Text>
          <Text>{`${remainingTime.hours}`}</Text>
          <Text>:</Text>
          <Text>{`${remainingTime.minutes}`}</Text>
          <Text>:</Text>
          <Text>{`${remainingTime.seconds}`}</Text>
        </HStack>
      </Center>
      <Center pt={2}>
        <div
          style={{
            textAlign: 'left',
            width: '66%',
            lineHeight: '2',
            fontSize: 'larger',
            textTransform: 'none',
          }}
        >
          <Text
            fontSize='2xl'
            fontWeight='400'
            textTransform='uppercase'
            textDecoration='underline'
            textUnderlineOffset='0.2em'
          >
            General Info:
          </Text>
          <List>
            <ListItem>
              📅 Duration: {toCETtoUserTime('2023-08-18T20:00:00.000')} -{' '}
              {toCETtoUserTime('2023-09-17T22:00:00.000')}
            </ListItem>
            <ListItem>
              🎮 Servers: Join the servers in the &quot;Kacky Reloaded&quot;
              club (playing KR4 requires TM2020 Standard Access on PC)
            </ListItem>
            <ListItem>🗺️ Maps: Kacky Reloaded #226 - #300</ListItem>
            <ListItem>
              🌐 Kacky Event-Website:{' '}
              <Link href='https://kacky.gg'>https://kacky.gg/</Link>
            </ListItem>
            <ListItem>
              📊 Kacky Statistics & History:{' '}
              <Link href='https://kackyreloaded.com/'>
                https://kackyreloaded.com/
              </Link>
            </ListItem>
            <ListItem>
              🔗 Discord Invite:{' '}
              <Link href='http://kacky.gg/discord'>
                http://kacky.gg/discord
              </Link>
            </ListItem>
            <ListItem>
              📬 Mapping Deadline: {toCETtoUserTime('2023-07-31T22:00:00.000')}
              {isMappingEnded()
                ? ` (Closes in ${mappingEnd.days}:${mappingEnd.hours}:${mappingEnd.minutes}:${mappingEnd.seconds})`
                : ' - I hope you submitted already'}
            </ListItem>
          </List>
        </div>
      </Center>

      {isMappingEnded() && (
        <Center>
          <div
            style={{
              textAlign: 'left',
              width: '66%',
              lineHeight: '2',
              fontSize: 'larger',
              textTransform: 'none',
            }}
          >
            <Text
              fontSize='2xl'
              fontWeight='400'
              textTransform='uppercase'
              textDecoration='underline'
              textUnderlineOffset='0.2em'
            >
              Mapping Information:
            </Text>
            Do you want to build a map for KR4? Join the Kacky Discord Server (
            <Link href='http://kacky.gg/discord'>http://kacky.gg/discord</Link>)
            and check channel #📢kacky-reloaded-4
            <br />
            It get&apos;s updated with the latest info and rules.
            <br />
            Have questions about building a map for Kacky? Ask them in
            #kacky-reloaded!
          </div>
        </Center>
      )}
    </Stack>
  );
};

export default PreEvent;
