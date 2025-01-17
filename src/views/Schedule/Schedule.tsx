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
  Heading,
  Center,
  HStack,
  Input,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';

import AuthContext from '@/context/AuthContext';
import EventContext from '@/context/EventContext';

import defaultColumns from './Schedule.service';
import { getScheduleData, getPersonalBests } from '@/api/api';
import MapDetailCell from '@/components/HuntingScheduleTableCells/MapDetailCell';
import { mergeSheetsAndPBs } from '@/components/SheetOperations';

const Spreadsheet = () => {
  const { event } = useContext(EventContext);
  const { authentication } = useContext(AuthContext);

  const [tableData, setTableData] = useState(() => []);
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(() => [...defaultColumns]);

  const [data, setData] = useState(null);
  const [dataIsSuccess, setDataIsSuccess] = useState(false);
  const [pbs, setPbs] = useState(null);
  const [pbsIsSuccess, setPbsIsSuccess] = useState(false);

  useEffect(() => {
    if (event.type && event.edition) {
      setData(null);
      setDataIsSuccess(false);
      getScheduleData(authentication.token).then(response => {
        setData(response);
        setDataIsSuccess(true);
      });
    }
  }, [event.type, event.edition, authentication.token]);

  useEffect(() => {
    if (event.type && event.edition && authentication.isLoggedIn) {
      setPbs(null);
      setPbsIsSuccess(false);
      getPersonalBests(authentication.token, event.type).then(response => {
        setPbs(response);
        setPbsIsSuccess(true);
      });
    }
    setPbsIsSuccess(true); // @TODO check if this really needs to be set always true...
  }, [
    authentication.token,
    authentication.isLoggedIn,
    event.type,
    event.edition,
  ]);

  useEffect(() => {
    if (dataIsSuccess && pbsIsSuccess) {
      const formattedData = mergeSheetsAndPBs(data, pbs);
      setTableData(formattedData);
    }
  }, [data, pbs, dataIsSuccess, pbsIsSuccess]);

  const [sorting, setSorting] = useState([]);

  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      expanded,
      columnVisibility: {
        finished: authentication.isLoggedIn,
        difficulty: authentication.isLoggedIn,
        personalBest: authentication.isLoggedIn,
        local: authentication.isLoggedIn,
        wrScore: !authentication.isLoggedIn,
        wrHolder: !authentication.isLoggedIn,
        clip: false,
        discordPing: false,
      },
    },
    initialState: {
      sortBy: [
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
      updateData: (rowIndex, columnId, value) => {
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

  const tableContainerRef = useRef(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 15,
    overscan: 10,
  });

  const { colorMode } = useColorMode();

  const rowBGcolor = toggled => {
    if (toggled) {
      return colorMode === 'dark' ? 'light' : 'dark';
    }
    return colorMode;
  };

  return (
    <Center mb={{ base: 24, md: 8 }} px={{ base: 4, md: 8 }} w='full'>
      <VStack overflow='hidden' spacing={4}>
        <Heading my={1} className='text-center text'>
          {event.type === 'kk' ? 'Kackiest Kacky' : 'Kacky Reloaded'}{' '}
          {event.edition} Schedule
        </Heading>
        <HStack w='full'>
          <Text letterSpacing='0.1em' textShadow='glow'>
            Filter for a Map :
          </Text>
          <Input
            w={20}
            onChange={e =>
              table
                .getHeaderGroups()[0]
                .headers[2].column.setFilterValue(String(e.target.value))
            }
            placeholder='#000'
          />
        </HStack>
        <TableContainer
          ref={tableContainerRef}
          w='container.xl'
          borderWidth='1px'
          borderRadius='md'
        >
          <Table size='sm' data-type='Table' variant='simple'>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      px={{ base: '1', md: '2', lg: '3' }}
                      style={{
                        width:
                          header.id === 'finished'
                            ? 8
                            : header.id === 'difficulty' ||
                                header.id === 'number'
                              ? 100
                              : 'auto',
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <Box
                          display='flex'
                          gap={2}
                          alignItems='center'
                          justifyContent={'center'}
                          sx={
                            header.column.getCanSort() && {
                              cursor: 'pointer',
                              select: 'none',
                            }
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <Icon w={4} h={4} as={MdArrowUpward} />,
                            desc: <Icon w={4} h={4} as={MdArrowDownward} />,
                          }[header.column.getIsSorted()] ??
                            (header.column.getCanSort() ? (
                              <Box
                                w={{ base: 2, md: 3, lg: 3 }}
                                h={{ base: 2, md: 3, lg: 3 }}
                              />
                            ) : null)}
                        </Box>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = rows[virtualRow.index];
                return (
                  <Fragment key={row.id.concat('-row')}>
                    <Tr
                      key={row.id}
                      onClick={() => row.toggleExpanded()}
                      bg={rowBGcolor(row.getIsExpanded())}
                      _hover={{
                        cursor: 'pointer',
                      }}
                      alignItems='center'
                      justifyItems='center'
                    >
                      {row.getVisibleCells().map(cell => (
                        <Td
                          px={{ base: '1', md: '2', lg: '3' }}
                          key={cell.id}
                          background={!row.getIsExpanded()}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      ))}
                    </Tr>
                    <Tr
                      key={row.id.concat('-collapse')}
                      display={row.getIsExpanded() ? 'relative' : 'none'}
                    >
                      <Td
                        key={row.id.concat('-collapse-elem')}
                        colSpan={table.getHeaderGroups()[0].headers.length}
                      >
                        <MapDetailCell
                          data={row.original}
                          eventtype={event.type}
                          edition={event.edition}
                          mode='schedule'
                          table={table}
                          rowIndex={row.index}
                        />
                      </Td>
                    </Tr>
                  </Fragment>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Center>
  );
};

export default Spreadsheet;
