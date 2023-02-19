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

    const fileNameWithExtension = `${name}.${extension}`;
    form.set(name, blob, fileNameWithExtension);

    const data = await got
      .post('http://localhost:8080/file', {
        body: form,
      })
      .json();

    console.info(
      `Successfully uploaded ${fileNameWithExtension} to file server.`
    );
  } catch (err) {
    console.log('Error while uploading to file server: ', err);
  }
};
