import type { CSSProperties, ReactElement } from 'react';

interface Props {
  readonly componentStack: string | null;
  readonly error: Readonly<Error>;
  readonly eventId: string | null;
  readonly resetError: () => void;
}

const STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
};

export default function DefaultErrorBoundaryFallback({
  error,
  resetError,
}: Props): ReactElement {
  return (
    <div style={STYLE}>
      <div>
        <strong>An error occurred while rendering the application:</strong>
        <p>{error.message}</p>
      </div>
      <button onClick={resetError}>Retry</button>
    </div>
  );
}
