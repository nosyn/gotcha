import * as fs from "node:fs/promises";
import * as path from "node:path";
import got from "got";
import { FormData, Blob } from "formdata-node";

export const uploadFile = async () => {
  try {
    const form = new FormData();
    const captcha = await fs.readFile(path.join(".", "captcha.png"));
    const blob = new Blob([captcha], { type: "image/png" });

    form.set("captcha", blob, "captcha.png");

    const data = await got
      .post("http://localhost:8080/file", {
        body: form,
      })
      .json();

    // const { data } = await got.post("http://localhost:8080/upload", {}).json();

    console.log("ok: ", data);
  } catch (err) {
    console.log("hello: ", err.message);
  }
};
