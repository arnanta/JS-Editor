import { useContext, useEffect, useRef, useState } from 'react';
import style from './FileExplorer.module.css';
import { AddFile, Folder as FolderIcon, CollapseAll, ExplorerIcon } from '@/assets/icons';
import Folder from '@/Explorer/components/Folder/Folder';
import FileContext from '@/contexts/File/Context';
import { IFile } from '@/types';

const FileExplorer = () => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const rootNode = useRef<Nullable<IFile.FolderNode>>(null);
  const { root, initDirectory, createNode } = useContext(FileContext);
  const handleCreateNewFile = (fileName: string) => {
    console.log('🚀 ~ handleCreateNewFile ~ fileName:', fileName);
    //! Will add the file with the name and type file to the list of folders creating a copy of it
  };

  useEffect(() => {
    if (root) {
      rootNode.current = root;
      sessionStorage.setItem('root', JSON.stringify(root.toJSON()));
      createNode('index.js', IFile.NODE_TYPE.FILE, root, 'let data = 6');
      createNode('index.html', IFile.NODE_TYPE.FILE, root, '<html></html>');
      createNode('index.css', IFile.NODE_TYPE.FILE, root, 'html {background-color: #fff}');
    }
  }, [createNode, root]);

  useEffect(() => {
    const stored = sessionStorage.getItem('root');

    if (!stored) {
      initDirectory();
    }
  }, [initDirectory]);
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
        {root ? <Folder item={root} /> : <span>No folder</span>}
      </div>
    </div>
  );
};

export default FileExplorer;
