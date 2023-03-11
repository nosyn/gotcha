import { useQuery } from '@apollo/client';
import { Loader } from '@mantine/core';
import { useState } from 'react';
import { UsersTable } from '../components/user/UsersTable';
import { Users } from '../graphql/document_nodes/queries';
import { Captcha, User, UsersData } from '../types';

export function UserTableContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, loading, subscribeToMore } = useQuery<UsersData>(Users);

  // useEffect(() => {
  //   // We only start subscription after we successfully fetched the data
  //   if (!data) {
  //     return;
  //   }

  //   setCaptchas(data.captchas);

  //   const unsubscribe = subscribeToMore<CaptchaCreatedData>({
  //     document: CaptchaCreated,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newCaptcha = subscriptionData.data.captchaCreated;

  //       setCaptchas([newCaptcha, ...prev.captchas]);

  //       return Object.assign({}, prev, {
  //         captchas: [newCaptcha, ...prev.captchas],
  //       });
  //     },
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [data]);

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
