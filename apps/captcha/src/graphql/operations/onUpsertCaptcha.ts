import { OnUpsertCaptchaDocument } from '../_generated__/graphql.js';
import client from '../subscriptionClient.js';

export const onUpsertCaptcha = async () => {
  try {
    const observable = await client.subscribe({
      query: OnUpsertCaptchaDocument,
    });

    const subscription = observable.subscribe(({ data }: any) => {
      console.log('data: ', data);
    });

    return subscription;
  } catch (error) {
    console.error('onUpsertCaptcha error\n:', JSON.stringify(error, undefined, 2));
  }
};
