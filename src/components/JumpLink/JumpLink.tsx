import { FunctionComponent, PropsWithChildren } from 'react';

interface JumpLinkProps {
  id: string;
}

export const JumpLink: FunctionComponent<PropsWithChildren<JumpLinkProps>> = ({ id, children }) => {
  return <a href={`#${id}`}>{children}</a>;
};
