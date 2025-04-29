import { useState } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';

const Folder = ({ item }: { item: IFile.FileNode }) => {
  const [expanded, setExpanded] = useState(false);
  // const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  // const [fileTree, setFileTree] = useState<FileNode[]>();
  //! Not needed
  if (item.type === 'file') {
    return <div className={`${style.file} ${style.node}`}>{item.name}</div>;
  }

  const handleFolderClick = () => {
    setExpanded((prev) => !prev);
    // setSelectedNode(item.name);
    // console.log(selectedNode);
  };

  return (
    <div className={style.folder}>
      <div className={`${style.folderName} ${style.node}`} onClick={handleFolderClick}>
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

export default Folder;
