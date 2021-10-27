import type { BrowserOptions, ReportDialogOptions } from '@sentry/react';
import { ErrorBoundary } from '@sentry/react';
import type { Integration, Scope, User } from '@sentry/types';
import type { ReactElement, ReactNode } from 'react';
import DefaultErrorBoundaryFallback from '../../components/default-error-boundary-fallback';
import type FallbackRenderParams from '../../types/fallback-render-params';
import useSentry from './sentry.root.hook';

interface Props extends Omit<BrowserOptions, 'integrations'> {
  readonly children: ReactNode;
  readonly errorBoundaryDialogOptions?: ReportDialogOptions | undefined;
  readonly onErrorBoundaryMount?: VoidFunction | undefined;
  readonly showErrorBoundaryDialog?: boolean | undefined;
  readonly user?: User | undefined;
  readonly ErrorBoundaryFallback?:
    | ((props: FallbackRenderParams) => ReactElement)
    | undefined;
  readonly beforeErrorBoundaryCapture?:
    | ((
        scope: Readonly<Scope>,
        error: Readonly<Error> | null,
        componentStack: string | null,
      ) => void)
    | undefined;
  readonly integrations?:
    | readonly Integration[]
    | ((
        integrations: readonly Readonly<Integration>[],
      ) => readonly Integration[])
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
}

export default function Sentry({
  ErrorBoundaryFallback = DefaultErrorBoundaryFallback,
  beforeErrorBoundaryCapture,
  children,
  errorBoundaryDialogOptions,
  onErrorBoundaryError,
  onErrorBoundaryMount,
  onErrorBoundaryReset,
  onErrorBoundaryUnmount,
  showErrorBoundaryDialog,
  user,
  ...browserOptions
}: Readonly<Props>): ReactElement {
  useSentry({
    user,
    ...browserOptions,
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
