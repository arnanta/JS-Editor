/*eslint-disable no-unused-vars*/
import { useState } from 'react';
import style from './styles/FileExplorer.module.css';
import { folderStructure } from './FolderStructure';
import { AddFile, Folder as FolderIcon, CollapseAll, ExplorerIcon } from '../assets/icons';

interface FileNode {
  type: string;
  name: string;
  children?: FileNode[];
}

const Folder = ({ item }: { item: FileNode }) => {
  const [expanded, setExpanded] = useState(false);
  // const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  // const [fileTree, setFileTree] = useState<FileNode[]>();
  //! Not needed
  if (item.type === 'file') {
    return <div className={style.file}>{item.name}</div>;
  }

  const handleFolderClick = () => {
    setExpanded(!expanded);
    // setSelectedNode(item.name);
    // console.log(selectedNode);
  };

  return (
    <div className={style.folder}>
      <div className={style.folderName} onClick={handleFolderClick}>
        {expanded ? '📂' : '📁'} {item.name}
      </div>

      {expanded && item.children && (
        <div className={style.children}>
          {item.children.map((child, index) => (
            <Folder key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

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
      <div className={style.verticalLine}>
        <Folder item={folderStructure} />
      </div>
    </div>
  );
};

export default FileExplorer;
