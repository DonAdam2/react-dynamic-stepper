
[![Storybook][badge_storybook]][package_link]
[![Npm version][badge_npm-version]][package_link]
[![Npm downloads][badge_npm-downloads]][package_link]
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
            onClickHandler: () => console.log('clicked on second step next button'),
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
        submitHandler: submitStepper,
      }}
    />
  );
};
```

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Stepper props:

| Prop                         | Type                           | Default | Required | Description                                                                                          |
|------------------------------|--------------------------------|---------| ---       |------------------------------------------------------------------------------------------------------|
| isRightToLeftLanguage        | Boolean                        | `false` | No | If true, sets the direction of the stepper to **rtl**                                                |
| isVertical                   | Boolean                        | `false` | No | If true, sets the orientation of the stepper to vertical                                             |
| isInline                     | Boolean                        | `false` | No | If true, sets the header display of the stepper to inline                                            |
| isSequenceStepper            | Boolean                        | `false` | No | If true, sets the stepper to sequence mode (forces the user to complete steps in sequence)           |
| isStepConnector              | Boolean                        | `true`  | No | If false, removes the step connector                                                                 |
| [ref](#features-and-methods) | `useRef<NavigateToStepHandler>`                        | `null`  | No | It exposes `navigateToStep` function, that can programmatically navigate the user to a specific step |
| steps                        | [StepInterface[]](#StepInterface) | -       | Yes | Array of steps                                                                                       |
| footerData                   | [FooterDataInterface[]](#FooterDataInterface)            | -       | Yes | Footer data                                                                                          |
| pallet                       | [PalletInterface[]](#PalletInterface)                | -       | No | Pallet for custom color codes                                                                        |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### StepInterface:

| Prop | Type                                            | Default     | Required | Description                                                                |
| ---  |-------------------------------------------------|-------------| ---       |----------------------------------------------------------------------------|
| header.label | String                                          | -           | Yes | The label to display on the step header                                    |
| header.indicator | ReactNode                                       | Step number | No | Custom indicator for the step                                              |
| content | ReactNode                                       | -           | Yes | The content to display for the step                                        |
| onClickHandler | Function: `() => void` or `() => Promise<void>` | -           | No | Invoked when the next button of the current step is clicked                |
| isLoading | Boolean                                         | `false`     | No | If true, the 'Next' button will be disabled                                |
| isError | Boolean                                         | `false`     | No | If true, will display the step with error UI                               |
| isWarning | Boolean                                         | `false`     | No | If true, will display the step with warning UI                             |
| isComplete | Boolean                                         | `false`     | Yes | If true, will display the step with completed UI and enables 'Next' button |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### FooterDataInterface:

| Prop | Type | Default                        | Required | Description                                                          |
| ---  | ---  |--------------------------------|---       |----------------------------------------------------------------------|
| prevBtnLabel | String | `Back to ${prevStepLabel}`     | No  | Label for the prev button                                            |
| prevBtnClassName | String | `undefined`                    | No | CSS classname(s) to be applied to prev button                        |
| nextBtnLabel | String | `Continue to ${nextStepLabel}` | No  | Label for the next button                                            |
| nextBtnClassName | String | `undefined`                    | No | CSS classname(s) to be applied to next button                        |
| submitBtnLabel | String | `Submit`                       | No | Label for submit button in the last step                             |
| submitBtnClassName | String | `undefined`                    | No | CSS classname(s) to be applied to the submit button in the last step |
| submitHandler | Function: `() => void` or `() => Promise<void>` | -                              | Yes  | Invoked when the submit button is clicked                            |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### PalletInterface:

| Prop | Type | Default | Required | Description               |
| ---  | ---  | ---     | ---      | ---                       |
| default | String | `#627c90` | Yes | Default color code       |
| warning | String | `#f1c40f` | Yes | Color code for warning UI |
| danger | String | `#e95a4b` | Yes | Color code for error UI   |
| success | String | `#4caf50` | Yes | Color code for success UI |

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

## Features and Methods

### Navigate to step programmatically:

The **ref** passed to the Stepper component exposes a **navigateToStep** function, that can programmatically navigate the user to a specific step. It can be useful in scenarios when controlling step navigation from outside the Stepper component is required.

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

  return (
    <>
      <button
        onClick={() => {
          stepperRef.current?.navigateToStep(1);
        }}
      >
        Navigate to step 2 programmatically
      </button>
      <Stepper
        ref={stepperRef}
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
import { Stepper, NavigateToStepHandler } from 'react-dynamic-stepper';

const App = () => {
  const stepperRef = useRef<NavigateToStepHandler>(null);

  return (
    <>
      <button
        onClick={() => {
          stepperRef.current?.navigateToStep(1);
        }}
      >
        Navigate to step 2 programmatically
      </button>
      <Stepper
        ref={stepperRef}
        /* OTHER PROPS */
      />
    </>
  );
};
```
</details>

<p dir="rtl"><a href="#table-of-contents">Back to top</a></p>

### Invoke a function on Next button click of current step

- `step.onClickHandler` => This is invoked when the 'Next' button of the current step is clicked.
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
[badge_npm-cicd]: https://github.com/DonAdam2/react-dynamic-stepper/actions/workflows/publish.yml/badge.svg
[badge_storybook]: https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg
[package_link]: https://npmjs.org/package/react-dynamic-stepper
[package_demo-link]: https://codepen.io/AdamMorsi/pen/qBRazPM