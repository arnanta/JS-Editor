import NavigationContext from '@/contexts/Navigation/Context';
import useMap, { ACTION_TYPES } from '@/hooks/useMap';
import { IFile } from '@/types';

const NavigationContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [openedFiles, setOpenedFile] = useMap<string, IFile.FileNode>();

  const updateOpenedFiles = (fileObject: IFile.FileNode) => {
    console.log('File object :', fileObject);

    if (openedFiles.has(fileObject.name)) {
      console.log('File  already open in the editor');
      //   test code
      setOpenedFile({ type: ACTION_TYPES.DELETE, key: fileObject.name });
    } else {
      setOpenedFile({ type: ACTION_TYPES.ADD, key: fileObject.name, value: fileObject });
    }
  };
  return (
    <NavigationContext.Provider
      value={{
        openedFiles: openedFiles,
        updateOpenedFiles,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextWrapper;
