import { fetchPosts, Post } from './fetchData';
import { useQuery } from 'react-query';
import Tablee from './components/Table';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Flex } from '@mantine/core';

const App = () => {

  const { data, error, isLoading, isError } = useQuery<Post[], Error>('posts', fetchPosts);

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        header: 'User information',

        columns: [
          {
            accessorKey: 'userId',
            header: 'User id',

          },
          {
            accessorKey: 'id',
            header: 'Post id',

          },
          {
            accessorKey: 'title',
            header: 'Title',

          },
          {
            accessorKey: 'body',
            header: 'Body',
          },
        ]
      },
    ],
    []
  )


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Flex justify="center" align="center" direction="column" style={{ maxWidth: '1100px' }}>
        <Tablee
          data={data!}
          columns={columns}
        />
      </Flex>
    </>
  )
}

export default App;