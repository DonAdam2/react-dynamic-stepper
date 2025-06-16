import { render, screen } from '@testing-library/react';
import { StepperHead, StepperHeadInterface } from './StepperHead';
import { expect } from 'storybook/test';
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

  it('renders custom connector when customConnector is provided and isStepConnector is true', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div data-testid="my-custom-connector">Custom Connector</div>,
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: false,
        isInline: false,
        isSequenceStepper: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
        customConnector,
      };

    render(<StepperHead {...props} />);

    const customConnectorElements = screen.getAllByTestId('custom-connector'),
      myCustomConnectors = screen.getAllByTestId('my-custom-connector');

    // Should render custom connectors between steps (steps.length - 1)
    expect(customConnectorElements).toHaveLength(steps.length - 1);
    expect(myCustomConnectors).toHaveLength(steps.length - 1);
  });

  it('does not render custom connector when isStepConnector is false', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div data-testid="my-custom-connector">Custom Connector</div>,
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: false,
        isInline: false,
        isSequenceStepper: false,
        isStepConnector: false,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
        customConnector,
      };

    render(<StepperHead {...props} />);

    const customConnectorElements = screen.queryAllByTestId('custom-connector');

    expect(customConnectorElements).toHaveLength(0);
  });

  it('does not render custom connector when customConnector is not provided', () => {
    const navigateToStepHandler = jest.fn(),
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: false,
        isInline: false,
        isSequenceStepper: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
      };

    render(<StepperHead {...props} />);

    const customConnectorElements = screen.queryAllByTestId('custom-connector');

    expect(customConnectorElements).toHaveLength(0);
  });

  it('applies correct CSS classes for vertical custom connector', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div data-testid="my-custom-connector">Custom Connector</div>,
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: true,
        isInline: false,
        isSequenceStepper: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
        customConnector,
      };

    render(<StepperHead {...props} />);

    const customConnectorElements = screen.getAllByTestId('custom-connector');

    customConnectorElements.forEach((element) => {
      expect(element).toHaveClass(styles['custom-connector-wrapper']);
      expect(element).toHaveClass(styles['vertical-connector']);
      expect(element).not.toHaveClass(styles['inline-connector']);
    });
  });

  it('applies correct CSS classes for inline custom connector', () => {
    const navigateToStepHandler = jest.fn(),
      customConnector = <div data-testid="my-custom-connector">Custom Connector</div>,
      props: StepperHeadInterface = {
        steps,
        navigateToStepHandler,
        isVertical: false,
        isInline: false,
        isSequenceStepper: false,
        isStepConnector: true,
        isRightToLeftLanguage: false,
        currentTabIndex: 0,
        customConnector,
      };

    render(<StepperHead {...props} />);

    const customConnectorElements = screen.getAllByTestId('custom-connector');

    customConnectorElements.forEach((element) => {
      expect(element).toHaveClass(styles['custom-connector-wrapper']);
      expect(element).toHaveClass(styles['inline-connector']);
      expect(element).not.toHaveClass(styles['vertical-connector']);
    });
  });
});
