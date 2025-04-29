import { IFile } from '@/types';

type NavigationContextType = {
  openedFiles: Map<string, Nullable<IFile.FileObject>>;
};

export default NavigationContextType;
