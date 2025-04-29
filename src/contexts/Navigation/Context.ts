import { IFile } from '@/types';
import { createContext } from 'react';

export type NavigationContextType = {
  openedFiles: Map<string, Nullable<IFile.FileNode>>;
  selectedFile: Nullable<IFile.FileNode>;
  updateOpenedFiles: (fileObject: IFile.FileNode) => void;
  updateSelectedFile: (file: IFile.FileNode | null) => void;
  closeFile: (file: IFile.FileNode) => void;
};

const initialState: NavigationContextType = {
  openedFiles: new Map(),
  selectedFile: null,
  updateOpenedFiles: () => {},
  updateSelectedFile: () => {},
  closeFile: () => {},
};

const NavigationContext = createContext(initialState);

export default NavigationContext;
