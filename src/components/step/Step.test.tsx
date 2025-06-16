import { render, fireEvent, screen } from '@testing-library/react';
import { expect } from 'storybook/test';
import { Step, StepInterface } from './Step';
import styles from '../stepper/Stepper.module.scss';

describe('Step', () => {
  it('renders correctly when isComplete is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: true,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const label = screen.getByText('First Step'),
      stepWrapper = screen.getByTestId('step-wrapper'),
      checkMark = screen.getByTestId('check-mark');
    fireEvent.click(label);
    expect(navigateToStepHandler).toHaveBeenCalledWith(stepProps.index);
    expect(stepWrapper).toHaveClass(styles['is-complete']);
    expect(checkMark).toBeInTheDocument();
  });

  it('renders correctly when isError is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: false,
        isWarning: false,
        isError: true,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const label = screen.getByText('First Step'),
      stepWrapper = screen.getByTestId('step-wrapper');

    fireEvent.click(label);
    expect(navigateToStepHandler).toHaveBeenCalledWith(stepProps.index);
    expect(stepWrapper).toHaveClass(styles['is-error']);
  });

  it('renders correctly when isWarning is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: false,
        isWarning: true,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');

    expect(stepWrapper).toHaveClass(styles['is-warning']);
  });

  it('renders correctly when isStepConnector is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');

    expect(stepWrapper).toHaveClass(styles['is-step-connector']);
  });

  it('renders correctly when isRightToLeftLanguage is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: true,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');

    expect(stepWrapper).toHaveClass(styles['is-right-to-left']);
  });

  it('renders correctly when custom pallet is set', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
        pallet: {
          default: '#627c90',
          warning: '#f1c40f',
          danger: '#e95a4b',
          success: '#4caf50',
          disabled: '#e3e8ec',
        },
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveStyle({
      '--default-background-color': stepProps.pallet?.default,
      '--warning-background-color': stepProps.pallet?.warning,
      '--danger-background-color': stepProps.pallet?.danger,
      '--success-background-color': stepProps.pallet?.success,
    });
  });

  it('applies has-custom-connector class when customConnector is provided', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div data-testid="my-custom-connector">Custom Connector</div>,
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        customConnector,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');

    expect(stepWrapper).toHaveClass(styles['has-custom-connector']);
  });

  it('applies is-disable-step-click class and prevents navigation when disableStepHeaderClick is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'First Step',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: true, // Step is complete, so normally clicking would work
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
        disableStepHeaderClick: true,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    const label = screen.getByText('First Step');
    const checkMark = screen.getByTestId('check-mark'); // The check mark SVG

    // Should apply the disable class
    expect(stepWrapper).toHaveClass(styles['is-disable-step-click']);

    // Clicking on label should not trigger navigation
    fireEvent.click(label);
    expect(navigateToStepHandler).not.toHaveBeenCalled();

    // Clicking on indicator should not trigger navigation
    fireEvent.click(checkMark);
    expect(navigateToStepHandler).not.toHaveBeenCalled();
  });

  it('applies is-disable-step-click class and prevents navigation when disableStepHeaderClick is true for error step', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Error Step',
        navigateToStepHandler,
        index: 1,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: true, // Step has error, so normally clicking would work
        isStepConnector: false,
        isRightToLeftLanguage: false,
        disableStepHeaderClick: true,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    const label = screen.getByText('Error Step');
    const indicator = screen.getByText('1'); // The indicator content

    // Should apply the disable class
    expect(stepWrapper).toHaveClass(styles['is-disable-step-click']);

    // Clicking on label should not trigger navigation
    fireEvent.click(label);
    expect(navigateToStepHandler).not.toHaveBeenCalled();

    // Clicking on indicator should not trigger navigation
    fireEvent.click(indicator);
    expect(navigateToStepHandler).not.toHaveBeenCalled();
  });

  it('keeps original indicator when isKeepIndicatorOnComplete is true and step is complete', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '✓',
        label: 'Completed Step',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: true,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
        isKeepIndicatorOnComplete: true,
      };

    render(<Step {...stepProps} />);

    const indicator = screen.getByText('✓');
    const stepWrapper = screen.getByTestId('step-wrapper');

    // Should show original indicator, not check mark
    expect(indicator).toBeInTheDocument();
    expect(screen.queryByTestId('check-mark')).not.toBeInTheDocument();
    expect(stepWrapper).toHaveClass(styles['is-complete']);
  });

  it('applies is-active class when isActive is true', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Active Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveClass(styles['is-active']);
  });

  it('does not apply is-active class when isActive is false', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Inactive Step',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).not.toHaveClass(styles['is-active']);
  });

  it('prevents navigation when step is neither complete nor error', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '2',
        label: 'Pending Step',
        navigateToStepHandler,
        index: 1,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const label = screen.getByText('Pending Step');
    const indicator = screen.getByText('2');

    // Clicking should not trigger navigation
    fireEvent.click(label);
    fireEvent.click(indicator);
    expect(navigateToStepHandler).not.toHaveBeenCalled();
  });

  it('sets flex-basis to auto when isVertical, isStepConnector, and customConnector are all true', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div>Custom Connector</div>,
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Vertical Step',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        isVertical: true,
        customConnector,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveStyle({ flexBasis: 'auto' });
  });

  it('sets flex-basis to 100% when isVertical is false', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div>Custom Connector</div>,
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Horizontal Step',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        isVertical: false,
        customConnector,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveStyle({ flexBasis: '100%' });
  });

  it('sets flex-basis to 100% when customConnector is not provided', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Step Without Custom Connector',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        isVertical: true,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveStyle({ flexBasis: '100%' });
  });

  it('handles default pallet values when no pallet is provided', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Step Without Pallet',
        navigateToStepHandler,
        index: 0,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveStyle({
      '--default-background-color': undefined,
      '--warning-background-color': undefined,
      '--danger-background-color': undefined,
      '--success-background-color': undefined,
      '--disabled-background-color': undefined,
    });
  });

  it('allows navigation by clicking indicator when step is complete', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Complete Step',
        navigateToStepHandler,
        index: 2,
        isActive: false,
        isComplete: true,
        isWarning: false,
        isError: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const checkMark = screen.getByTestId('check-mark');
    fireEvent.click(checkMark);
    expect(navigateToStepHandler).toHaveBeenCalledWith(2);
  });

  it('allows navigation by clicking indicator when step has error', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '!',
        label: 'Error Step',
        navigateToStepHandler,
        index: 3,
        isActive: false,
        isComplete: false,
        isWarning: false,
        isError: true,
        isStepConnector: false,
        isRightToLeftLanguage: false,
      };

    render(<Step {...stepProps} />);

    const indicator = screen.getByText('!');
    fireEvent.click(indicator);
    expect(navigateToStepHandler).toHaveBeenCalledWith(3);
  });

  it('applies multiple state classes correctly', () => {
    const navigateToStepHandler = jest.fn(),
      stepProps: StepInterface = {
        indicator: '1',
        label: 'Multi-State Step',
        navigateToStepHandler,
        index: 0,
        isActive: true,
        isComplete: true,
        isWarning: true,
        isError: false,
        isStepConnector: true,
        isRightToLeftLanguage: true,
        disableStepHeaderClick: true,
      };

    render(<Step {...stepProps} />);

    const stepWrapper = screen.getByTestId('step-wrapper');
    expect(stepWrapper).toHaveClass(styles['is-active']);
    expect(stepWrapper).toHaveClass(styles['is-complete']);
    expect(stepWrapper).toHaveClass(styles['is-warning']);
    expect(stepWrapper).toHaveClass(styles['is-step-connector']);
    expect(stepWrapper).toHaveClass(styles['is-right-to-left']);
    expect(stepWrapper).toHaveClass(styles['is-disable-step-click']);
  });
});
