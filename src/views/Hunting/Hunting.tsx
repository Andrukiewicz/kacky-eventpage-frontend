import { useRef, useState, useEffect, useContext, Fragment } from 'react';

import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Box,
  Text,
  Center,
  Select,
  VStack,
  useTheme,
  useColorMode,
  Flex,
  Button,
  useBreakpointValue,
  Link,
  useDisclosure,
} from '@chakra-ui/react';

import {
  MdArrowDownward,
  MdArrowUpward,
  MdArrowOutward,
  MdOutlineLogin,
} from 'react-icons/md';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table';

import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import Chart from 'react-apexcharts';
import AuthContext from '@/context/AuthContext';
import defaultColumns from './Hunting.service';

import {
  getSpreadsheetData,
  getAllEvents,
  getPersonalBests,
  getPerformance,
} from '@/api/api';

import MapDetailCell from '@/components/HuntingScheduleTableCells/MapDetailCell';
import { donutChartOptionsCharts1 } from '../Dashboard/EventsProgress';
import { FormattedMap, mergeSheetsAndPBs } from '@/components/SheetOperations';
import AuthModal from '@/components/Header/AuthModal/AuthModal';

const Hunting = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { authentication } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!authentication.isLoggedIn)
    return (
      <Center w='full'>
        <VStack>
          <Text>Login and fill your profile to see this data.</Text>
          <Button
            aria-label='Log in'
            variant='ghost'
            p={{ base: 3, md: 4 }}
            rounded='10'
            onClick={onOpen}
            h='full'
            display='flex'
            flexDirection='column'
            backgroundColor={'transparent'}
            filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          >
            <Text fontSize={'md'}>Log in</Text>
          </Button>
        </VStack>
        <AuthModal isOpen={isOpen} onClose={onClose} />
      </Center>
    );

  const defaultType = 'kk';
  const defaultEdition = 1;

  const [tableData, setTableData] = useState<FormattedMap[]>(() => []);
  const [columns] = useState(() => [...defaultColumns]);
  const [curEventType, setCurEventType] = useState<string>(defaultType);
  const [curEventEdition, setCurEventEdition] =
    useState<number>(defaultEdition);
  const [curEventSelector, setCurEventSelector] = useState<string>(
    curEventType + curEventEdition
  );

  const [kkArray, setKkArray] = useState<AvailableEvents[]>([]);
  const [krArray, setKrArray] = useState<AvailableEvents[]>([]);

  const [sorting, setSorting] = useState<any>([]);

  const [kkPerfSeries, setKkPerfSeries] = useState<number[]>([]);
  const [kkPerfOptions, setKkPerfOptions] = useState({});
  const [krPerfSeries, setKrPerfSeries] = useState<number[]>([]);
  const [krPerfOptions, setKrPerfOptions] = useState({});

  const [expanded, setExpanded] = useState({});

  // function selectorArrayParse<T extends AvailableEvents>(
  //   array: T[]
  // ): React.ReactElement[] {
  //   return array.map(data => (
  //     <option
  //       key={data.type + data.edition} // Use a unique key based on data properties
  //       value={data.type + data.edition}
  //       data-type={data.type}
  //       data-edition={data.edition}
  //     >
  //       {data.name}
  //     </option>
  //   ));
  // }

  const { data: eventsData, isSuccess: eventsIsSuccess } = useQuery({
    queryKey: ['availableevents', authentication.token],
    queryFn: async () => {
      const response = await getAllEvents(authentication.token);
      return response;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data: sheetData, isSuccess: sheetIsSuccess } = useQuery({
    queryKey: [
      'huntingmaps',
      authentication.token,
      curEventType,
      curEventEdition,
    ],
    queryFn: async () => {
      const response = await getSpreadsheetData(
        curEventType,
        curEventEdition,
        authentication.token
      );
      return response;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data: pbs, isSuccess: pbsIsSuccess } = useQuery({
    queryKey: ['pbs', authentication.token, curEventType],
    queryFn: async () => {
      const response = await getPersonalBests(
        authentication.token,
        curEventType
      );
      return response;
    },
    enabled: authentication.isLoggedIn, // Use enabled option for conditional fetching
    refetchOnWindowFocus: false,
    retry: false,
  });

  // invalidate this on ColorMode - idk why is it here
  // also not working on devapi version
  const {
    data: performanceKK,
    isSuccess: isSuccessKK,
    isError: isErrorKK,
  } = useQuery({
    queryKey: ['performanceKK', authentication.token],
    queryFn: async () => {
      const response = await getPerformance(authentication.token, 'KK');
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: authentication.isLoggedIn, // Only fetch if user is logged in
  });

  const {
    data: performanceKR,
    isSuccess: isSuccessKR,
    isError: isErrorKR,
  } = useQuery({
    queryKey: ['performanceKR', authentication.token],
    queryFn: async () => {
      const response = await getPerformance(authentication.token, 'KR');
      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: authentication.isLoggedIn, // Only fetch if user is logged in
  });

  const table = useReactTable({
    data: tableData,
    columns: columns, // taking this from usestate columns ...defaultColumns
    state: {
      sorting,
      expanded,
      columnVisibility: {
        finished: authentication.isLoggedIn,
        personalBest: authentication.isLoggedIn,
        kackyRank: authentication.isLoggedIn,
        wrScore: !authentication.isLoggedIn,
        wrHolder: !authentication.isLoggedIn,
        clip: false,
        discordPing: false,
      },
    },
    initialState: {
      sorting: [
        {
          id: 'number',
          desc: false,
        },
      ],
    },

    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: number, value: string) => {
        setTableData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
  });

  // const [tableState, setTableState] = useState({
  //   ...table.initialState,
  // });

  // table.setOptions(prev => ({
  //   ...prev,
  //   tableState,
  //   onStateChange: setTableState,
  // }));

  // interface OptionData {
  //   data-type: string;
  //   data-edition: number;
  // }

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.selectedOptions[0];
    // const optionData: OptionData = {
    //   type: option.getAttribute('type') || '', // Handle missing attributes
    //   edition: Number(option.getAttribute('edition') || '0'), // Convert to number
    // };

    try {
      // Setting these states fires useQuery fetch
      // to not duplicate requests for table data
      if (option.dataset.type && option.dataset.edition) {
        setCurEventType(option.dataset.type);
        setCurEventEdition(Number(option.dataset.edition));
        setCurEventSelector(option.dataset.type + option.dataset.edition);
      } else {
        // Handle the case where data is missing
        setCurEventType('kr');
        setCurEventEdition(Number('1'));
        setCurEventSelector('kr1');
      }

      if (sheetIsSuccess && pbsIsSuccess) {
        const newSheet = mergeSheetsAndPBs(sheetData, pbs);
        setTableData(newSheet);

        table.resetExpanded(false);
      }
    } catch (error) {
      // Handle any errors gracefully
      // console.error('Error fetching data:', error);
      // Inform the user about the error
    }
  };

  const { rows } = table.getRowModel();

  const tableContainerRef = useRef(null);

  const selectorText = useBreakpointValue({
    base: 'Edition',
    lg: 'Select Kacky Edition :',
  });

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  useEffect(() => {
    if (eventsIsSuccess && authentication.isLoggedIn) {
      // Filter events
      const kkEventData = eventsData
        .filter(event => event.type === 'KK')
        .map(event => ({
          ...event,
          type: event.type.toLowerCase(),
          edition: event.edition,
        }));
      const krEventData = eventsData
        .filter(event => event.type === 'KR')
        .map(event => ({
          ...event,
          type: event.type.toLowerCase(),
          edition: event.edition,
        }));
      // Store raw data in state
      setKkArray(kkEventData);
      setKrArray(krEventData);
    }
  }, [
    authentication.isLoggedIn,
    authentication.token,
    eventsData,
    eventsIsSuccess,
  ]);

  useEffect(() => {
    if (isSuccessKK && authentication.isLoggedIn) {
      const kkseries = performanceKK.map(edition => edition.fins);
      const kkoptions = { ...donutChartOptionsCharts1 };
      kkoptions.labels = performanceKK.map(
        edition => `Kackiest Kacky #${edition.edition}`
      );
      kkoptions.colors = [
        '#93358a',
        '#e45b23',
        '#ff6800',
        '#bf9b0d',
        '#c7940b',
        '#00ff00',
        '#30b808',
        '#0d983a',
        '#d3b812',
        '#a54a10',
        '#8b0613',
      ];
      kkoptions.fill = { colors: kkoptions.colors };
      setKkPerfSeries(kkseries);
      setKkPerfOptions(kkoptions);
    }
  }, [
    authentication.isLoggedIn,
    authentication.token,
    colorMode,
    performanceKK,
  ]);

  useEffect(() => {
    if (isSuccessKR && authentication.isLoggedIn) {
      const krseries = performanceKR.map(edition => edition.fins);
      const kroptions = { ...donutChartOptionsCharts1 };
      kroptions.labels = performanceKR.map(
        edition => `Kacky Reloaded #${edition.edition}`
      );
      kroptions.colors = ['#203db9', '#58d6c5', '#4dd033', '#c8ad16'];
      kroptions.fill = { colors: kroptions.colors };
      setKrPerfSeries(krseries);
      setKrPerfOptions(kroptions);
    }
  }, [
    authentication.isLoggedIn,
    authentication.token,
    colorMode,
    performanceKR,
  ]);

  useEffect(() => {
    if (sheetIsSuccess && pbsIsSuccess && authentication.isLoggedIn) {
      const formattedData = mergeSheetsAndPBs(sheetData, pbs);
      setTableData(formattedData);
    }
  }, [sheetData, sheetIsSuccess, pbs, pbsIsSuccess, authentication.isLoggedIn]);

  // const [state, setState] = useState({
  //   ...table.initialState, //populate the initial state with all of the default state values from the table instance
  // });

  // //Use the table.setOptions API to merge our fully controlled state onto the table instance
  // table.setOptions(prev => ({
  //   ...prev, //preserve any other options that we have set up above
  //   state, //our fully controlled state overrides the internal state
  //   onStateChange: setState, //any state changes will be pushed up to our own state management
  // }));

  return (
    <Center w='full'>
      <VStack overflow='hidden' spacing={4}>
        {authentication.isLoggedIn ? (
          <Flex
            justifyContent='center'
            gap={4}
            marginBottom='40px'
            align='center'
            display={{ base: 'none', md: 'flex' }}
            direction={{ base: 'column', lg: 'row' }}
            w='full'
            h='full'
          >
            {/* Fix chart tooltip z-index */}
            {/* Fix font inside of the pie and color of not active legend text */}
            <Chart
              options={kkPerfOptions}
              series={kkPerfSeries}
              type='donut'
              width={useBreakpointValue({
                base: '150px', // Default size for smaller screens
                md: '420px', // Full width on medium screens
              })}
            />
            <Chart
              options={krPerfOptions}
              series={krPerfSeries}
              type='donut'
              width={useBreakpointValue({
                base: '150px', // Default size for smaller screens
                md: '420px', // Full width on medium screens
              })}
            />
          </Flex>
        ) : null}
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justify={{ base: 'none', md: 'space-between' }}
          w='full'
          gap={4}
        >
          <Button
            className='external'
            letterSpacing='0.1em'
            textShadow='glow'
            w='fit-content'
            alignSelf={{ base: 'center', md: 'none' }}
            onClick={() =>
              window.open(
                curEventType === 'kk'
                  ? `https://kackiestkacky.com/hunting/editions/ranking.php?edition=${curEventEdition}`
                  : `https://kackyreloaded.com/hunting/editions/ranking.php?edition=${curEventEdition}`
              )
            }
          >
            <Text>
              Global&nbsp;
              {curEventType === 'kk' ? 'KK' : 'KR'}
              {`${curEventEdition} `}
              Hunting Stats
            </Text>
            <Icon
              w={6}
              h={6}
              as={MdArrowOutward}
              filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
            />
          </Button>
          <Flex
            flexDir={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={4}
          >
            <Text
              id='labelSelectEdition'
              letterSpacing='0.1em'
              textShadow='glow'
              className='edition-text'
            >
              {selectorText}
            </Text>
            <Select
              w={80}
              aria-label='labelSelectEdition'
              value={curEventSelector}
              className='edition-select'
              onChange={event => handleChange(event)}
            >
              <optgroup label='Kacky Reloaded'>
                {/* {selectorArrayParse(krArray)} // Call selectorArrayParse here */}
                {krArray.map(data => (
                  <option
                    key={data.type + data.edition} // Use a unique key based on data properties
                    value={data.type + data.edition}
                    data-type={data.type}
                    data-edition={data.edition}
                  >
                    {data.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label='Kackiest Kacky'>
                {/* {selectorArrayParse(kkArray)} // Call selectorArrayParse here */}
                {kkArray.map(data => (
                  <option
                    key={data.type + data.edition} // Use a unique key based on data properties
                    value={data.type + data.edition}
                    data-type={data.type}
                    data-edition={data.edition}
                  >
                    {data.name}
                  </option>
                ))}
              </optgroup>
            </Select>
          </Flex>
        </Flex>
        <TableContainer
          w='container.xl'
          borderWidth='1px'
          borderRadius='md'
          ref={tableContainerRef}
        >
          <Table size='sm'>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th
                      key={header.id.concat('-header')}
                      colSpan={header.colSpan}
                      style={{
                        width:
                          header.id === 'finished'
                            ? 16
                            : header.id === 'difficulty' ||
                                header.id === 'number'
                              ? 100
                              : undefined,
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <Box
                          display='flex'
                          gap={2}
                          alignItems='center'
                          sx={
                            header.column.getCanSort()
                              ? { cursor: 'pointer', select: 'none' }
                              : undefined
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() ? (
                            header.column.getIsSorted() === 'asc' ? (
                              <Icon w={4} h={4} as={MdArrowUpward} />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <Icon w={4} h={4} as={MdArrowDownward} />
                            ) : (
                              <Box w={4} h={4} /> // Placeholder for unsorted state
                            )
                          ) : null}
                        </Box>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {!isErrorKK || !isErrorKR
                ? rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const row = rows[virtualRow.index];
                    return (
                      <Fragment key={row.id}>
                        <Tr
                          key={row.id.concat('-row')}
                          onClick={() => row.toggleExpanded()}
                          borderTop={row.getIsExpanded() ? '1px solid' : 'none'}
                        >
                          {row.getVisibleCells().map(cell => (
                            <Td key={cell.id.concat('-cell')}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          ))}
                        </Tr>
                        {row.getIsExpanded() && (
                          <Tr
                            key={row.id.concat('-collapse')}
                            display={row.getIsExpanded() ? 'relative' : 'none'}
                            borderBottom={
                              row.getIsExpanded() ? '1px solid' : 'none'
                            }
                          >
                            <Td
                              key={row.id.concat('-collapse-elem')}
                              colSpan={
                                table.getHeaderGroups()[0].headers.length
                              }
                            >
                              <MapDetailCell
                                key={row.id.concat('-cell')}
                                data={row.original}
                                mode='hunting'
                                eventtype={curEventType}
                                // edition={curEventEdition}
                                table={table}
                                rowIndex={row.index}
                              />
                            </Td>
                          </Tr>
                        )}
                      </Fragment>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Center>
  );
};

export default Hunting;
