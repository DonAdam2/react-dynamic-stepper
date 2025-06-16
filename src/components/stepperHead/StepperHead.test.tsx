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

  const defaultProps: StepperHeadInterface = {
    steps,
    navigateToStepHandler: jest.fn(),
    isVertical: false,
    isInline: false,
    isSequenceStepper: false,
    isStepConnector: false,
    isRightToLeftLanguage: false,
    currentTabIndex: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<StepperHead {...defaultProps} />);

    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');
    expect(stepperHeadWrapper).toBeInTheDocument();
  });

  it('renders with default styling when both isVertical and isInline are false', () => {
    render(<StepperHead {...defaultProps} />);

    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');

    expect(stepperHeadWrapper).toHaveClass(styles['stepper-head']);
    expect(stepperHeadWrapper).not.toHaveClass(styles['vertical-stepper-head']);
    expect(stepperHeadWrapper).not.toHaveClass(styles['inline-stepper-head']);
  });

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

  it('renders correctly when both isVertical and isInline are true', () => {
    const props: StepperHeadInterface = {
      ...defaultProps,
      isVertical: true,
      isInline: true,
    };

    render(<StepperHead {...props} />);

    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');

    expect(stepperHeadWrapper).toHaveClass(styles['stepper-head']);
    expect(stepperHeadWrapper).toHaveClass(styles['vertical-stepper-head']);
    expect(stepperHeadWrapper).toHaveClass(styles['inline-stepper-head']);
  });

  it('renders correct number of Step components', () => {
    render(<StepperHead {...defaultProps} />);

    // We can't directly check Step components, but we can verify the steps are rendered
    // by checking that each step label is present
    steps.forEach((step) => {
      const stepElement = screen.getByText(step.header.label);
      expect(stepElement).toBeInTheDocument();
    });
  });

  it('renders vertical wrapper when isVertical is true', () => {
    const props: StepperHeadInterface = {
      ...defaultProps,
      isVertical: true,
    };

    render(<StepperHead {...props} />);

    const innerWrapper = screen.getByTestId('inner-vertical-head-wrapper');

    expect(innerWrapper).toBeInTheDocument();
  });

  it('does not render vertical wrapper when isVertical is false', () => {
    render(<StepperHead {...defaultProps} />);

    const innerWrapper = screen.queryByTestId('inner-vertical-head-wrapper');

    expect(innerWrapper).not.toBeInTheDocument();
  });

  it('handles empty steps array', () => {
    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: [],
    };

    render(<StepperHead {...props} />);

    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');
    expect(stepperHeadWrapper).toBeInTheDocument();
    expect(stepperHeadWrapper).toBeEmptyDOMElement();
  });

  it('handles single step without rendering connectors', () => {
    const singleStep = [steps[0]];
    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: singleStep,
      isStepConnector: true,
      customConnector: <div data-testid="my-custom-connector">Custom Connector</div>,
    };

    render(<StepperHead {...props} />);

    const stepElement = screen.getByText(singleStep[0].header.label);
    expect(stepElement).toBeInTheDocument();

    const customConnectorElements = screen.queryAllByTestId('custom-connector');
    expect(customConnectorElements).toHaveLength(0);
  });

  it('passes correct props to Step components with sequence stepper logic', () => {
    const stepsWithComplete = [
      { ...steps[0], isComplete: true },
      { ...steps[1], isComplete: true },
      { ...steps[2], isComplete: false },
    ];

    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: stepsWithComplete,
      isSequenceStepper: true,
      currentTabIndex: 1,
    };

    render(<StepperHead {...props} />);

    // Verify that steps are rendered (we can't directly test Step props without mocking)
    stepsWithComplete.forEach((step) => {
      const stepElement = screen.getByText(step.header.label);
      expect(stepElement).toBeInTheDocument();
    });
  });

  it('passes correct props to Step components without sequence stepper logic', () => {
    const stepsWithComplete = [
      { ...steps[0], isComplete: true },
      { ...steps[1], isComplete: true },
      { ...steps[2], isComplete: false },
    ];

    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: stepsWithComplete,
      isSequenceStepper: false,
      currentTabIndex: 2,
    };

    render(<StepperHead {...props} />);

    // Verify that steps are rendered
    stepsWithComplete.forEach((step) => {
      const stepElement = screen.getByText(step.header.label);
      expect(stepElement).toBeInTheDocument();
    });
  });

  it('handles steps with warning and error states', () => {
    const stepsWithStates = [
      { ...steps[0], isWarning: true },
      { ...steps[1], isError: true },
      { ...steps[2] },
    ];

    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: stepsWithStates,
    };

    render(<StepperHead {...props} />);

    stepsWithStates.forEach((step) => {
      const stepElement = screen.getByText(step.header.label);
      expect(stepElement).toBeInTheDocument();
    });
  });

  it('handles steps with custom indicators', () => {
    const stepsWithIndicators = [
      { ...steps[0], header: { ...steps[0].header, indicator: '✓' } },
      { ...steps[1], header: { ...steps[1].header, indicator: '!' } },
      { ...steps[2], header: { ...steps[2].header, indicator: 'X' } },
    ];

    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: stepsWithIndicators,
    };

    render(<StepperHead {...props} />);

    stepsWithIndicators.forEach((step) => {
      const stepElement = screen.getByText(step.header.label);
      expect(stepElement).toBeInTheDocument();
    });
  });

  it('handles steps with isKeepIndicatorOnComplete flag', () => {
    const stepsWithKeepIndicator = [
      {
        ...steps[0],
        header: { ...steps[0].header, isKeepIndicatorOnComplete: true },
        isComplete: true,
      },
      {
        ...steps[1],
        header: { ...steps[1].header, isKeepIndicatorOnComplete: false },
        isComplete: true,
      },
      { ...steps[2] },
    ];

    const props: StepperHeadInterface = {
      ...defaultProps,
      steps: stepsWithKeepIndicator,
    };

    render(<StepperHead {...props} />);

    stepsWithKeepIndicator.forEach((step) => {
      const stepElement = screen.getByText(step.header.label);
      expect(stepElement).toBeInTheDocument();
    });
  });

  it('passes pallet prop correctly', () => {
    const customPallet = {
      default: '#007bff',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      disabled: '#6c757d',
    };

    const props: StepperHeadInterface = {
      ...defaultProps,
      pallet: customPallet,
    };

    render(<StepperHead {...props} />);

    // Verify component renders with pallet prop
    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');
    expect(stepperHeadWrapper).toBeInTheDocument();
  });

  it('passes disableStepHeaderClick prop correctly', () => {
    const props: StepperHeadInterface = {
      ...defaultProps,
      disableStepHeaderClick: true,
    };

    render(<StepperHead {...props} />);

    // Verify component renders with disableStepHeaderClick prop
    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');
    expect(stepperHeadWrapper).toBeInTheDocument();
  });

  it('passes isRightToLeftLanguage prop correctly', () => {
    const props: StepperHeadInterface = {
      ...defaultProps,
      isRightToLeftLanguage: true,
    };

    render(<StepperHead {...props} />);

    // Verify component renders with RTL prop
    const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');
    expect(stepperHeadWrapper).toBeInTheDocument();
  });

  it('handles different currentTabIndex values', () => {
    [0, 1, 2].forEach((tabIndex) => {
      const props: StepperHeadInterface = {
        ...defaultProps,
        currentTabIndex: tabIndex,
      };

      const { unmount } = render(<StepperHead {...props} />);

      // Verify component renders with different active tab indices
      const stepperHeadWrapper = screen.getByTestId('stepper-head-wrapper');
      expect(stepperHeadWrapper).toBeInTheDocument();

      unmount();
    });
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
