import got, { HTTPError } from 'got';
import { FormData, Blob } from 'formdata-node';

export type FileInput = {
  id: string;
  name: string;
  buffer: Buffer;
  type: string;
};

export const uploadFile = async ({ name, id, buffer, type }: FileInput) => {
  try {
    const form = new FormData();
    const blob = new Blob([buffer], { type });

    form.set(id, blob, name);

    const data = await got
      .post('http://localhost:8080/image', {
        body: form,
      })
      .json();

    console.info(
      `✅ Successfully uploaded ${name} to file server. Got response:\n`,
      data
    );
  } catch (err: any) {
    console.log(
      `❌ Error while uploading ${name}to file server:\n`,
      err.message
    );
  }
};
