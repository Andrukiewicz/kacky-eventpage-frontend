import {
  Text,
  Stack,
  HStack,
  Center,
  Link,
  List,
  ListItem,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import EventContext from '@/context/EventContext';

const PreEvent = () => {
  interface TimerState {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }

  const { event } = useContext(EventContext);

  const eventStart: DateTime = DateTime.fromISO(event.start.toISOString(), {
    zone: 'CET',
  });

  // Calculate the end of the month
  const endOfMonth = eventStart
    .endOf('month') // Move to the end of the month
    .setZone(DateTime.local().zoneName) // Set to the user's local timezone
    .set({ hour: 23, minute: 59, second: 59, millisecond: 0 }); // Set time to 23:59:59

  const mappingDeadline: DateTime = eventStart
    .minus({ days: 12 })
    .setZone(DateTime.local().zoneName)
    .set({ hour: 23, minute: 59, second: 59, millisecond: 0 });

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

  return (
    <Stack
      spacing={8}
      mt={8}
      mb={32}
      px={{ base: 4, md: 8 }}
      textAlign='center'
    >
      <Heading
        fontWeight='500'
        textShadow='glow'
        letterSpacing='0.2em'
        fontSize={{ base: '2xl', md: '4xl' }}
        gap={2}
        flexDir={'column'}
        display={'flex'}
        m={0}
      >
        {event.type === 'kr' ? (
          <Text>Kacky Reloaded {event.edition}</Text>
        ) : event.type === 'kk' ? (
          <Text>Kackiest Kacky {event.edition}</Text>
        ) : (
          <Text>Kacky Remixed {event.edition}</Text>
        )}
        {/* Format the Date using Luxon */}
        <Text>{DateTime.fromJSDate(event.start).toFormat('dd.MM.yy')}</Text>
      </Heading>
      <Center>
        <VStack
          fontWeight='500'
          textShadow='glow'
          letterSpacing='0.2em'
          fontSize={{ base: '2xl', md: '4xl' }}
        >
          <Text>
            Event starts in{' '}
            {parseInt(remainingTime.days) > 0 && `${remainingTime.days} days`}
          </Text>
          {parseInt(remainingTime.days) < 1 && (
            <HStack>
              <Text>{`${remainingTime.hours}`}</Text>
              <Text>:</Text>
              <Text>{`${remainingTime.minutes}`}</Text>
              <Text>:</Text>
              <Text>{`${remainingTime.seconds}`}</Text>
            </HStack>
          )}
          <HStack>
            {isMappingEnded() ? (
              <VStack>
                <Text>Mapping closes in</Text>
                {parseInt(mappingEnd.days) > 0 ? (
                  <Text>{mappingEnd.days} days</Text>
                ) : (
                  ''
                )}
                <Text display='flex' align={'center'}>
                  {mappingEnd.hours}:{mappingEnd.minutes}:{mappingEnd.seconds}
                </Text>
              </VStack>
            ) : (
              <Text>Mapping time is over!</Text>
            )}
          </HStack>
        </VStack>
      </Center>
      <Center pt={2}>
        <div
          style={{
            textAlign: 'left',
            width: '100%',
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
          <List display={'flex'} flexDirection={'column'} spacing={4}>
            <ListItem>
              <Text>📅 Duration:</Text>
              <Text>
                {eventStart.setZone(DateTime.local().zoneName).toLocaleString({
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}{' '}
                -{' '}
                {endOfMonth.toLocaleString({
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </Text>
            </ListItem>
            <ListItem>
              <Text>📬 Mapping Deadline:</Text>
              <Text>
                {mappingDeadline.toLocaleString({
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </Text>
              <Text>
                {isMappingEnded()
                  ? ` (Mapping closes in ${parseInt(mappingEnd.days) > 0 ? `${mappingEnd.days} days` : ''} ${mappingEnd.hours}:${mappingEnd.minutes}:${mappingEnd.seconds})`
                  : 'Mapping time is over!'}
              </Text>
            </ListItem>
            <ListItem>
              🎮 Servers:
              {event.type === 'kr' ? (
                <>
                  <Text>Join the official Kacky Reloaded club</Text>
                  <Text>
                    (playing KR requires TM2020 Standard Access on PC)
                  </Text>
                </>
              ) : event.type === 'kk' ? (
                <>
                  <Text>Join the Kackiest Kacky servers here</Text>
                  <Text>
                    🎮 Server1:{' '}
                    <Link
                      isExternal
                      textDecoration='underline'
                      textColor={'blue.400'}
                    >
                      tmtp://#addfavourite=sky_event
                    </Link>
                  </Text>
                  <Text>
                    🎮 Server2:{' '}
                    <Link
                      isExternal
                      textDecoration='underline'
                      textColor={'blue.400'}
                    >
                      tmtp://#addfavourite=sky_event2
                    </Link>
                  </Text>
                  <Text>
                    🎮 Server3:{' '}
                    <Link
                      isExternal
                      textDecoration='underline'
                      textColor={'blue.400'}
                    >
                      tmtp://#addfavourite=sky_event3
                    </Link>
                  </Text>
                </>
              ) : (
                <>Kacky Remixed</>
              )}
            </ListItem>
            <ListItem display={'flex'} gap={2}>
              🗺️ Maps:{' '}
              {event.type === 'kr' ? (
                <Text>Kacky Reloaded {event.edition}</Text>
              ) : event.type === 'kk' ? (
                <Text>Kackiest Kacky {event.edition}</Text>
              ) : (
                <Text>Kacky Remixed {event.edition}</Text>
              )}{' '}
              {/* CHANGE THIS TO DYNAMIC FROM BACKEND!!! */}
              #301 - #375
            </ListItem>
            <ListItem>
              🌐 Official Kacky Event-Website:{' '}
              <Link
                isExternal
                textDecoration='underline'
                textColor={'blue.400'}
                href='https://kacky.gg'
              >
                https://kacky.gg/
              </Link>
            </ListItem>
            <ListItem>
              📊 Alternative Kacky Statistics & History:{' '}
              {event.type === 'kr' ? (
                <Link
                  isExternal
                  textDecoration='underline'
                  textColor={'blue.400'}
                  href='https://kackyreloaded.com/'
                >
                  https://kackyreloaded.com/
                </Link>
              ) : event.type === 'kk' ? (
                <Link
                  isExternal
                  textDecoration='underline'
                  textColor={'blue.400'}
                  href='https://kackiestkacky.com/'
                >
                  https://kackiestkacky.com/
                </Link>
              ) : (
                <Link
                  isExternal
                  textDecoration='underline'
                  textColor={'blue.400'}
                  href='https://kackyreloaded.com/'
                >
                  https://kackyreloaded.com/
                </Link>
              )}
            </ListItem>
            <ListItem>
              🔗 Discord Invite:{' '}
              <Link
                isExternal
                textDecoration='underline'
                textColor={'blue.400'}
                href='http://kacky.gg/discord'
              >
                http://kacky.gg/discord
              </Link>
            </ListItem>
          </List>
        </div>
      </Center>

      {isMappingEnded() && (
        <Center>
          <div
            style={{
              textAlign: 'left',
              width: '100%',
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
            <Text>
              Do you want to build a map for{' '}
              {event.type === 'kr' ? (
                <>Kacky Reloaded {event.edition}</>
              ) : event.type === 'kk' ? (
                <>Kackiest Kacky {event.edition}</>
              ) : (
                <>Kacky Remixed {event.edition}</>
              )}{' '}
              Join the Kacky Discord Server (
              <Link
                isExternal
                textDecoration='underline'
                textColor={'blue.400'}
                href='http://kacky.gg/discord'
              >
                http://kacky.gg/discord
              </Link>
              ) and check channel
            </Text>
            {event.type === 'kr' ? (
              <Text textColor={'blue.400'}># kr{event.edition}-mapping</Text>
            ) : event.type === 'kk' ? (
              <Text textColor={'blue.400'}># kk{event.edition}-mapping</Text>
            ) : (
              <Text textColor={'blue.400'}># kx{event.edition}-mapping</Text>
            )}
            <Text>
              It get&apos;s updated with the latest info and rules. Have
              questions about building a map for Kacky?
            </Text>
            <Text>Ask them in</Text>
            {event.type === 'kr' ? (
              <Text textColor={'blue.400'}># kr-chat</Text>
            ) : event.type === 'kk' ? (
              <Text textColor={'blue.400'}># kk-chat</Text>
            ) : (
              <Text textColor={'blue.400'}># kx-chat</Text>
            )}
          </div>
        </Center>
      )}
    </Stack>
  );
};

export default PreEvent;
