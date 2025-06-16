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
});
