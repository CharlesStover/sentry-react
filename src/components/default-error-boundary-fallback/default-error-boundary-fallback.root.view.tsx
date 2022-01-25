import type { CSSProperties, ReactElement } from 'react';

interface Props {
  readonly error: Readonly<Error>;
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
      <button onClick={resetError} type="button">
        Retry
      </button>
    </div>
  );
}
