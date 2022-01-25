import { render } from '@testing-library/react';
import DefaultErrorBoundaryFallback from '.';

const ONCE = 1;

describe('DefaultErrorBoundaryFallback', (): void => {
  it('should render the error message', (): void => {
    const { getByText } = render(
      <DefaultErrorBoundaryFallback
        error={new Error('test message')}
        resetError={jest.fn()}
      />,
    );
    getByText('test message');
  });

  it('should call resetError', (): void => {
    const TEST_RESET_ERROR = jest.fn();
    const { getByText } = render(
      <DefaultErrorBoundaryFallback
        error={new Error('test message')}
        resetError={TEST_RESET_ERROR}
      />,
    );
    expect(TEST_RESET_ERROR).not.toHaveBeenCalled();
    getByText('Retry').click();
    expect(TEST_RESET_ERROR).toHaveBeenCalledTimes(ONCE);
  });
});
