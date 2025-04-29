import { FC, useState } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';
import { FolderOpen, Folder as FolderIcon } from '@/assets/icons';

interface FolderProps {
  item: IFile.FileNode;
  isCreatingNew: boolean;
  selectedNodeData: IFile.FileNode | null;
  onNodeSelect: (node: IFile.FileNode) => void;
  onCreate: (fileName: string) => void;
}

const Folder: FC<FolderProps> = ({
  item,
  isCreatingNew,
  selectedNodeData,
  onNodeSelect,
  onCreate,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (item.type === 'file') {
    return <div className={`${style.file} ${style.node}`}>{item.name}</div>;
  }

  const handleFolderClick = () => {
    setExpanded((prev) => !prev);
    onNodeSelect?.(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      onCreate(e.currentTarget.value);
    }
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
        {expanded ? <FolderOpen /> : <FolderIcon />} {item.name}
      </div>

      {isCreatingNew && selectedNodeData?.name === item.name && (
        <div className="inputWrapper">
          {' '}
          {/* //Need to be writen in style(Pronay) */}
          <input
            autoFocus
            type="text"
            className="inputClass" //Need to be writen in style(Pronay)
            placeholder="new file/folder name"
            onKeyDown={handleKeyDown}
            onBlur={() => onCreate('')} // Cancel on blur
          />
        </div>
      )}

      {expanded && item.children && (
        <div className={style.children}>
          {item.children.map((child, index) => (
            <Folder
              key={index}
              item={child}
              onNodeSelect={onNodeSelect}
              isCreatingNew={isCreatingNew}
              selectedNodeData={selectedNodeData}
              onCreate={onCreate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
