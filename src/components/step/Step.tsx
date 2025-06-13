import { CSSProperties, FC, ReactNode } from 'react';
import { PalletInterface } from '../stepper';
import styles from '../stepper/Stepper.module.scss';

export interface StepInterface {
  isKeepIndicatorOnComplete?: boolean;
  indicator: ReactNode;
  label: string;
  navigateToStepHandler: (index: number) => void;
  index: number;
  isActive: boolean;
  isComplete: boolean;
  isWarning?: boolean;
  isError?: boolean;
  isStepConnector: boolean;
  isRightToLeftLanguage: boolean;
  pallet?: PalletInterface;
  disableStepHeaderClick?: boolean;
}

export const Step: FC<StepInterface> = ({
  isKeepIndicatorOnComplete = false,
  indicator,
  label,
  navigateToStepHandler,
  index,
  isActive,
  isComplete,
  isWarning,
  isError,
  isStepConnector,
  isRightToLeftLanguage,
  pallet,
  disableStepHeaderClick,
}) => {
  const classes = [styles['stepper-step']];

  if (isActive) {
    classes.push(styles['is-active']);
  }
  if (isComplete) {
    classes.push(styles['is-complete']);
  }
  if (isWarning) {
    classes.push(styles['is-warning']);
  }
  if (isError) {
    classes.push(styles['is-error']);
  }
  if (isRightToLeftLanguage) {
    classes.push(styles['is-right-to-left']);
  }
  if (isStepConnector) {
    classes.push(styles['is-step-connector']);
  }
  if (disableStepHeaderClick) {
    classes.push(styles['is-disable-step-click']);
  }

  return (
    <div
      data-testid="step-wrapper"
      className={classes.join(' ')}
      style={
        {
          '--default-background-color': pallet?.default,
          '--warning-background-color': pallet?.warning,
          '--danger-background-color': pallet?.danger,
          '--success-background-color': pallet?.success,
          '--disabled-background-color': pallet?.disabled,
        } as CSSProperties
      }
    >
      <div className={styles['stepper-indicator']}>
        <span
          className={styles['stepper-indicator-info']}
          onClick={
            (isComplete || isError) && !disableStepHeaderClick
              ? () => navigateToStepHandler(index)
              : undefined
          }
        >
          {!isKeepIndicatorOnComplete && isComplete ? (
            <svg
              className={styles['stepper-tick']}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 490 490"
              data-testid="check-mark"
            >
              <path d="M452.253 28.326L197.831 394.674 29.044 256.875 0 292.469l207.253 169.205L490 54.528z" />
            </svg>
          ) : (
            indicator
          )}
        </span>
      </div>
      <div
        className={styles['stepper-label']}
        onClick={
          (isComplete || isError) && !disableStepHeaderClick
            ? () => navigateToStepHandler(index)
            : undefined
        }
      >
        {label}
      </div>
    </div>
  );
};
