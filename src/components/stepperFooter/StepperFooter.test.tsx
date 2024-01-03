import { render, fireEvent, screen } from '@testing-library/react';
import { StepperFooter, StepperFooterInterface } from './StepperFooter';

describe('StepperFooter', () => {
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
          submitHandler,
        },
        steps,
        currentTabIndex: 1,
      };

    render(<StepperFooter {...footerProps} />);

    const backButton = screen.getByText(/back to step 1/i);
    fireEvent.click(backButton);

    expect(previousStepHandler).toHaveBeenCalled();
  });
  it('renders correct class name when prevBtnClassName is set', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitHandler,
          prevBtnClassName: 'prev-button',
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
          submitHandler,
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
        submitHandler,
      },
      steps: newSteps,
      currentTabIndex: 0,
    };

    render(<StepperFooter {...footerProps} />);

    const nextButton = screen.getByText(/continue to step 2/i);
    fireEvent.click(nextButton);

    expect(nextStepHandler).toHaveBeenCalled();
  });
  it('renders correct class name when nextBtnClassName is set', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: false,
        nextStepHandler,
        footerData: {
          submitHandler,
          nextBtnClassName: 'next-button',
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
          submitHandler,
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
  it('invokes submitHandler when all steps are completed', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: false,
        previousStepHandler,
        isLastStep: true,
        nextStepHandler,
        footerData: {
          submitHandler,
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
  it('renders correct class name when submitBtnClassName is set', () => {
    const previousStepHandler = jest.fn(),
      nextStepHandler = jest.fn(),
      submitHandler = jest.fn(),
      footerProps: StepperFooterInterface = {
        isPrevBtn: true,
        previousStepHandler,
        isLastStep: true,
        nextStepHandler,
        footerData: {
          submitHandler,
          submitBtnClassName: 'submit-button',
        },
        steps,
        currentTabIndex: 2,
      };

    render(<StepperFooter {...footerProps} />);

    const prevButton = screen.getByText(/submit/i);

    expect(prevButton).toHaveClass('submit-button');
  });
});
