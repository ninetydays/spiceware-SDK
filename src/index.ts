import axios, { AxiosInstance } from "axios";

import { DecryptItemType, DecryptListType, EncryptItemType } from "./types";

class SpicewareSDK {
  client: AxiosInstance;

  constructor({ baseURL }: { baseURL: string }) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }

  encrypt(data: EncryptItemType) {
    return this.client("/encrypt", { method: "post", data });
  }

  decrypt(data: DecryptItemType) {
    return this.client("/decrypt", { method: "post", data });
  }

  decryptList(data: DecryptListType) {
    return this.client("/decryptlist", { method: "post", data });
  }
}

export * from "./types";
export default SpicewareSDK;
