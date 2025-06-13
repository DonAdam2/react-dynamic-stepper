import { Meta, StoryObj } from '@storybook/react-vite';
import { NavigateToStepHandler, Stepper, StepperInterface } from './Stepper';
import { RefAttributes, useRef, useState } from 'react';
import { action } from 'storybook/actions';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Stepper> = {
  component: Stepper,
};

export default meta;
type Story = StoryObj<typeof Stepper>;

function RenderStepper(props: StepperInterface & RefAttributes<NavigateToStepHandler>) {
  const [acceptFirstTerms, setAcceptFirstTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
      checked: false,
      touched: false,
    }),
    [isWarning, setIsWarning] = useState(false),
    [isSecondStepLoading, setIsSecondStepLoading] = useState(false),
    stepperRef = useRef<NavigateToStepHandler>(null);

  const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const isWarningHandler = () => {
    setIsWarning((prev) => !prev);
  };

  //for demo purposes only
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const secondStepAsyncFunc = async () => {
    //it can be an API call
    setIsSecondStepLoading(true);
    await timeout(3000);
    setIsSecondStepLoading(false);
    console.log('second step clicked');
  };

  const steps = [
    {
      header: {
        label: 'Step 1',
      },
      content: (
        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={acceptFirstTerms.checked}
              onChange={firstTermsHandler}
            />{' '}
            Accept first terms and conditions
          </label>
          <label style={{ display: 'block' }}>
            <input type="checkbox" checked={isWarning} onChange={isWarningHandler} /> Is warning
          </label>
        </div>
      ),
      isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
      isWarning: isWarning,
      isComplete: acceptFirstTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptSecondTerms.checked}
              onChange={secondTermsHandler}
            />{' '}
            Accept second terms and conditions
          </label>
        </div>
      ),
      footer: {
        onClickHandler: () => secondStepAsyncFunc(),
      },
      isLoading: isSecondStepLoading,
      isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
      isComplete: acceptSecondTerms.checked,
    },
    {
      header: {
        label: 'Step 3',
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptThirdTerms.checked}
              onChange={thirdTermsHandler}
            />{' '}
            Accept third terms and conditions
          </label>
        </div>
      ),
      isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
      isComplete: acceptThirdTerms.checked,
    },
  ];

  return (
    <>
      <button
        style={{
          color: '#ffffff',
          backgroundColor: '#1976d2',
          padding: '6px 16px',
          fontSize: '0.875rem',
          border: 'none',
          outline: 'none',
          borderRadius: 4,
          marginInlineStart: 10,
        }}
        onClick={() => {
          stepperRef.current?.navigateToStep(1);
        }}
      >
        Navigate to step 2 programmatically
      </button>
      <Stepper {...props} ref={stepperRef} steps={steps} />
    </>
  );
}

