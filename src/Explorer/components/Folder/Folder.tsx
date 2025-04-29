import { useState, useContext } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';
import NavigationContext from '@/contexts/Navigation/Context';

const Folder = ({ item }: { item: IFile.FileNode }) => {
  const { updateOpenedFiles } = useContext(NavigationContext);

  const [expanded, setExpanded] = useState(false);
  // const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  // const [fileTree, setFileTree] = useState<FileNode[]>();

  const handleFolderClick = () => {
    item.type === 'folder' && setExpanded((prev) => !prev);
    item.type === 'file' && updateOpenedFiles(item);
    // setSelectedNode(item.name);
    // console.log(selectedNode);
  };

  const getNodeItem = () => {
    if (item.type === 'file') return null;
    else {
      return expanded ? '📂' : '📁';
    }
  };

  return (
    <div className={style.folder}>
      <div className={`${style.folderName} ${style.node}`} onClick={handleFolderClick}>
        {getNodeItem()} {item.name}
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
