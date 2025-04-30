import { FC, useState } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';
import { FolderOpen, Folder as FolderIcon } from '@/assets/icons';

interface FolderProps {
  item: IFile.FileNode;
  isCreatingNew: boolean;
  selectedNodeData: IFile.FileNode | null;
  isRenaming: boolean;
  renamingNode: IFile.FileNode | null;
  onNodeSelect: (node: IFile.FileNode) => void;
  onCreate: (fileName: string) => void;
  onContextMenu: (e: React.MouseEvent, node: IFile.FileNode) => void;
  handleRename: (newName: string) => void;
}

const Folder: FC<FolderProps> = ({
  item,
  isCreatingNew,
  selectedNodeData,
  isRenaming,
  renamingNode,
  onNodeSelect,
  onCreate,
  onContextMenu,
  handleRename,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (item.type === 'file') {
    return (
      <div className={`${style.file} ${style.node}`} onContextMenu={(e) => onContextMenu(e, item)}>
        {item.name}
      </div>
    );
  }

  const handleFolderClick = () => {
    setExpanded((prev) => !prev);
    onNodeSelect?.(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value && !isRenaming) {
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
      <div
        className={`${style.folderName} ${style.node}`}
        onClick={handleFolderClick}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        {getNodeItem()} {item.name}
        {expanded ? <FolderOpen /> : <FolderIcon />} {item.name}
      </div>

      {isRenaming && renamingNode?.name === item.name && (
        <input
          autoFocus
          type="text"
          className="inputClass"
          placeholder="Rename file/folder"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              handleRename(e.currentTarget.value);
            }
          }}
          onBlur={(e) => handleRename(e.currentTarget.value)}
        />
      )}

      {isCreatingNew && selectedNodeData?.name === item.name && (
        <div className="inputWrapper">
          <input
            autoFocus
            type="text"
            className="inputClass"
            placeholder="new file/folder name"
            onKeyDown={handleKeyDown}
            onBlur={() => onCreate('')}
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
              onContextMenu={onContextMenu}
              isRenaming={isRenaming}
              handleRename={handleRename}
              renamingNode={renamingNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
