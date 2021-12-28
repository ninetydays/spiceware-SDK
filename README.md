# spiceware-SDK

Node SDK for [spiceware](https://www.spiceware.io/) encrypt/decript module

### Installation

```console
npm install spiceware-sdk
```

### Usage

```javascript
import SpicewareSDK from "spiceware-sdk";

const spiceware = new SpicewareSDK({
  baseURL: "http://yourserverwhereinstanceis",
});

const { status, data } = spiceware.encrypt({
  url: "/test",
  ip: "127.0.0.1",
  fields: { name: "plainname" },
});

const encryptedName = data.fields.name;

const { status, data } = spiceware.decrypt({
  url: "/test",
  ip: "127.0.0.1",
  fields: { name: encryptedName },
});

const decryptedName = data.fields.name; // this should be plainname
```

### Test

```console
npm test
```
