[![Storybook][badge_storybook]][package_link]
[![Npm version][badge_npm-version]][package_link]
[![Npm downloads][badge_npm-downloads]][package_link]
[![Npm minified][badge_npm-minified]][package_link]
[![Npm CICD][badge_npm-cicd]][package_link]

# Table of Contents:
- [Overview](#overview)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Stepper props](#stepper-props)
- [Features and Methods](#features-and-methods)
- [Resources](#resources)

## Overview:

Advanced and multi-feature stepper component designed to be incredibly versatile for a variety of workflows and use cases.

It supports the following:
- Horizontal stepper UI.
- Vertical stepper UI.
- Inline stepper UI.
- Sequence stepper.
- Right to left languages.
- Custom pallet.
- Custom header.
- Custom footer.
- Navigate to the required step programmatically.

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Demo:

Checkout the demo of this package on [codepen][package_demo-link]

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Installation:

- Via npm:
```shell
npm install react-dynamic-stepper
```
- Via yarn:
```shell
yarn add react-dynamic-stepper
```
- Via pnpm:
```shell
pnpm add react-dynamic-stepper
```

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Usage:

```jsx
import { Stepper } from 'react-dynamic-stepper';

const App = () => {
  const steps = [
          {
            header: {
              label: 'Step 1',
            },
            content: <div>First step content</div>,
            isError: false,
            isWarning: false,
            isComplete: true,
          },
          {
            header: {
              label: 'Step 2',
            },
            content: <div>Second step content</div>,
            footer: {
              nextBtn: {
                onClickHandler: () => console.log('clicked on second step next button'),
              },
            },
            isLoading: false,
            isError: false,
            isComplete: true,
          },
          {
            header: {
              label: 'Step 3',
            },
            content: <div>Third step content</div>,
            isError: false,
            isComplete: true,
          },
        ];

  const submitStepper = () => {
    console.log('submitted');
  };

  return (
    <Stepper
      steps={steps}
      footerData={{
        submitBtn: {
          onClickHandler: submitStepper,
        },
      }}
    />
  );
};
```

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Stepper props:

| Prop                         | Type                           | Default | Required | Description                                                                                                                           |
|------------------------------|--------------------------------|---------| ---       |---------------------------------------------------------------------------------------------------------------------------------------|
| isRightToLeftLanguage        | Boolean                        | `false` | No | If true, sets the direction of the stepper to **rtl**                                                                                 |
| isVertical                   | Boolean                        | `false` | No | If true, sets the orientation of the stepper to vertical                                                                              |
| isInline                     | Boolean                        | `false` | No | If true, sets the header display of the stepper to inline                                                                             |
| isSequenceStepper            | Boolean                        | `false` | No | If true, sets the stepper to sequence mode (forces the user to complete steps in sequence)                                            |
| isStepConnector              | Boolean                        | `true`  | No | If false, removes the step connector                                                                                                  |
| customConnector              | ReactNode                      | `null`  | No | Custom connector element to display between steps (only shows when isStepConnector is true)                                           |
| disableStepHeaderClick       | Boolean                        | `false` | No | If true, disables clicking on step headers (indicator and label) to navigate directly to completed or error steps                     |
| [ref](#features-and-methods) | `useRef<StepperRef>`                        | `null`  | No | It exposes `navigateToStepByIndex` and `navigateToStepById` functions, that can programmatically navigate the user to a specific step |
| steps                        | [StepInterface[]](#StepInterface) | -       | Yes | Array of steps                                                                                                                        |
| footerData                   | [FooterDataInterface[]](#FooterDataInterface)            | -       | Yes | Footer data                                                                                                                           |
| pallet                       | [PalletInterface[]](#PalletInterface)                | -       | No | Pallet for custom color codes                                                                                                         |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### StepInterface:

| Prop                                       | Type                                            | Default                                    | Required | Description                                                                                                              |
|--------------------------------------------|-------------------------------------------------|--------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------|
 | id                                         | String                                          | -                                          | No       | Unique identifier for the step (required when using navigateToStepById)                                                 |
| header.label                               | String                                          | -                                          | Yes      | The label to display on the step header                                                                                  |
| header.indicator                           | ReactNode                                       | Step number                                | No       | Custom indicator for the step                                                                                            |
| header.isKeepIndicatorOnComplete | Boolean                | `false`                                    | No       | Keep header indicator when step is completed                                                                             |
| footer.nextBtn.label                       | String                                     | `Continue to ${nextStepLabel}` or `Submit` | No | Set next button label of the current step                                                                                |
| footer.nextBtn.className                   | String                                     | `undefined` | No | CSS classname(s) to be applied to next button of the current step                                                                                |
| footer.nextBtn.isPreventNextClick          | Boolean                                 | `false` | No | If true, clicking the 'Next' or 'Submit' button for the current step will not trigger any action unless its set to false |
| footer.nextBtn.onClickHandler              | Function: `() => void` or `() => Promise<void>` | -                                          | No       | Invoked when the next button of the current step is clicked                                                              |
| footer.prevBtn.label                       | String                                     | `Back to ${prevStepLabel}` | No | Set prev button label of the current step                                                                                |
| footer.prevBtn.className                   | String                                     | `undefined` | No | CSS classname(s) to be applied to prev button of the current step                                                                                |
| content                                    | ReactNode                                       | -                                          | Yes      | The content to display for the step                                                                                      |
| isLoading                                  | Boolean                                         | `false`                                    | No       | If true, the 'Next' button will be disabled                                                                              |
| isError                                    | Boolean                                         | `false`                                    | No       | If true, will display the step with error UI                                                                             |
| isWarning                                  | Boolean                                         | `false`                                    | No       | If true, will display the step with warning UI                                                                           |
| isComplete                                 | Boolean                                         | `false`                                    | Yes      | If true, will display the step with completed UI and enables 'Next' button                                               |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### FooterDataInterface:

| Prop | Type | Default                        | Required | Description                                                          |
| ---  | ---  |--------------------------------|---       |----------------------------------------------------------------------|
| prevBtn.label | String | `Back to ${prevStepLabel}`     | No  | Label for the prev button                                            |
| prevBtn.className | String | `undefined`                    | No | CSS classname(s) to be applied to prev button                        |
| nextBtn.label | String | `Continue to ${nextStepLabel}` | No  | Label for the next button                                            |
| nextBtn.className | String | `undefined`                    | No | CSS classname(s) to be applied to next button                        |
| submitBtn.label | String | `Submit`                       | No | Label for submit button in the last step                             |
| submitBtn.className | String | `undefined`                    | No | CSS classname(s) to be applied to the submit button in the last step |
| submitBtn.onClickHandler | Function: `() => void` or `() => Promise<void>` | -                              | Yes  | Invoked when the submit button is clicked                            |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### PalletInterface:

| Prop     | Type | Default | Required | Description                |
|----------| ---  | ---     | ---      |----------------------------|
| default  | String | `#627c90` | Yes | Default color code         |
| warning  | String | `#f1c40f` | Yes | Color code for warning UI  |
| danger   | String | `#e95a4b` | Yes | Color code for error UI    |
| success  | String | `#4caf50` | Yes | Color code for success UI  |
| disabled | String | `#e3e8ec` | Yes | Color code for disabled UI |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Features and Methods

### Navigate to step programmatically:

The **ref** passed to the Stepper component exposes two navigation functions that can programmatically navigate the user to a specific step. It can be useful in scenarios when controlling step navigation from outside the Stepper component is required.

- **navigateToStepByIndex(index: number)**: Navigate to a step using its zero-based index position
- **navigateToStepById(id: string)**: Navigate to a step using its unique identifier (requires the step to have an `id` property)

> ### ***Important Note***:
>
> Make sure to mark the required steps as **completed** if you want to **navigate programmatically** so that you can submit your stepper. This ensures that all necessary steps have been taken before the finish line.

<details>
<summary>JavaScript</summary>

```jsx
import { useRef } from 'react';
import { Stepper } from 'react-dynamic-stepper';

const App = () => {
  const stepperRef = useRef(null);

  const steps = [
    {
      id: 'step-1',
      header: { label: 'Step 1' },
      content: <div>First step content</div>,
      isComplete: true,
    },
    {
      id: 'step-2', 
      header: { label: 'Step 2' },
      content: <div>Second step content</div>,
      isComplete: true,
    },
    // ... more steps
  ];

  return (
    <>
      <button
        onClick={() => {
          stepperRef.current?.navigateToStepByIndex(1);
        }}
      >
        Navigate to step 2 by index
      </button>
      <button
        onClick={() => {
          stepperRef.current?.navigateToStepById('step-2');
        }}
      >
        Navigate to step 2 by ID
      </button>
      <Stepper
        ref={stepperRef}
        steps={steps}
        /* OTHER PROPS */
      />
    </>
  );
};
```
</details>
<details>
<summary>TypeScript</summary>

```typescript jsx
import { useRef } from 'react';
import { Stepper, StepperRef, StepInterface } from 'react-dynamic-stepper';

const App = () => {
  const stepperRef = useRef<StepperRef>(null);

  const steps: StepInterface[] = [
    {
      id: 'step-1',
      header: { label: 'Step 1' },
      content: <div>First step content</div>,
      isComplete: true,
    },
    {
      id: 'step-2', 
      header: { label: 'Step 2' },
      content: <div>Second step content</div>,
      isComplete: true,
    },
    // ... more steps
  ];

  return (
    <>
      <button
        onClick={() => {
          stepperRef.current?.navigateToStepByIndex(1);
        }}
      >
        Navigate to step 2 by index
      </button>
      <button
        onClick={() => {
          stepperRef.current?.navigateToStepById('step-2');
        }}
      >
        Navigate to step 2 by ID
      </button>
      <Stepper
        ref={stepperRef}
        steps={steps}
        /* OTHER PROPS */
      />
    </>
  );
};
```
</details>

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### Invoke a function on Next button click of current step

- `step.footer.nextBtn.onClickHandler` => This is invoked when the 'Next' button of the current step is clicked.
- If your `onClickHandler` returns a Promise and you want to navigate to the next step only if the Promise resolves successfully, you need to `throw error` inside the **catch** block:
```typescript
const submitCurrentStep = async () => {
    try {
      /* Your business logic here */
    } catch (error) {
      throw error;
    } finally {
      /* Cleanup code here */
    }
  };
```

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Resources

- [Changelog][changelog]

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

[changelog]: https://github.com/DonAdam2/react-dynamic-stepper/blob/main/CHANGELOG.md
[badge_npm-version]: https://img.shields.io/npm/v/react-dynamic-stepper.svg
[badge_npm-downloads]: https://img.shields.io/npm/dm/react-dynamic-stepper.svg
[badge_npm-minified]: https://img.shields.io/bundlejs/size/react-dynamic-stepper
[badge_npm-cicd]: https://github.com/DonAdam2/react-dynamic-stepper/actions/workflows/publish.yml/badge.svg
[badge_storybook]: https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg
[package_link]: https://npmjs.org/package/react-dynamic-stepper
[package_demo-link]: https://codepen.io/AdamMorsi/pen/qBRazPM