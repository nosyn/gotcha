import { useEffect, useState } from 'react';
import CaptchaCard from '../components/captcha/captcha-card/CaptchaCard';
import CaptchaTable from '../components/captcha/CaptchaTable';
import useCaptchasQuery from '../graphql/hooks/useCaptchasQuery';
import { CaptchaCreated } from '../graphql/hooks/useCaptchaCreatedSubscription';
import { Captcha, CaptchaCreatedData } from '../types';
import { Container, Flex, Loader } from '@mantine/core';

export default function CaptchaPage() {
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
      // variables: { postID: params.postID },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.captchaCreated;

        setCaptchas([newFeedItem, ...prev.captchas]);

        return Object.assign({}, prev, {
          captchas: [newFeedItem, ...prev.captchas],
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
    <Container>
      <Flex justify="flex-start" align="flex-start">
        <CaptchaTable rows={captchas} />
      </Flex>
    </Container>
  );
}
