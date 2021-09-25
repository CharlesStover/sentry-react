import type { ReactElement } from 'react';

interface Props {
  readonly componentStack: string | null;
  readonly error: Readonly<Error>;
  readonly eventId: string | null;
  readonly resetError: () => void;
}

export default function DefaultErrorBoundaryFallback({
  error,
  resetError,
}: Props): ReactElement {
  return (
    <>
      <strong>An error occurred while rendering the application:</strong>
      <span>{error.message}</span> <button onClick={resetError}>Retry</button>
    </>
  );
}
