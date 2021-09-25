import type {
  Breadcrumb,
  BreadcrumbHint,
  Event,
  EventHint,
  ReportDialogOptions,
} from '@sentry/react';
import { ErrorBoundary } from '@sentry/react';
import type { ErrorBoundaryProps } from '@sentry/react/dist/errorboundary';
import type {
  CaptureContext,
  Integration,
  LogLevel,
  SamplingContext,
  SdkMetadata,
  TransactionContext,
  Transport,
  TransportClass,
  TransportOptions,
} from '@sentry/types';
import type { ReactElement, ReactNode } from 'react';
import DefaultErrorBoundaryFallback from '../../components/default-error-boundary-fallback';
import FallbackRenderParams from '../../types/fallback-render-params';
import useSentry from './sentry.root.view.hook';

interface Props {
  readonly allowUrls?: (RegExp | string)[] | undefined;
  readonly attachStacktrace?: boolean | undefined;
  readonly autoSessionTracking?: boolean | undefined;
  readonly children: ReactNode;
  readonly debug?: boolean | undefined;
  readonly defaultIntegrations?: false | readonly Integration[];
  readonly denyUrls?: (RegExp | string)[] | undefined;
  readonly dist?: string | undefined;
  readonly dsn?: string | undefined;
  readonly enabled?: boolean | undefined;
  readonly environment?: string | undefined;
  readonly errorBoundaryDialogOptions?: ReportDialogOptions | undefined;
  readonly experiments?: Record<string, unknown> | undefined;
  readonly ignoreErrors?: (RegExp | string)[] | undefined;
  readonly initialScope?: CaptureContext | undefined;
  readonly logLevel?: LogLevel;
  readonly maxBreadcrumbs?: number | undefined;
  readonly maxValueLength?: number | undefined;
  readonly metadata?: SdkMetadata | undefined;
  readonly normalizeDepth?: number | undefined;
  readonly release?: string | undefined;
  readonly sampleRate?: number | undefined;
  readonly showErrorBoundaryDialog?: boolean | undefined;
  readonly shutdownTimeout?: number | undefined;
  readonly tracesSampleRate?: number | undefined;
  readonly transport?: TransportClass<Transport> | undefined;
  readonly transportOptions?: TransportOptions | undefined;
  readonly tunnel?: string | undefined;
  readonly ErrorBoundaryFallback?:
    | ((props: FallbackRenderParams) => ReactElement)
    | undefined;
  readonly integrations?:
    | undefined
    | readonly Integration[]
    | ((
        integrations: readonly Readonly<Integration>[],
      ) => readonly Integration[]);
  readonly beforeBreadcrumb?:
    | undefined
    | ((
        breadcrumb: Readonly<Breadcrumb>,
        hint?: BreadcrumbHint,
      ) => Breadcrumb | null);
  readonly beforeSend?:
    | undefined
    | ((
        event: Readonly<Event>,
        hint?: EventHint,
      ) => PromiseLike<Event | null> | Event | null);
  readonly tracesSampler?:
    | undefined
    | ((
        samplingContext: Readonly<
          Omit<SamplingContext, 'transactionContext'>
        > & { readonly transactionContext: Readonly<TransactionContext> },
      ) => number | boolean);
}

export default function Sentry({
  ErrorBoundaryFallback = DefaultErrorBoundaryFallback,
  children,
  environment,
  allowUrls,
  attachStacktrace,
  autoSessionTracking,
  beforeBreadcrumb,
  beforeSend,
  debug,
  defaultIntegrations,
  denyUrls,
  dist,
  dsn,
  enabled,
  errorBoundaryDialogOptions,
  experiments,
  ignoreErrors,
  initialScope,
  integrations,
  logLevel,
  maxBreadcrumbs,
  maxValueLength,
  metadata,
  normalizeDepth,
  release,
  sampleRate,
  showErrorBoundaryDialog,
  shutdownTimeout,
  tracesSampleRate,
  tracesSampler,
  transport,
  transportOptions,
  tunnel,
}: Props): ReactElement {
  useSentry({
    allowUrls,
    attachStacktrace,
    autoSessionTracking,
    beforeBreadcrumb,
    beforeSend,
    denyUrls,
    debug,
    defaultIntegrations,
    dist,
    dsn,
    enabled,
    environment,
    experiments,
    ignoreErrors,
    initialScope,
    integrations,
    logLevel,
    maxBreadcrumbs,
    maxValueLength,
    metadata,
    normalizeDepth,
    release,
    sampleRate,
    shutdownTimeout,
    tracesSampleRate,
    tracesSampler,
    transport,
    transportOptions,
    tunnel,
  });

  const errorBoundaryProps: ErrorBoundaryProps = {
    fallback: ErrorBoundaryFallback,
  };

  if (typeof errorBoundaryDialogOptions !== 'undefined') {
    errorBoundaryProps.dialogOptions = errorBoundaryDialogOptions;
  }

  if (typeof showErrorBoundaryDialog === 'boolean') {
    errorBoundaryProps.showDialog = showErrorBoundaryDialog;
  }

  return <ErrorBoundary {...errorBoundaryProps}>{children}</ErrorBoundary>;
}
