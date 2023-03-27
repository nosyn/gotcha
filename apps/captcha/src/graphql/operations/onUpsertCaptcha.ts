import { OnUpsertCaptchaDocument, OnUpsertCaptchaInput } from '../_generated__/graphql.js';
import { client } from '../client.js';

export const onUpsertCaptcha = async (input: OnUpsertCaptchaInput) => {
  try {
    const observable = await client.subscribe({
      query: OnUpsertCaptchaDocument,
      variables: { input },
    });

    const subscription = observable.subscribe(({ data }: any) => {
      console.log('data: ', data);
    });

    return subscription;
  } catch (error) {
    console.error('onUpsertCaptcha error:\n', JSON.stringify(error, undefined, 2));
  }
};
