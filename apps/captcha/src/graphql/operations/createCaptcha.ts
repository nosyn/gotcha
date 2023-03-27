import { FetchResult } from '@apollo/client/link/core/types.js';
import { CreateCaptchaDocument, CreateCaptchaInput, CreateCaptchaMutation } from '../_generated__/graphql.js';
import { client } from '../client.js';

export const createCaptcha = async (input: CreateCaptchaInput) => {
  try {
    const response = await client.mutate<CreateCaptchaMutation>({
      mutation: CreateCaptchaDocument,
      variables: { input },
    });

    const { data, errors }: FetchResult<CreateCaptchaMutation> = response;

    if (!data?.createCaptcha) {
      throw new Error('Can not create captcha');
    }

    if (errors?.length) {
      throw errors[0];
    }

    console.info(`✅ Successfully create captcha ${data.createCaptcha.captchaId} request to server.`);
  } catch (error) {
    console.error('createCaptcha error:\n', JSON.stringify(error, undefined, 2));
  }
};
