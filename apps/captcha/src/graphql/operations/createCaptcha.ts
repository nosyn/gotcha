import {
  CreateCaptchaDocument,
  CreateCaptchaInput,
  CreateCaptchaMutation,
  CreateCaptchaMutationVariables,
} from '../_generated__/graphql.js';
import { client } from '../client.js';

export const createCaptcha = (input: CreateCaptchaInput) =>
  client
    .request<CreateCaptchaMutation, CreateCaptchaMutationVariables>(CreateCaptchaDocument, { input })
    .then((result) => {
      console.info(`✅ Successfully create captcha ${result.createCaptcha.captchaId} request to server.`);
    })
    .catch((error) => {
      console.error('createCaptcha error\n:', JSON.stringify(error, undefined, 2));
    });
