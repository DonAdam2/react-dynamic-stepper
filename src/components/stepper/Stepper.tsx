import { ReactNode, useState, useCallback, useImperativeHandle, Fragment, forwardRef } from 'react';
import { StepperHead } from '../stepperHead/StepperHead';
import { StepperFooter } from '../stepperFooter/StepperFooter';
import styles from './Stepper.module.scss';

export interface FooterDataInterface {
  prevBtn?: {
    label?: string;
    className?: string;
  };
  nextBtn?: {
    label?: string;
    className?: string;
  };
  submitBtn: {
    label?: string;
    className?: string;
    onClickHandler: () => void | Promise<void>;
  };
}

export interface PalletInterface {
  default: string;
  warning: string;
  danger: string;
  success: string;
  disabled: string;
}

export interface StepInterface {
  id?: string;
  header: {
    label: string;
    indicator?: ReactNode;
    isKeepIndicatorOnComplete?: boolean;
  };
  footer?: {
    prevBtn?: {
      label?: string;
      className?: string;
    };
    nextBtn?: {
      label?: string;
      className?: string;
      //prevent the next button click even if the step is completed
      isPreventNextClick?: boolean;
      onClickHandler?: () => void | Promise<void>;
    };
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
  navigateToStepById: (id: string) => void;
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

    const navigateToStepByIndexHandler = useCallback(
      (index: number) => {
        if (index !== currentTabIndex) {
          setCurrentTabIndex(index);
        }
      },
      [currentTabIndex]
    );

    const navigateToStepByIdHandler = useCallback(
      (id: string) => {
        const stepIndex = steps.findIndex((step) => step.id === id);
        if (stepIndex !== -1) {
          navigateToStepByIndexHandler(stepIndex);
        }
      },
      [steps, navigateToStepByIndexHandler]
    );

    const nextStepHandler = () => {
      if (!steps[currentTabIndex].footer?.nextBtn?.isPreventNextClick) {
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
        navigateToStepByIndex: navigateToStepByIndexHandler,
        navigateToStepById: navigateToStepByIdHandler,
      }),
      [navigateToStepByIndexHandler, navigateToStepByIdHandler]
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
            navigateToStepHandler={navigateToStepByIndexHandler}
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

Stepper.displayName = 'Stepper';
