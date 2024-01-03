import { render } from '@testing-library/react';
import { ConditionalWrapper } from './ConditionalWrapper';

describe('ConditionalWrapper', () => {
  it('renders children with the initialWrapper if condition is false', () => {
    const initialWrapper = jest.fn().mockImplementation((child) => <div>{child}</div>),
      wrapper = jest.fn().mockImplementation((child) => <span>{child}</span>),
      children = <p>sample child</p>;

    render(
      <ConditionalWrapper initialWrapper={initialWrapper} condition={false} wrapper={wrapper}>
        {children}
      </ConditionalWrapper>
    );

    expect(initialWrapper).toHaveBeenCalledWith(children);
    expect(wrapper).not.toHaveBeenCalled();
  });

  it('renders children with the wrapper if condition is true', () => {
    const initialWrapper = jest.fn().mockImplementation((child) => <div>{child}</div>),
      wrapper = jest.fn().mockImplementation((child) => <span>{child}</span>),
      children = <p>sample child</p>;

    render(
      <ConditionalWrapper initialWrapper={initialWrapper} condition={true} wrapper={wrapper}>
        {children}
      </ConditionalWrapper>
    );

    expect(wrapper).toHaveBeenCalledWith(children);
    expect(initialWrapper).not.toHaveBeenCalled();
  });
});
