import type {
  Breadcrumb,
  BreadcrumbHint,
  Event,
  EventHint,
  ReportDialogOptions,
} from '@sentry/react';
import { ErrorBoundary } from '@sentry/react';
import type {
  CaptureContext,
  Integration,
  LogLevel,
  SamplingContext,
  Scope,
  SdkMetadata,
  TransactionContext,
  Transport,
  TransportClass,
  TransportOptions,
} from '@sentry/types';
import type { ReactElement, ReactNode } from 'react';
import DefaultErrorBoundaryFallback from '../../components/default-error-boundary-fallback';
import type FallbackRenderParams from '../../types/fallback-render-params';
import useSentry from './sentry.root.view.hook';

interface Props {
  readonly allowUrls?: (RegExp | string)[] | undefined;
  readonly attachStacktrace?: boolean | undefined;
  readonly autoSessionTracking?: boolean | undefined;
  readonly children: ReactNode;
  readonly debug?: boolean | undefined;
  readonly defaultIntegrations?: readonly Integration[] | false;
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
  readonly onErrorBoundaryMount?: VoidFunction | undefined;
  readonly release?: string | undefined;
  readonly sampleRate?: number | undefined;
  readonly showErrorBoundaryDialog?: boolean | undefined;
  readonly shutdownTimeout?: number | undefined;
  readonly tracesSampleRate?: number | undefined;
  readonly transport?: TransportClass<Transport> | undefined;
  readonly transportOptions?: TransportOptions | undefined;
  readonly tunnel?: string | undefined;
  readonly beforeErrorBoundaryCapture?:
    | ((
        scope: Readonly<Scope>,
        error: Readonly<Error> | null,
        componentStack: string | null,
      ) => void)
    | undefined;
  readonly ErrorBoundaryFallback?:
    | ((props: FallbackRenderParams) => ReactElement)
    | undefined;
  readonly integrations?:
    | readonly Integration[]
    | ((
        integrations: readonly Readonly<Integration>[],
      ) => readonly Integration[])
    | undefined;
  readonly beforeBreadcrumb?:
    | ((
        breadcrumb: Readonly<Breadcrumb>,
        hint?: BreadcrumbHint,
      ) => Breadcrumb | null)
    | undefined;
  readonly beforeSend?:
    | ((
        event: Readonly<Event>,
        hint?: EventHint,
      ) => Event | PromiseLike<Event | null> | null)
    | undefined;
  readonly onErrorBoundaryError?:
    | ((
        error: Readonly<Error>,
        componentStack: string,
        eventId: string,
      ) => void)
    | undefined;
  readonly onErrorBoundaryReset?:
    | ((
        error: Error | null,
        componentStack: string | null,
        eventId: string | null,
      ) => void)
    | undefined;
  readonly onErrorBoundaryUnmount?:
    | ((
        error: Error | null,
        componentStack: string | null,
        eventId: string | null,
      ) => void)
    | undefined;
  readonly tracesSampler?:
    | ((
        samplingContext: Readonly<
          Omit<SamplingContext, 'transactionContext'>
        > & { readonly transactionContext: Readonly<TransactionContext> },
      ) => boolean | number)
    | undefined;
}

export default function Sentry({
  ErrorBoundaryFallback = DefaultErrorBoundaryFallback,
  beforeErrorBoundaryCapture,
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
  onErrorBoundaryError,
  onErrorBoundaryMount,
  onErrorBoundaryReset,
  onErrorBoundaryUnmount,
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

  return (
    <ErrorBoundary
      beforeCapture={beforeErrorBoundaryCapture}
      dialogOptions={errorBoundaryDialogOptions}
      fallback={ErrorBoundaryFallback}
      onError={onErrorBoundaryError}
      onMount={onErrorBoundaryMount}
      onReset={onErrorBoundaryReset}
      onUnmount={onErrorBoundaryUnmount}
      showDialog={showErrorBoundaryDialog}
    >
      {children}
    </ErrorBoundary>
  );
}
