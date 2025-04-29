import NavigationContext from '@/contexts/Navigation/Context';
import useMap, { ACTION_TYPES } from '@/utils/hooks/useMap';
import { IFile } from '@/types';
import { useState } from 'react';

const NavigationContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [openedFiles, setOpenedFile] = useMap<string, IFile.FileNode>();

  const [selectedFile, setSelectedFile] = useState<Nullable<IFile.FileNode>>(null);

  const updateOpenedFiles = (fileObject: IFile.FileNode) => {
    console.log('File object :', fileObject);

    if (!openedFiles.has(fileObject.name)) {
      setOpenedFile({ type: ACTION_TYPES.ADD, key: fileObject.name, value: fileObject });
    }
    updateSelectedFile(fileObject);
  };

  const updateSelectedFile = (file: IFile.FileNode | null) => {
    setSelectedFile(file);
  };

  const closeFile = (file: IFile.FileNode) => {
    if (selectedFile && selectedFile.name === file.name) {
      updateSelectedFile(null);
    }

    setOpenedFile({ type: ACTION_TYPES.DELETE, key: file.name });
  };

  return (
    <NavigationContext.Provider
      value={{
        openedFiles: openedFiles,
        selectedFile: selectedFile,
        updateOpenedFiles,
        updateSelectedFile,
        closeFile,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextWrapper;
