import { useState, useEffect, useContext } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';
import { FolderOpen, Folder as FolderIcon } from '@/assets/icons';
import FileContext from '@/contexts/File/Context';

interface FolderProps {
  item: IFile.Node | IFile.FolderNode;
  isCreatingNew: boolean;
  selectedNodeData: Nullable<IFile.Node>;
  isRenaming: boolean;
  renamingNode: Nullable<IFile.Node>;
  onNodeSelect: (node: IFile.Node) => void;
  onCreate: (fileName: string) => void;
  onContextMenu: (e: React.MouseEvent, node: IFile.Node) => void;
  handleRename: (newName: string) => void;
  onCollapseAll: () => void;
  isCollapsed?: boolean;
}

const Folder = ({
  item,
  isCreatingNew,
  selectedNodeData,
  isRenaming,
  renamingNode,
  onNodeSelect,
  onCreate,
  onContextMenu,
  handleRename,
  onCollapseAll,
  isCollapsed,
}: FolderProps) => {
  const { updateOpenedFiles } = useContext(FileContext);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isCollapsed !== undefined) {
      setExpanded(false);
    }
  }, [isCollapsed]);

  if (item.type === IFile.NODE_TYPE.FILE) {
    return (
      <div
        className={`${style.file} ${style.node}`}
        onContextMenu={(e) => onContextMenu(e, item)}
        onClick={() => {
          onNodeSelect(item);
          updateOpenedFiles(item);
        }}
      >
        {item.name}
      </div>
    );
  }

  const handleFolderClick = () => {
    setExpanded((prev) => !prev);
    onNodeSelect(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value && !isRenaming) {
      onCreate(e.currentTarget.value);
    }
  };

  return (
    <div className={style.folder}>
      <div
        className={`${style.folderName} ${style.node}`}
        onClick={handleFolderClick}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        {expanded ? <FolderOpen /> : <FolderIcon />} {item.name}
      </div>

      {isRenaming && renamingNode?.name === item.name && (
        <input
          autoFocus
          type="text"
          className="bg-gray-700 text-white px-1 py-0.5"
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
        <div className="pl-4">
          <input
            autoFocus
            type="text"
            className="bg-gray-700 text-white px-1 py-0.5"
            placeholder="new file/folder name"
            onKeyDown={handleKeyDown}
            onBlur={() => onCreate('')}
          />
        </div>
      )}

      {expanded && item.type === IFile.NODE_TYPE.FOLDER && (
        <div className={style.children}>
          {(item as IFile.FolderNode).getChildren().map((child, index) => (
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
              onCollapseAll={onCollapseAll}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
