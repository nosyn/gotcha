import { CreateCaptchaDocument, CreateCaptchaInput, CreateCaptchaMutation } from '../_generated__/graphql.js';
import { client } from '../client.js';

export const createCaptcha = (input: CreateCaptchaInput) =>
  client
    .mutate({
      mutation: CreateCaptchaDocument,
      variables: { input },
    })
    .then(({ data }: { data: CreateCaptchaMutation }) => {
      console.info(`✅ Successfully create captcha ${data.createCaptcha.captchaId} request to server.`);
    })
    .catch((error) => {
      console.error('createCaptcha error:\n', JSON.stringify(error, undefined, 2));
    });
