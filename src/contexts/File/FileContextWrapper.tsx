import FileContext from '@/contexts/File/Context';
import useMap, { ACTION_TYPES } from '@/utils/hooks/useMap';
import { IFile } from '@/types';
import { useState } from 'react';
import useDirectory from '@/utils/hooks/useDirectory';

const FileContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [openedFiles, setOpenedFile] = useMap<string, IFile.Node>({
    shouldCache: true,
    cacheKey: 'openedFiles',
  });

  const { root, initDirectory, createNode, deleteNode } = useDirectory();

  const [selectedFile, setSelectedFile] = useState<Nullable<IFile.Node>>(null);

  const updateOpenedFiles = (fileObject: IFile.Node) => {
    if (!openedFiles.has(fileObject.name)) {
      setOpenedFile({ type: ACTION_TYPES.ADD, key: fileObject.name, value: fileObject });
    }
    updateSelectedFile(fileObject);
  };

  const updateSelectedFile = (file: IFile.Node | null) => {
    setSelectedFile(file);
  };

  const closeFile = (file: IFile.Node) => {
    if (selectedFile && selectedFile.name === file.name) {
      let newSelectedFile: Nullable<IFile.Node> = null;
      if (openedFiles.size > 1) {
        let previousOpenFileInTab = '';
        if (openedFiles.size === 2) {
          const openFileNames = Array.from(openedFiles.keys());
          const currentSelectedFileIndex = openFileNames.indexOf(file.name);
          if (currentSelectedFileIndex === 0) {
            previousOpenFileInTab = openFileNames[1];
          } else {
            previousOpenFileInTab = openFileNames[0];
          }
        } else if (openedFiles.size > 2) {
          const openFileNames = Array.from(openedFiles.keys());
          const currentSelectedFileIndex = openFileNames.indexOf(file.name);
          previousOpenFileInTab = openFileNames[currentSelectedFileIndex - 1];
        }
        newSelectedFile =
          previousOpenFileInTab && openedFiles.has(previousOpenFileInTab)
            ? openedFiles.get(previousOpenFileInTab)!
            : null;
      }
      updateSelectedFile(newSelectedFile);
    }

    setOpenedFile({ type: ACTION_TYPES.DELETE, key: file.name });
  };

  return (
    <FileContext.Provider
      value={{
        root: root,
        openedFiles: openedFiles,
        selectedFile: selectedFile,
        initDirectory: initDirectory,
        createNode,
        deleteNode,
        updateOpenedFiles,
        updateSelectedFile,
        closeFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextWrapper;
