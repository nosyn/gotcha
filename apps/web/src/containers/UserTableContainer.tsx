import { useQuery } from '@apollo/client';
import { Loader } from '@mantine/core';
import { useEffect } from 'react';
import { UsersTable } from '../components/user/UsersTable';
import { Users } from '../graphql/document_nodes/queries';
import { OnUserUpdated } from '../graphql/document_nodes/subscriptions';
import { UsersData } from '../types';

export function UserTableContainer() {
  const { data, error, loading, subscribeToMore } = useQuery<UsersData>(Users);

  useEffect(() => {
    const unsubscribe = subscribeToMore<any>({
      document: OnUserUpdated,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('prev: ', prev);
        console.log('data: ', subscriptionData);
        if (!subscriptionData.data) return prev;
        const updatedUser = subscriptionData.data.onUserUpdated;

        const newUsers = prev.users.map((u) => {
          if (u.id === updatedUser?.id) {
            return updatedUser;
          }

          return u;
        });

        return {
          users: newUsers,
        };
      },
      variables: {
        input: {
          userId: '1',
        },
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (error) {
    console.error('Error occurred: ', error);
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return <UsersTable rows={data.users} />;
}
