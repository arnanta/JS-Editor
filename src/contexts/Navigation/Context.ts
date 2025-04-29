import { IFile } from '@/types';
import { createContext } from 'react';

export type NavigationContextType = {
  openedFiles: Map<string, Nullable<IFile.FileNode>>;
  updateOpenedFiles: (fileObject: IFile.FileNode) => void;
};

const initialState: NavigationContextType = {
  openedFiles: new Map(),
  updateOpenedFiles: () => {},
};

const NavigationContext = createContext(initialState);

export default NavigationContext;
