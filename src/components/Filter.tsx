import { Table as ReactTable, Column } from "@tanstack/react-table"
import { Input } from '@mantine/core';

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: ReactTable<any>
}) {

  const columnFilterValue = column.getFilterValue()

  return (
    <Input
      size="xs" radius="xl"
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
    />
  )
}
export default Filter;