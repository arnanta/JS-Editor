import { useState, useContext } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';
import FileContext from '@/contexts/File/Context';

const Folder = ({ item }: { item: IFile.FolderNode | IFile.Node }) => {
  const { updateOpenedFiles } = useContext(FileContext);

  const [expanded, setExpanded] = useState(false);
  // const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  const handleFolderClick = () => {
    item.type === IFile.NODE_TYPE.FOLDER && setExpanded((prev) => !prev);
    item.type === IFile.NODE_TYPE.FILE && updateOpenedFiles(item);
    // setSelectedNode(item.name);
    // console.log(selectedNode);
  };

  const getNodeIcon = () => {
    if (item.type === IFile.NODE_TYPE.FILE) return null;
    else {
      return expanded ? '📂' : '📁';
    }
  };

  const getChildrenView = () => {
    if (item.type === IFile.NODE_TYPE.FOLDER) {
      return (
        <div className={style.children}>
          {(item as IFile.FolderNode).getChildren().map((child, index) => (
            <Folder key={index} item={child} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className={style.folder}>
      <div className={`${style.folderName} ${style.node}`} onClick={handleFolderClick}>
        {getNodeIcon()} {item.name}
      </div>

      {expanded && getChildrenView()}
    </div>
  );
};

export default Folder;
