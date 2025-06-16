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
});
