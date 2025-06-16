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
    if (!steps[currentTabIndex].footer?.isPreventNextClick) {
      try {
        await steps[currentTabIndex].footer?.onClickHandler?.();
        nextStepHandler();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  const submitHandler = async () => {
    if (!steps[currentTabIndex].footer?.isPreventNextClick) {
      try {
        await footerData.submitBtn.onClickHandler();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };

  return (
    <div
      className={styles['stepper-footer']}
      style={{ justifyContent: isPrevBtn ? 'space-between' : 'flex-end' }}
    >
      {isPrevBtn && (
        <button
          className={`${footerData?.prevBtn?.className ?? styles['stepper-footer-btn']}`}
          onClick={previousStepHandler}
        >
          {footerData?.prevBtn?.label ??
            steps[currentTabIndex]?.footer?.prevButtonLabel ??
            `Back to ${steps[currentTabIndex - 1].header.label}`}
        </button>
      )}
      <button
        className={`${
          !isLastStep && footerData?.nextBtn?.className
            ? footerData.nextBtn.className
            : isLastStep && footerData?.submitBtn?.className
              ? footerData.submitBtn.className
              : classes.join(' ')
        }`}
        onClick={
          isLastStep
            ? submitHandler
            : steps[currentTabIndex].footer?.onClickHandler
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
          ? (footerData?.submitBtn?.label ?? 'Submit')
          : (footerData?.nextBtn?.label ??
            steps[currentTabIndex]?.footer?.nextButtonLabel ??
            `Continue to ${steps[currentTabIndex + 1].header.label}`)}
      </button>
    </div>
  );
};
