import { FC, PropsWithChildren } from 'react';

interface ConditionalWrapperInterface {
  initialWrapper: any;
  condition: boolean;
  wrapper: any;
}
export const ConditionalWrapper: FC<PropsWithChildren<ConditionalWrapperInterface>> = ({
  initialWrapper,
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : initialWrapper(children));
