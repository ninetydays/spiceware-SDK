import { Polly } from "@pollyjs/core";
import Adapter from "@pollyjs/adapter-node-http";
import Persister from "@pollyjs/persister-fs";
Polly.register(Adapter);
Polly.register(Persister);

import SpicewareSDK from "../src";

const NAME = "SpicewareSDK";
const baseURL = "http://enc-dev.kross.kr:4826";

describe(NAME, () => {
  let polly: Polly;
  let sdk: SpicewareSDK;
  let encryptedName: string;
  const name = "jonghunyu";

  beforeAll(() => {
    polly = new Polly(NAME, {
      adapters: ["node-http"],
      persister: "fs",
    });
    polly.configure({
      persisterOptions: { fs: { recordingsDir: "__test__/recordings" } },
    });
    sdk = new SpicewareSDK({ baseURL });
  });

  afterAll(() => polly.stop());
  it("encrypts plain text", async () => {
    const payload = {
      uri: "/test",
      ip: "127.0.0.1",
      fields: { name },
    };
    const { status, data } = await sdk.encrypt(payload);
    expect(status).toBe(200);
    expect(data.result).toBe("success");
    expect(data.fields).toMatchSnapshot();
    encryptedName = data.fields.name;
  });

  it("decrypt encrypted text", async () => {
    const payload = {
      uri: "/test",
      ip: "127.0.0.1",
      fields: { name: encryptedName },
    };
    const { status, data } = await sdk.decrypt(payload);
    expect(status).toBe(200);
    expect(data.result).toBe("success");
    expect(data.fields).toMatchSnapshot();
    expect(data.fields.name).toBe(name);
  });

  it("decrypt encrypted text in array", async () => {
    const payload = {
      uri: "/test",
      ip: "127.0.0.1",
      fields: [{ seq: "1", name: encryptedName }],
    };
    const { status, data } = await sdk.decryptList(payload);
    expect(status).toBe(200);
    expect(data.result).toBe("success");
    expect(data.fields).toMatchSnapshot();
    expect(data.fields[0].name).toBe(name);
  });
});
