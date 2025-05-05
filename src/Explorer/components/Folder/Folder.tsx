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
      <div className={style.node} onContextMenu={(e) => onContextMenu(e, item)}>
        {isRenaming && renamingNode?.name === item.name ? (
          <input
            autoFocus
            type="text"
            defaultValue={item.name}
            className={style.renameInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleRename(e.currentTarget.value);
              }
            }}
            onBlur={(e) => handleRename(e.currentTarget.value)}
          />
        ) : (
          <div
            onClick={() => {
              onNodeSelect(item);
              updateOpenedFiles(item);
            }}
          >
            {item.name}
          </div>
        )}
      </div>
    );
  }

  const handleFolderClick = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setExpanded((prev) => !prev);
      onNodeSelect(item);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value && !isRenaming) {
      onCreate(e.currentTarget.value);
    }
  };

  const handleFolderContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu(e, item);
  };

  return (
    <div className={style.folder}>
      <div
        className={style.node}
        onClick={handleFolderClick}
        onContextMenu={handleFolderContextMenu}
      >
        <span className={style.folderIcon}>{expanded ? <FolderOpen /> : <FolderIcon />}</span>
        {isRenaming && renamingNode?.name === item.name ? (
          <input
            autoFocus
            type="text"
            defaultValue={item.name}
            className={style.renameInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleRename(e.currentTarget.value);
              }
            }}
            onBlur={(e) => handleRename(e.currentTarget.value)}
          />
        ) : (
          <span>{item.name}</span>
        )}
      </div>

      {expanded && (
        <div className={style.children}>
          {isCreatingNew && selectedNodeData?.name === item.name && (
            <div className={style.create_new}>
              <input
                autoFocus
                type="text"
                className={style.createInput}
                placeholder="New name"
                onKeyDown={handleKeyDown}
                onBlur={(e) => {
                  if (e.currentTarget.value) {
                    onCreate(e.currentTarget.value);
                  }
                }}
              />
            </div>
          )}
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
