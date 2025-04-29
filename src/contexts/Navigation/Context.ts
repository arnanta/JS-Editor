import { FileObject } from '@/types';

type NavigationContextType = {
  openedFiles: Map<string, Nullable<FileObject>>;
};

export default NavigationContextType;
