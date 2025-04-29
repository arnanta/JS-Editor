import { useState } from 'react';
import style from './FileExplorer.module.css';
import { folderStructure } from './constants/FolderStructure';
import { AddFile, Folder as FolderIcon, CollapseAll, ExplorerIcon } from '@/assets/icons';
import Folder from '@/Explorer/components/Folder/Folder';

const FileExplorer = () => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const handleCreateNewFile = (fileName: string) => {
    console.log('🚀 ~ handleCreateNewFile ~ fileName:', fileName);
    //! Will add the file with the name and type file to the list of folders creating a copy of it
  };
  return (
    <div className={style.explorer}>
      {/* Toolbar */}
      <div className={style.toolbar}>
        <ExplorerIcon />
        {/* <NewFile onClick={() => setIsCreatingNew(true)} /> */}
        <AddFile />
        <FolderIcon />
        <CollapseAll />
      </div>
      {isCreatingNew && (
        <div className="pl-4">
          <input
            autoFocus
            type="text"
            className="bg-gray-700 text-white px-1 py-0.5"
            placeholder="new file name"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleCreateNewFile(e.currentTarget.value);
                setIsCreatingNew(false);
              }
            }}
            onBlur={() => setIsCreatingNew(false)}
          />
        </div>
      )}
      {/* File Structure */}
      <div className={style.tree_container}>
        <Folder item={folderStructure} />
      </div>
    </div>
  );
};

export default FileExplorer;
