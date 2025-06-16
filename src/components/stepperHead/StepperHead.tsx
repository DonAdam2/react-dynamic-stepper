import { PalletInterface, StepInterface } from '../stepper';
import { FC, Fragment, ReactNode } from 'react';
import { ConditionalWrapper } from '../conditionalWrapper/ConditionalWrapper';
import styles from '../stepper/Stepper.module.scss';
import { Step } from '../step/Step';

export interface StepperHeadInterface {
  steps: StepInterface[];
  navigateToStepHandler: (index: number) => void;
  isVertical: boolean;
  isInline: boolean;
  isSequenceStepper: boolean;
  isStepConnector: boolean;
  isRightToLeftLanguage: boolean;
  currentTabIndex: number;
  pallet?: PalletInterface;
  disableStepHeaderClick?: boolean;
  customConnector?: ReactNode;
}

export const StepperHead: FC<StepperHeadInterface> = ({
  steps,
  navigateToStepHandler,
  isVertical,
  isInline,
  isSequenceStepper,
  isStepConnector,
  isRightToLeftLanguage,
  currentTabIndex,
  pallet,
  disableStepHeaderClick,
  customConnector,
}) => {
  const classes = [styles['stepper-head']];

  if (isVertical) {
    classes.push(styles['vertical-stepper-head']);
  }
  if (isInline) {
    classes.push(styles['inline-stepper-head']);
  }

  return (
    <div className={classes.join(' ')} data-testid="stepper-head-wrapper">
      <ConditionalWrapper
        initialWrapper={(children: any) => <>{children}</>}
        condition={isVertical}
        wrapper={(children: any) => (
          <div className={styles['inner-vertical-head-wrapper']}>{children}</div>
        )}
      >
        {steps.map((el, i) => (
          <Fragment key={i}>
            <Step
              index={i}
              navigateToStepHandler={navigateToStepHandler}
              isActive={i === currentTabIndex}
              isKeepIndicatorOnComplete={el.header.isKeepIndicatorOnComplete}
              isComplete={isSequenceStepper ? el.isComplete && i <= currentTabIndex : el.isComplete}
              isWarning={el.isWarning}
              isError={el.isError}
              isRightToLeftLanguage={isRightToLeftLanguage}
              indicator={el.header.indicator ? el.header.indicator : i + 1}
              label={el.header.label}
              pallet={pallet}
              isStepConnector={isStepConnector}
              disableStepHeaderClick={disableStepHeaderClick}
              customConnector={customConnector}
              isVertical={isVertical}
            />
            {customConnector && isStepConnector && i < steps.length - 1 && (
              <div
                className={`${styles['custom-connector-wrapper']} ${
                  isVertical ? styles['vertical-connector'] : styles['inline-connector']
                }`}
                data-testid="custom-connector"
              >
                {customConnector}
              </div>
            )}
          </Fragment>
        ))}
      </ConditionalWrapper>
    </div>
  );
};