function PreventNextClickStepper(props: StepperInterface & RefAttributes<NavigateToStepHandler>) {
  const [acceptFirstTerms, setAcceptFirstTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
      checked: false,
      touched: false,
    }),
    [isPreventNextClick, setIsPreventNextClick] = useState(true),
    [isWarning, setIsWarning] = useState(false),
    [isSecondStepLoading, setIsSecondStepLoading] = useState(false);

  const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const isWarningHandler = () => {
    setIsWarning((prev) => !prev);
  };

  //for demo purposes only
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const secondStepAsyncFunc = async () => {
    //it can be an API call
    setIsSecondStepLoading(true);
    await timeout(3000);
    setIsSecondStepLoading(false);
    console.log('second step clicked');
  };

  const steps = [
    {
      header: {
        label: 'Step 1',
      },
      footer: {
        isPreventNextClick,
      },
      content: (
        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={acceptFirstTerms.checked}
              onChange={firstTermsHandler}
            />{' '}
            Accept first terms and conditions
          </label>
          <label style={{ display: 'block' }}>
            <input type="checkbox" checked={isWarning} onChange={isWarningHandler} /> Is warning
          </label>
          <button
            style={{
              color: '#ffffff',
              backgroundColor: '#1976d2',
              padding: '6px 16px',
              fontSize: '0.875rem',
              border: 'none',
              outline: 'none',
              borderRadius: 4,
              marginTop: 15,
              marginInlineEnd: 15,
            }}
            onClick={() => {
              setIsPreventNextClick((prev) => !prev);
            }}
          >
            Toggle isPreventNextClick
          </button>
          <span style={{ color: isPreventNextClick ? 'red' : 'green' }}>
            {isPreventNextClick ? 'You cant go to the next step' : 'You can you to the next step'}
          </span>
        </div>
      ),
      isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
      isWarning: isWarning,
      isComplete: acceptFirstTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptSecondTerms.checked}
              onChange={secondTermsHandler}
            />{' '}
            Accept second terms and conditions
          </label>
        </div>
      ),
      footer: {
        onClickHandler: () => secondStepAsyncFunc(),
      },
      isLoading: isSecondStepLoading,
      isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
      isComplete: acceptSecondTerms.checked,
    },
    {
      header: {
        label: 'Step 3',
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptThirdTerms.checked}
              onChange={thirdTermsHandler}
            />{' '}
            Accept third terms and conditions
          </label>
        </div>
      ),
      isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
      isComplete: acceptThirdTerms.checked,
    },
  ];

  return <Stepper {...props} steps={steps} />;
}

function StepperWithCustomStepsFooter(
  props: StepperInterface & RefAttributes<NavigateToStepHandler>
) {
  const [acceptFirstTerms, setAcceptFirstTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
      checked: false,
      touched: false,
    }),
    [isWarning, setIsWarning] = useState(false),
    [isSecondStepLoading, setIsSecondStepLoading] = useState(false),
    stepperRef = useRef<NavigateToStepHandler>(null);

  const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const isWarningHandler = () => {
    setIsWarning((prev) => !prev);
  };

  //for demo purposes only
  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const secondStepAsyncFunc = async () => {
    //it can be an API call
    setIsSecondStepLoading(true);
    await timeout(3000);
    setIsSecondStepLoading(false);
    console.log('second step clicked');
  };

  const steps = [
    {
      header: {
        label: 'Step 1',
      },
      footer: {
        nextButtonLabel: 'Go to step 2',
      },
      content: (
        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={acceptFirstTerms.checked}
              onChange={firstTermsHandler}
            />{' '}
            Accept first terms and conditions
          </label>
          <label style={{ display: 'block' }}>
            <input type="checkbox" checked={isWarning} onChange={isWarningHandler} /> Is warning
          </label>
        </div>
      ),
      isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
      isWarning: isWarning,
      isComplete: acceptFirstTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
      },
      footer: {
        nextButtonLabel: 'Go to step 3',
        prevButtonLabel: 'Go to step 1',
        onClickHandler: () => secondStepAsyncFunc(),
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptSecondTerms.checked}
              onChange={secondTermsHandler}
            />{' '}
            Accept second terms and conditions
          </label>
        </div>
      ),
      isLoading: isSecondStepLoading,
      isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
      isComplete: acceptSecondTerms.checked,
    },
    {
      header: {
        label: 'Step 3',
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptThirdTerms.checked}
              onChange={thirdTermsHandler}
            />{' '}
            Accept third terms and conditions
          </label>
        </div>
      ),
      isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
      isComplete: acceptThirdTerms.checked,
    },
  ];

  return (
    <>
      <button
        style={{
          color: '#ffffff',
          backgroundColor: '#1976d2',
          padding: '6px 16px',
          fontSize: '0.875rem',
          border: 'none',
          outline: 'none',
          borderRadius: 4,
          marginInlineStart: 10,
        }}
        onClick={() => {
          stepperRef.current?.navigateToStep(1);
        }}
      >
        Navigate to step 2 programmatically
      </button>
      <Stepper {...props} ref={stepperRef} steps={steps} />
    </>
  );
}

const AddDocumentsIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SignersIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2.354C10.5374 1.7447 11.2477 1.31351 12.0362 1.11779C12.8247 0.922079 13.6542 0.971124 14.4142 1.2584C15.1741 1.54568 15.8286 2.05757 16.2905 2.72596C16.7524 3.39435 16.9998 4.18754 16.9998 5C16.9998 5.81246 16.7524 6.60565 16.2905 7.27404C15.8286 7.94243 15.1741 8.45432 14.4142 8.7416C13.6542 9.02888 12.8247 9.07792 12.0362 8.88221C11.2477 8.68649 10.5374 8.2553 10 7.646M13 19H1V18C1 16.4087 1.63214 14.8826 2.75736 13.7574C3.88258 12.6321 5.4087 12 7 12C8.5913 12 10.1174 12.6321 11.2426 13.7574C12.3679 14.8826 13 16.4087 13 18V19ZM13 19H19V18C19.0001 16.9467 18.723 15.9119 18.1965 14.9997C17.6699 14.0875 16.9125 13.3299 16.0004 12.8032C15.0882 12.2765 14.0535 11.9992 13.0002 11.9992C11.9469 11.9991 10.9122 12.2764 10 12.803M11 5C11 6.06087 10.5786 7.07828 9.82843 7.82843C9.07828 8.57857 8.06087 9 7 9C5.93913 9 4.92172 8.57857 4.17157 7.82843C3.42143 7.07828 3 6.06087 3 5C3 3.93913 3.42143 2.92172 4.17157 2.17157C4.92172 1.42143 5.93913 1 7 1C8.06087 1 9.07828 1.42143 9.82843 2.17157C10.5786 2.92172 11 3.93913 11 5Z"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PrepareDocumentsIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.00016H3C2.46957 3.00016 1.96086 3.21088 1.58579 3.58595C1.21071 3.96102 1 4.46973 1 5.00016V16.0002C1 16.5306 1.21071 17.0393 1.58579 17.4144C1.96086 17.7894 2.46957 18.0002 3 18.0002H14C14.5304 18.0002 15.0391 17.7894 15.4142 17.4144C15.7893 17.0393 16 16.5306 16 16.0002V11.0002M14.586 1.58616C14.7705 1.39514 14.9912 1.24278 15.2352 1.13796C15.4792 1.03314 15.7416 0.977969 16.0072 0.975661C16.2728 0.973354 16.5361 1.02396 16.7819 1.12452C17.0277 1.22508 17.251 1.37359 17.4388 1.56137C17.6266 1.74916 17.7751 1.97246 17.8756 2.21825C17.9762 2.46405 18.0268 2.72741 18.0245 2.99296C18.0222 3.25852 17.967 3.52096 17.8622 3.76497C17.7574 4.00898 17.605 4.22967 17.414 4.41416L8.828 13.0002H6V10.1722L14.586 1.58616Z"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function StepperWithIcons(props: StepperInterface & RefAttributes<NavigateToStepHandler>) {
  const [acceptFirstTerms, setAcceptFirstTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
      checked: false,
      touched: false,
    });

  const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const stepsWithIcons = [
    {
      header: {
        label: 'Step 1',
        indicator: <AddDocumentsIcon />,
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptFirstTerms.checked}
              onChange={firstTermsHandler}
            />{' '}
            Accept first terms and conditions
          </label>
        </div>
      ),
      isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
      isComplete: acceptFirstTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
        indicator: <SignersIcon />,
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptSecondTerms.checked}
              onChange={secondTermsHandler}
            />{' '}
            Accept second terms and conditions
          </label>
        </div>
      ),
      isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
      isComplete: acceptSecondTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
        indicator: <PrepareDocumentsIcon />,
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptThirdTerms.checked}
              onChange={thirdTermsHandler}
            />{' '}
            Accept third terms and conditions
          </label>
        </div>
      ),
      isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
      isComplete: acceptThirdTerms.checked,
    },
  ];

  return <Stepper {...props} steps={stepsWithIcons} />;
}

