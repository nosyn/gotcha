import { useEffect, useState } from 'react';
import CaptchaTable from '../components/captcha/CaptchaTable';
import useCaptchasQuery from '../graphql/hooks/useCaptchasQuery';
import { CaptchaCreated } from '../graphql/hooks/useCaptchaCreatedSubscription';
import { Captcha, CaptchaCreatedData } from '../types';
import { Container, Loader } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

export default function DashboardPage() {
  const { data, error, loading, subscribeToMore } = useCaptchasQuery();
  const [captchas, setCaptchas] = useState<Captcha[]>([]);

  useEffect(() => {
    // We only start subscription after we successfully fetched the data
    if (!data) {
      return;
    }

    setCaptchas(data.captchas);

    const unsubscribe = subscribeToMore<CaptchaCreatedData>({
      document: CaptchaCreated,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCaptcha = subscriptionData.data.captchaCreated;

        setCaptchas([newCaptcha, ...prev.captchas]);

        return Object.assign({}, prev, {
          captchas: [newCaptcha, ...prev.captchas],
        });
      },
    });

    return () => {
      unsubscribe();
    };
  }, [data]);

  if (error) {
    console.error('Error occurred: ', error);
    return <div>Error</div>;
  }

  if (!data || !data?.captchas.length) {
    return <div>No data</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      sx={(theme: MantineTheme) => ({
        backgroundColor: theme.colors.gray[2],
        marginTop: '3rem',
        padding: '1rem',
      })}
    >
      <CaptchaTable rows={captchas} />
    </Container>
  );
}
