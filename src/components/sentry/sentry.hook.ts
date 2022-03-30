import type { BrowserOptions } from '@sentry/react';
import { init, setUser } from '@sentry/react';
import type { User } from '@sentry/types';
import { useEffect } from 'react';
import DEFAULT_USER from '../../constants/default-user';

interface Props extends BrowserOptions {
  readonly user?: User | undefined;
}

const sortKeys = (
  a: number | string | symbol,
  b: number | string | symbol,
): number => {
  return a.toString().localeCompare(b.toString());
};

const mapRecordToDependencyArray = <
  T extends Record<number | string | symbol, unknown>,
>(
  record: T,
): unknown[] => {
  const dependencies: unknown[] = [];
  const keys: (keyof T)[] = Object.keys(record);

  keys.sort(sortKeys);

  for (const key of keys) {
    dependencies.push(key);
    dependencies.push(record[key]);
  }

  return dependencies;
};

export default function useSentry({
  user,
  ...browserOptions
}: Readonly<Props>): void {
  const initDependencies: unknown[] = mapRecordToDependencyArray(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    browserOptions as Record<number | string | symbol, unknown>,
  );

  useEffect(
    (): void => {
      init(browserOptions);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    initDependencies,
  );

  useEffect((): void => {
    setUser({
      ...DEFAULT_USER,
      ...user,
    });
  }, [user]);
}
