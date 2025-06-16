import { ReactNode, useState, useCallback, useImperativeHandle, Fragment, forwardRef } from 'react';
import { StepperHead } from '../stepperHead/StepperHead';
import { StepperFooter } from '../stepperFooter/StepperFooter';
import styles from './Stepper.module.scss';

export interface FooterDataInterface {
  prevBtnLabel?: string;
  prevBtnClassName?: string;
  nextBtnLabel?: string;
  nextBtnClassName?: string;
  submitBtnLabel?: string;
  submitBtnClassName?: string;
  submitHandler: () => void | Promise<void>;
}

export interface PalletInterface {
  default: string;
  warning: string;
  danger: string;
  success: string;
  disabled: string;
}

export interface StepInterface {
  header: {
    label: string;
    indicator?: ReactNode;
    isKeepIndicatorOnComplete?: boolean;
  };
  footer?: {
    nextButtonLabel?: string;
    prevButtonLabel?: string;
    isPreventNextClick?: boolean;
    onClickHandler?: () => void | Promise<void>;
  };
  content: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isWarning?: boolean;
  isComplete: boolean;
}

export interface StepperInterface {
  isRightToLeftLanguage?: boolean;
  isVertical?: boolean;
  isInline?: boolean;
  isSequenceStepper?: boolean;
  isStepConnector?: boolean;
  disableStepHeaderClick?: boolean;
  steps: StepInterface[];
  footerData: FooterDataInterface;
  pallet?: PalletInterface;
  customConnector?: ReactNode;
}

export type StepperRef = {
  navigateToStepByIndex: (index: number) => void;
};

export const Stepper = forwardRef<StepperRef, StepperInterface>(
  (
    {
      isRightToLeftLanguage = false,
      isVertical = false,
      isInline = false,
      isSequenceStepper = false,
      isStepConnector = true,
      disableStepHeaderClick,
      steps,
      footerData,
      customConnector,
      pallet = {
        default: '#627c90',
        warning: '#f1c40f',
        danger: '#e95a4b',
        success: '#4caf50',
        disabled: '#e3e8ec',
      },
    },
    ref
  ) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0),
      isLastStep = currentTabIndex === steps.length - 1,
      isPrevBtn = currentTabIndex !== 0;

    const navigateToStepHandler = useCallback(
      (index: number) => {
        if (index !== currentTabIndex) {
          setCurrentTabIndex(index);
        }
      },
      [currentTabIndex]
    );

    const nextStepHandler = () => {
      if (!steps[currentTabIndex].footer?.isPreventNextClick) {
        setCurrentTabIndex((prev) => {
          if (prev !== steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }
    };

    const previousStepHandler = () => {
      setCurrentTabIndex((prev) => prev - 1);
    };

    useImperativeHandle(
      ref,
      () => ({
        navigateToStepByIndex: navigateToStepHandler,
      }),
      [navigateToStepHandler]
    );

    return (
      <div
        data-testid="stepper-wrapper"
        className={styles['stepper-wrapper']}
        dir={isRightToLeftLanguage ? 'rtl' : 'ltr'}
      >
        <div
          className={`${styles['stepper-head-body-wrapper']} ${
            isVertical ? styles['stepper-head-body-wrapper-vertical'] : ''
          }`}
        >
          <StepperHead
            steps={steps}
            navigateToStepHandler={navigateToStepHandler}
            isVertical={isVertical}
            isInline={isInline}
            currentTabIndex={currentTabIndex}
            isRightToLeftLanguage={isRightToLeftLanguage}
            isSequenceStepper={isSequenceStepper}
            pallet={pallet}
            isStepConnector={isStepConnector}
            disableStepHeaderClick={disableStepHeaderClick}
            customConnector={customConnector}
          />
          <div className={styles['stepper-body']}>
            {steps.map((el, i) => (
              <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
            ))}
          </div>
        </div>
        <StepperFooter
          isPrevBtn={isPrevBtn}
          previousStepHandler={previousStepHandler}
          isLastStep={isLastStep}
          nextStepHandler={nextStepHandler}
          footerData={footerData}
          steps={steps}
          currentTabIndex={currentTabIndex}
          successColor={pallet.success}
        />
      </div>
    );
  }
);
