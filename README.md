# <Sentry />

[![version](https://img.shields.io/npm/v/sentry-react.svg)](https://www.npmjs.com/package/sentry-react)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/sentry-react.svg)](https://www.npmjs.com/package/sentry-react)
[![downloads](https://img.shields.io/npm/dt/sentry-react.svg)](https://www.npmjs.com/package/sentry-react)

`sentry-react` offers a `<Sentry />` component that instantiates Sentry for your
React application.

## Install

- `npm install sentry-react` or
- `yarn add sentry-react`

## Use

Mount `<Sentry />` around your React application, typically alongside your
context providers.

```javascript
import { render } from 'react-dom';
import Sentry from 'sentry-react';
import App from './components';

render(
  <Sentry>
    <App />
  </Sentry>,
  document.getElementById('root'),
);
```

## API

API

## Contributing

- `yarn set version latest`
- `yarn up * @*/*`
- If you use VIM, run `yarn sdks vim`.
- If you use Visual Studio Code, run `yarn sdks vscode`.
