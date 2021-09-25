import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { FallbackRenderParams } from '../..';
import Sentry from '../..';

describe('Sentry', (): void => {
  it('should render children', (): void => {
    const { getByText } = render(
      <Sentry errorBoundaryDialogOptions={{}} showErrorBoundaryDialog>
        Hello world
      </Sentry>,
    );
    getByText('Hello world');
  });

  describe('error boundary', (): void => {
    // Disable console.error, because the thrown error is expected to be logged.
    const consoleError = console.error;
    beforeEach((): void => {
      console.error = jest.fn();
    });

    afterEach((): void => {
      console.error = consoleError;
    });

    it('should support a custom error boundary fallback', (): void => {
      function CustomErrorBoundaryFallback({
        error,
      }: FallbackRenderParams): ReactElement {
        return <>{error.message}</>;
      }

      function ThrowError(): ReactElement {
        throw new Error('test error message');
      }

      const { getByText } = render(
        <Sentry ErrorBoundaryFallback={CustomErrorBoundaryFallback}>
          <ThrowError />
        </Sentry>,
      );
      getByText('test error message');
    });
  });
});
