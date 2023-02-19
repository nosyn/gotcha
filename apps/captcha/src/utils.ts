import got from 'got';
import { FormData, Blob } from 'formdata-node';

export type FileInput = {
  name: string;
  buffer: Buffer;
  extension: string;
  type: string;
};

export const uploadFile = async ({
  name,
  buffer,
  extension,
  type,
}: FileInput) => {
  try {
    const form = new FormData();
    const blob = new Blob([buffer], { type });

    form.set(name, blob, `${name}.${extension}`);

    const data = await got
      .post('http://localhost:8080/file', {
        body: form,
      })
      .json();

    console.log('ok: ', data);
  } catch (err) {
    console.log('hello: ', err.message);
  }
};
