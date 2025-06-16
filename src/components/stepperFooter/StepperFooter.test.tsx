import { render, fireEvent, screen } from '@testing-library/react';
import { StepperFooter, StepperFooterInterface } from './StepperFooter';
import { StepInterface } from '../stepper';

describe('StepperFooter', () => {
  const steps: StepInterface[] = [
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
  it('invokes the previousStepHandler when the previous button is clicked', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 1,
      };

    render(<StepperFooter {...footerProps} />);

    const backButton = screen.getByText(/back to step 1/i);
    fireEvent.click(backButton);

    expect(previousStepHandler).toHaveBeenCalled();
  });
  it('renders correct class name when prevBtn className is set', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          prevBtn: {
            className: 'prev-button',
          },
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 1,
      };

    render(<StepperFooter {...footerProps} />);

    const prevButton = screen.getByText(/back to step 1/i);

    expect(prevButton).toHaveClass('prev-button');
  });
  it("disables the next button when the current tab is not completed and it's not the last step", () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 0,
      };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    fireEvent.click(nextButton);

    expect(nextStepHandler).not.toHaveBeenCalled();
    expect(nextButton).toBeDisabled();
  });
  it("invokes the nextStepHandler when the step is completed and it's not the last step", () => {
    const newSteps = [...steps],
      previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn();

    newSteps[0].isComplete = true;

    const footerProps: StepperFooterInterface = {
      isPrevBtn: false,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: newSteps,
      currentTabIndex: 0,
    };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    fireEvent.click(nextButton);

    expect(nextStepHandler).toHaveBeenCalled();
  });
  it('renders correct class name when nextBtn className is set', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          nextBtn: {
            className: 'next-button',
          },
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 0,
      };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);

    expect(nextButton).toHaveClass('next-button');
  });
  it('disables the submit button when the stepper is not completed', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: true,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 2,
      };

    render(<StepperFooter {...footerProps} />);

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    expect(submitHandler).not.toHaveBeenCalled();
    expect(submitButton).toBeDisabled();
  });
  it('invokes submitButton onClickHandler when all steps are completed', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: true,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps: steps.map((el) => ({ ...el, isComplete: true })),
        currentTabIndex: 2,
      };

    render(<StepperFooter {...footerProps} />);

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    expect(submitHandler).toHaveBeenCalled();
    expect(submitButton).toBeEnabled();
  });
  it('renders correct class name when submitBtn className is set', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: true,
        nextStepHandler,
        footerData: {
          submitBtn: {
            className: 'submit-button',
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 2,
      };

    render(<StepperFooter {...footerProps} />);

    const submitButton = screen.getByText(/submit/i);

    expect(submitButton).toHaveClass('submit-button');
  });

  it('applies success color as CSS custom property when provided', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps: steps.map((el) => ({ ...el, isComplete: true })),
        currentTabIndex: 0,
        successColor: '#00ff00',
      };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    expect(nextButton).toHaveStyle('--success-background-color: #00ff00');
  });

  it('disables button when current step is loading', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      loadingSteps = [...steps];

    loadingSteps[0] = { ...loadingSteps[0], isComplete: true, isLoading: true };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: false,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: loadingSteps,
      currentTabIndex: 0,
    };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    expect(nextButton).toBeDisabled();
  });

  it('invokes step-level next button handler when provided', async () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      stepNextHandler = jest.fn().mockResolvedValue(undefined),
      stepsWithHandler = [...steps];

    stepsWithHandler[0] = {
      ...stepsWithHandler[0],
      isComplete: true,
      footer: {
        nextBtn: {
          onClickHandler: stepNextHandler,
        },
      },
    };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: false,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: stepsWithHandler,
      currentTabIndex: 0,
    };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    fireEvent.click(nextButton);

    // Wait for async operations to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(stepNextHandler).toHaveBeenCalled();
    expect(nextStepHandler).toHaveBeenCalled();
  });

  it('does not invoke handlers when isPreventNextClick is true for step-level handler', async () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      stepNextHandler = jest.fn(),
      stepsWithHandler = [...steps];

    stepsWithHandler[0] = {
      ...stepsWithHandler[0],
      isComplete: true,
      footer: {
        nextBtn: {
          onClickHandler: stepNextHandler,
          isPreventNextClick: true,
        },
      },
    };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: false,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: stepsWithHandler,
      currentTabIndex: 0,
    };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    fireEvent.click(nextButton);

    expect(stepNextHandler).not.toHaveBeenCalled();
    expect(nextStepHandler).not.toHaveBeenCalled();
  });

  it('does not invoke submit handler when isPreventNextClick is true', async () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      stepsWithHandler = [...steps];

    stepsWithHandler[2] = {
      ...stepsWithHandler[2],
      footer: {
        nextBtn: {
          isPreventNextClick: true,
        },
      },
    };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: false,
      previousStepHandler,
      isLastStep: true,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: stepsWithHandler.map((el) => ({ ...el, isComplete: true })),
      currentTabIndex: 2,
    };

    render(<StepperFooter {...footerProps} />);

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    expect(submitHandler).not.toHaveBeenCalled();
  });

  it('renders custom previous button label from footerData', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          prevBtn: {
            label: 'Go Back',
          },
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps,
        currentTabIndex: 1,
      };

    render(<StepperFooter {...footerProps} />);

    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('renders custom next button label from footerData', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          nextBtn: {
            label: 'Proceed',
          },
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps: steps.map((el) => ({ ...el, isComplete: true })),
        currentTabIndex: 0,
      };

    render(<StepperFooter {...footerProps} />);

    expect(screen.getByText('Proceed')).toBeInTheDocument();
  });

  it('renders custom submit button label from footerData', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: true,
        nextStepHandler,
        footerData: {
          submitBtn: {
            label: 'Finish',
            onClickHandler: submitHandler,
          },
        },
        steps: steps.map((el) => ({ ...el, isComplete: true })),
        currentTabIndex: 2,
      };

    render(<StepperFooter {...footerProps} />);

    expect(screen.getByText('Finish')).toBeInTheDocument();
  });

  it('renders step-level custom previous button label', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      stepsWithLabel = [...steps];

    stepsWithLabel[1] = {
      ...stepsWithLabel[1],
      footer: {
        prevBtn: {
          label: 'Previous Step',
        },
      },
    };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: true,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: stepsWithLabel,
      currentTabIndex: 1,
    };

    render(<StepperFooter {...footerProps} />);

    expect(screen.getByText('Previous Step')).toBeInTheDocument();
  });

  it('renders step-level custom next button label', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      stepsWithLabel = [...steps];

    stepsWithLabel[0] = {
      ...stepsWithLabel[0],
      isComplete: true,
      footer: {
        nextBtn: {
          label: 'Next Step',
        },
      },
    };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: false,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: stepsWithLabel,
      currentTabIndex: 0,
    };

    render(<StepperFooter {...footerProps} />);

    expect(screen.getByText('Next Step')).toBeInTheDocument();
  });

  it('renders footer container with space-between justification when isPrevBtn is true', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps: steps.map((el) => ({ ...el, isComplete: true })),
        currentTabIndex: 1,
      };

    const { container } = render(<StepperFooter {...footerProps} />);
    const footerDiv = container.firstChild as HTMLElement;

    expect(footerDiv).toHaveStyle('justify-content: space-between');
  });

  it('renders footer container with flex-end justification when isPrevBtn is false', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitBtn: {
            onClickHandler: submitHandler,
          },
        },
        steps: steps.map((el) => ({ ...el, isComplete: true })),
        currentTabIndex: 0,
      };

    const { container } = render(<StepperFooter {...footerProps} />);
    const footerDiv = container.firstChild as HTMLElement;

    expect(footerDiv).toHaveStyle('justify-content: flex-end');
  });

  it('prioritizes footerData labels over step-level labels', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      stepsWithLabel = [...steps];

    stepsWithLabel[1] = {
      ...stepsWithLabel[1],
      footer: {
        prevBtn: {
          label: 'Step Previous',
        },
      },
    };

    const footerProps: StepperFooterInterface = {
      isPrevBtn: true,
      previousStepHandler,
      isLastStep: false,
      nextStepHandler,
      footerData: {
        prevBtn: {
          label: 'Footer Previous',
        },
        submitBtn: {
          onClickHandler: submitHandler,
        },
      },
      steps: stepsWithLabel,
      currentTabIndex: 1,
    };

    render(<StepperFooter {...footerProps} />);

    expect(screen.getByText('Footer Previous')).toBeInTheDocument();
    expect(screen.queryByText('Step Previous')).not.toBeInTheDocument();
  });
});
