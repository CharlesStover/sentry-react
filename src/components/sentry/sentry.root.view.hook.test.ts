const TEST_INIT = jest.fn();
jest.mock('@sentry/react', () => ({
  init: TEST_INIT,
}));

import { renderHook } from '@testing-library/react-hooks';
import { Integration, LogLevel } from '@sentry/types';
import useSentry from './sentry.root.view.hook';

const TEST_BEFORE_BREADCRUMB = jest.fn();
const TEST_BEFORE_SEND = jest.fn();
const TEST_TRACES_SAMPLER = jest.fn();
const TEST_TRANSPORT = jest.fn();

describe('useSentry', (): void => {
  it('should call init', (): void => {
    renderHook(useSentry, {
      initialProps: {
        allowUrls: [],
        attachStacktrace: true,
        autoSessionTracking: true,
        beforeBreadcrumb: TEST_BEFORE_BREADCRUMB,
        beforeSend: TEST_BEFORE_SEND,
        debug: true,
        defaultIntegrations: false,
        denyUrls: [],
        dist: 'test-dist',
        dsn: 'test-dsn',
        enabled: true,
        environment: 'test-environment',
        experiments: {},
        ignoreErrors: [],
        initialScope: {},
        integrations: [],
        logLevel: LogLevel.None,
        maxBreadcrumbs: 1,
        maxValueLength: 1,
        metadata: {},
        normalizeDepth: 1,
        release: 'test-release',
        sampleRate: 1,
        shutdownTimeout: 1,
        tracesSampleRate: 1,
        tracesSampler: TEST_TRACES_SAMPLER,
        transport: TEST_TRANSPORT,
        tunnel: 'test-tunnel',
        transportOptions: {
          dsn: 'test-dsn',
        },
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(1);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      _experiments: {},
      _metadata: {},
      allowUrls: [],
      attachStacktrace: true,
      autoSessionTracking: true,
      beforeBreadcrumb: TEST_BEFORE_BREADCRUMB,
      beforeSend: TEST_BEFORE_SEND,
      debug: true,
      defaultIntegrations: false,
      denyUrls: [],
      dist: 'test-dist',
      dsn: 'test-dsn',
      enabled: true,
      environment: 'test-environment',
      ignoreErrors: [],
      initialScope: {},
      integrations: [],
      logLevel: LogLevel.None,
      maxBreadcrumbs: 1,
      maxValueLength: 1,
      normalizeDepth: 1,
      release: 'test-release',
      sampleRate: 1,
      shutdownTimeout: 1,
      tracesSampleRate: 1,
      tracesSampler: TEST_TRACES_SAMPLER,
      transport: TEST_TRANSPORT,
      tunnel: 'test-tunnel',
      transportOptions: {
        dsn: 'test-dsn',
      },
    });
  });

  it('should support a default integrations array', (): void => {
    renderHook(useSentry, {
      initialProps: {
        defaultIntegrations: [],
        dsn: 'test-dsn',
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(1);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      defaultIntegrations: [],
      dsn: 'test-dsn',
    });
  });

  it('should support an integrations function', (): void => {
    const TEST_INTEGRATIONS: readonly Integration[] = [
      {
        name: 'test-integration',
        setupOnce(): void {},
      },
    ];

    renderHook(useSentry, {
      initialProps: {
        dsn: 'test-dsn',
        integrations(): readonly Integration[] {
          return TEST_INTEGRATIONS;
        },
      },
    });

    expect(TEST_INIT.mock.calls[0][0].integrations()).toEqual(
      TEST_INTEGRATIONS,
    );
  });
});
