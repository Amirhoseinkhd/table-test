import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
}
  from "@tanstack/react-table"

import { Post } from "../fetchData"
import Filter from "./Filter"
import { Table, Button, Text, Flex, ScrollArea, Input, NativeSelect, Paper } from '@mantine/core';


function Tablee({
  data,
  columns,
}: {
  data: Post[]
  columns: ColumnDef<Post>[]
}) {
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    debugTable: true,

  })

  return (
    <>
      <Paper shadow="xl" radius="xl" p="xl">
        <ScrollArea h={550} scrollbarSize={6} offsetScrollbars  >
          <Table
            highlightOnHover
            withTableBorder
            withColumnBorders
            striped
            borderColor="gray"
          >

            <Table.Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <Table.Th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div style={{ textAlign: 'center' }}>

                            <Text
                              size="md"
                              fw={900}
                              variant="gradient"
                              gradient={{ from: 'grape', to: 'gray', deg: 0 }}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Text>
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </div>
                        )}
                      </Table.Th>
                    )
                  })}
                </Table.Tr>
              ))}
            </Table.Thead>

            <Table.Tbody >
              {table.getRowModel().rows.map(row => {
                return (
                  <Table.Tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <Table.Td key={cell.id}>
                          <Text
                            size="sm" lineClamp={2}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Text>

                        </Table.Td>
                      )
                    })}
                  </Table.Tr>
                )
              })}
            </Table.Tbody>

          </Table>
        </ScrollArea>
        
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="center"
          align={{base:'center',sm:'unset'}}
          gap={30}
          style={{ marginTop: '20px' }}
        >
          <Flex>
            <Button
              variant="light" color="violet" size="xs" radius="xl"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button
              variant="light" color="violet" size="xs" radius="xl"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </Button>
            <Button
              variant="light" color="violet" size="xs" radius="xl"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </Button>
            <Button
              variant="light" color="violet" size="xs" radius="xl"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </Button>
          </Flex>

          <Text
            size="md"
            fw={900}
            variant="gradient"
            gradient={{ from: 'grape', to: 'cyan', deg: 126 }}
            display='flex'
          >
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </Text>

          <Flex>
            <Text
              size="md"
              fw={900}
              variant="gradient"
              gradient={{ from: 'grape', to: 'cyan', deg: 126 }}
              display='flex'

            >
              Go to page:
            </Text>
            <Input
              size="xs" radius="xl"
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              style={{ paddingLeft: '5px' }}
            />

          </Flex>
          <NativeSelect
            size="xs" radius="xl"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </NativeSelect>
        </Flex>
      </Paper>
    </>
  )
}

export default Tablee;