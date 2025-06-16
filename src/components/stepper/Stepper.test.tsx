import { Stepper } from './Stepper';
import { render, screen } from '@testing-library/react';
import { expect } from 'storybook/test';

describe('Stepper', () => {
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
  it('sets the direction to rtl if isRightToLeftLanguage is true', () => {
    render(
      <Stepper
        steps={steps}
        footerData={{
          submitBtn: {
            onClickHandler: () => console.log('submitted'),
          },
        }}
        isRightToLeftLanguage
      />
    );
    const stepperWrapper = screen.getByTestId('stepper-wrapper');

    expect(stepperWrapper).toHaveAttribute('dir', 'rtl');
  });
});