function StepperWithIconsAndNoCheckIconOnComplete(
  props: StepperInterface & RefAttributes<NavigateToStepHandler>
) {
  const [acceptFirstTerms, setAcceptFirstTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
      checked: false,
      touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
      checked: false,
      touched: false,
    });

  const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
  };

  const stepsWithIcons = [
    {
      header: {
        label: 'Step 1',
        indicator: <AddDocumentsIcon />,
        isKeepIndicatorOnComplete: true,
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptFirstTerms.checked}
              onChange={firstTermsHandler}
            />{' '}
            Accept first terms and conditions
          </label>
        </div>
      ),
      isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
      isComplete: acceptFirstTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
        indicator: <SignersIcon />,
        isKeepIndicatorOnComplete: true,
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptSecondTerms.checked}
              onChange={secondTermsHandler}
            />{' '}
            Accept second terms and conditions
          </label>
        </div>
      ),
      isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
      isComplete: acceptSecondTerms.checked,
    },
    {
      header: {
        label: 'Step 2',
        indicator: <PrepareDocumentsIcon />,
        isKeepIndicatorOnComplete: true,
      },
      content: (
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptThirdTerms.checked}
              onChange={thirdTermsHandler}
            />{' '}
            Accept third terms and conditions
          </label>
        </div>
      ),
      isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
      isComplete: acceptThirdTerms.checked,
    },
  ];

  return <Stepper {...props} steps={stepsWithIcons} />;
}

export const Sequence: Story = {
  args: {
    isSequenceStepper: true,
    footerData: {
      submitHandler: action('Sequence stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};

export const Default: Story = {
  args: {
    footerData: {
      submitHandler: action('Default stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};

export const Inline: Story = {
  args: {
    isInline: true,
    footerData: {
      submitHandler: action('Inline stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};

export const Vertical: Story = {
  args: {
    isVertical: true,
    footerData: {
      submitHandler: action('Vertical stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};

export const PreventNextClick: Story = {
  args: {
    footerData: {
      submitHandler: action('Prevent next step click stepper submitted'),
    },
  },
  render: (args) => <PreventNextClickStepper {...args} />,
};

export const NoConnector: Story = {
  args: {
    isStepConnector: false,
    footerData: {
      submitHandler: action('No connector stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};

export const WithIcons: Story = {
  args: {
    footerData: {
      submitHandler: action('With icons stepper submitted'),
    },
  },
  render: (args) => <StepperWithIcons {...args} />,
};

export const WithIconsAndNoCheckIconOnComplete: Story = {
  args: {
    footerData: {
      submitHandler: action('With icons stepper submitted'),
    },
  },
  render: (args) => <StepperWithIconsAndNoCheckIconOnComplete {...args} />,
};

export const CustomPallet: Story = {
  args: {
    pallet: {
      default: '#0191B4',
      warning: '#D6D000',
      danger: '#FE7A15',
      success: '#55741A',
      disabled: '#bdbdbd',
    },
    footerData: {
      submitHandler: action('Custom pallet stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};

export const CustomStepFooter: Story = {
  args: {
    footerData: {
      submitHandler: action('With icons stepper submitted'),
    },
  },
  render: (args) => <StepperWithCustomStepsFooter {...args} />,
};

export const CustomFooter: Story = {
  args: {
    footerData: {
      prevBtnLabel: 'Prev',
      prevBtnClassName: 'prev-button',
      nextBtnLabel: 'Next',
      nextBtnClassName: 'next-button',
      submitBtnLabel: 'Send',
      submitBtnClassName: 'submit-button',
      submitHandler: action('Custom footer stepper submitted'),
    },
  },
  render: (args) => <RenderStepper {...args} />,
};
