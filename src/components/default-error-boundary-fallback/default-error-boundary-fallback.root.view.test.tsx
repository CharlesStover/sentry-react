import { render } from '@testing-library/react';
import DefaultErrorBoundaryFallback from '.';

describe('DefaultErrorBoundaryFallback', (): void => {
  it('should render the error message', (): void => {
    const { getByText } = render(
      <DefaultErrorBoundaryFallback
        componentStack={null}
        error={new Error('test message')}
        eventId={null}
        resetError={jest.fn()}
      />,
    );
    getByText('test message');
  });

  it('should call resetError', (): void => {
    const TEST_RESET_ERROR = jest.fn();
    const { getByText } = render(
      <DefaultErrorBoundaryFallback
        componentStack={null}
        error={new Error('test message')}
        eventId={null}
        resetError={TEST_RESET_ERROR}
      />,
    );
    expect(TEST_RESET_ERROR).not.toHaveBeenCalled();
    getByText('Retry').click();
    expect(TEST_RESET_ERROR).toHaveBeenCalledTimes(1);
  });
});
