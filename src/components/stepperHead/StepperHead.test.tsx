import { render, screen } from '@testing-library/react';
import { StepperHead, StepperHeadInterface } from './StepperHead';
import { expect } from '@storybook/test';
import styles from '../stepper/Stepper.module.scss';

describe('StepperHead', () => {
  const steps = [
    {
      header: {
        label: 'Step 1',
      },
      content: <div>step 1 content</div>,
      isComplete: false,
    },
    {
      header: {
        label: 'Step 2',
      },
      content: <div>step 2 content</div>,
      onClickHandler: jest.fn(),
      isComplete: false,
    },
    {
      header: {
        label: 'Step 3',
      },
      content: <div>step 3 content</div>,
      isComplete: false,
    },
  ];
  it('renders correctly when isVertical is true', () => {
    const navigateToStepHandler = jest.fn(),
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: true,
        isInline: false,
        isSequenceStepper: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
      };

    render(<StepperHead {...props} />);

    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');

    expect(stepperHeadWrapper).toHaveClass(styles['vertical-stepper-head']);
  });

  it('renders correctly when isInline is true', () => {
    const navigateToStepHandler = jest.fn(),
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: false,
        isInline: true,
        isSequenceStepper: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
      };

    render(<StepperHead {...props} />);

    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');

    expect(stepperHeadWrapper).toHaveClass(styles['inline-stepper-head']);
  });
});
