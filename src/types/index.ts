import { ReactNode } from 'react';

export type ContextWrapperProps = {
  children: ReactNode;
};

export type FileObject = {
  name: string;
  path: string;
  isDirty: boolean;
  isActive: boolean;
};
