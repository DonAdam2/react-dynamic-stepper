import { CSSProperties, FC } from 'react';
import { FooterDataInterface, StepInterface } from '../stepper';
import styles from '../stepper/Stepper.module.scss';

export interface StepperFooterInterface {
  isPrevBtn: boolean;
  previousStepHandler: () => void;
  isLastStep: boolean;
  nextStepHandler: () => void;
  footerData: FooterDataInterface;
  steps: StepInterface[];
  currentTabIndex: number;
  successColor?: string;
}

export const StepperFooter: FC<StepperFooterInterface> = ({
  isPrevBtn,
  previousStepHandler,
  isLastStep,
  nextStepHandler,
  footerData,
  steps,
  currentTabIndex,
  successColor,
}) => {
  const classes = [styles['stepper-footer-btn']];

  if (isLastStep) {
    classes.push(styles['success']);
  } else {
    classes.push(styles['primary']);
  }

  const submitCurrentStep = async () => {
    await steps[currentTabIndex].onClickHandler?.();
    nextStepHandler();
  };

  const submitHandler = async () => {
    await footerData.submitHandler();
  };

  return (
    <div
      className={styles['stepper-footer']}
      style={{ justifyContent: isPrevBtn ? 'space-between' : 'flex-end' }}
    >
      {isPrevBtn && (
        <button
          className={`${
            footerData.prevBtnClassName ? footerData.prevBtnClassName : styles['stepper-footer-btn']
          }`}
          onClick={previousStepHandler}
        >
          {footerData.prevBtnLabel ?? `Back to ${steps[currentTabIndex - 1].header.label}`}
        </button>
      )}
      <button
        className={`${
          !isLastStep && footerData.nextBtnClassName
            ? footerData.nextBtnClassName
            : isLastStep && footerData.submitBtnClassName
              ? footerData.submitBtnClassName
              : classes.join(' ')
        }`}
        onClick={
          isLastStep
            ? submitHandler
            : steps[currentTabIndex].onClickHandler
              ? submitCurrentStep
              : nextStepHandler
        }
        disabled={
          (isLastStep ? steps.some((el) => !el.isComplete) : !steps[currentTabIndex].isComplete) ||
          steps[currentTabIndex].isLoading
        }
        style={{ '--success-background-color': successColor } as CSSProperties}
      >
        {isLastStep
          ? footerData.submitBtnLabel ?? 'Submit'
          : footerData.nextBtnLabel ?? `Continue to ${steps[currentTabIndex + 1].header.label}`}
      </button>
    </div>
  );
};
