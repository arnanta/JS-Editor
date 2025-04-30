import { useEffect, useState } from 'react';
import style from './FileExplorer.module.css';
import { folderStructure } from './constants/FolderStructure';
import { AddFile, Folder as FolderIcon, CollapseAll } from '@/assets/icons';
import Folder from '@/Explorer/components/Folder/Folder';
import { IFile } from '@/types';
import { fileContextMenuOptions, folderContextMenuOptions } from './constants/ContextMenuoptions';

const FileExplorer = () => {
  type NodeType = 'file' | 'folder';

  const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renamingNode, setRenamingNode] = useState<IFile.FileNode | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<IFile.FileNode | null>(null);
  const [treeData, setTreeData] = useState<IFile.FileNode>(() => deepClone(folderStructure));
  const [newNodeType, setNewNodeType] = useState<NodeType>('file');
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
    node: IFile.FileNode | null;
  }>({ x: 0, y: 0, visible: false, node: null });

  const handleContextMenu = (event: React.MouseEvent, node: IFile.FileNode) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, visible: true, node });
  };

  const handleNodeSelect = (node: IFile.FileNode) => {
    setSelectedNodeData(node);
  };

  const getContextOptions = (type: string) =>
    type === 'folder' ? folderContextMenuOptions : fileContextMenuOptions;

  const addNodeToFolderByName = (
    node: IFile.FileNode,
    folderName: string,
    newNode: { name: string; type: NodeType },
  ): IFile.FileNode => {
    if (node.type === 'folder') {
      if (node.name === folderName) {
        return {
          ...node,
          children: [
            ...(node.children || []),
            { ...newNode, ...(newNode.type === 'folder' ? { children: [] } : {}) },
          ],
        };
      }

      return {
        ...node,
        children:
          node.children?.map((child) => addNodeToFolderByName(child, folderName, newNode)) || [],
      };
    }
    return node;
  };

  const handleCreateNew = (name: string, type: NodeType) => {
    if (!name || !selectedNodeData || selectedNodeData.type !== 'folder') return;

    let sameNameItemFound = false;
    Object.values(selectedNodeData).forEach((item) => {
      if (Array.isArray(item)) {
        for (let i = 0; i < item.length; i++) {
          if (item[i].name === name) {
            alert('Node with same name cannot be created at the same directory');
            sameNameItemFound = true;
            break;
          }
        }
      }
    });

    if (!sameNameItemFound) {
      const updatedTree = addNodeToFolderByName(treeData, selectedNodeData.name, { name, type });
      localStorage.setItem('fileTree', JSON.stringify(updatedTree));
      setTreeData(updatedTree);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('fileTree');
    if (saved) {
      setTreeData(JSON.parse(saved));
    }
  }, []);

  const handleClickAnywhere = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickAnywhere);
    return () => window.removeEventListener('click', handleClickAnywhere);
  }, [contextMenu]);

  const renameNodeByName = (
    node: IFile.FileNode,
    oldName: string,
    newName: string,
  ): IFile.FileNode => {
    if (node.name === oldName) {
      return {
        ...node,
        name: newName,
      };
    }

    if (node.type === 'folder' && node.children) {
      return {
        ...node,
        children: node.children.map((child) => renameNodeByName(child, oldName, newName)),
      };
    }

    return node;
  };

  const handleRenameAction = (newName: string) => {
    if (renamingNode && newName && newName !== renamingNode.name) {
      const updatedTree = renameNodeByName(treeData, renamingNode.name, newName);
      setTreeData(updatedTree);
      localStorage.setItem('fileTree', JSON.stringify(updatedTree));
    }
    setIsRenaming(false);
    setRenamingNode(null);
  };

  const handleContextAction = (actionType: string, node: IFile.FileNode | null) => {
    switch (actionType) {
      case 'rename':
        setIsRenaming(true);
        setRenamingNode(node);
        break;
      default:
        return actionType;
    }
  };

  return (
    <div className={style.explorer}>
      {/* Toolbar */}
      <div className={style.toolbar}>
        <button
          onClick={() => {
            setIsCreatingNew(true);
            setNewNodeType('file');
          }}
        >
          <AddFile />
        </button>
        <button
          onClick={() => {
            setIsCreatingNew(true);
            setNewNodeType('folder');
          }}
        >
          <FolderIcon />
        </button>
        <button>
          <CollapseAll />
        </button>
      </div>

      {/* File Structure */}
      <div className={style.tree_container}>
        <Folder
          item={treeData}
          isCreatingNew={isCreatingNew}
          isRenaming={isRenaming}
          selectedNodeData={selectedNodeData}
          onNodeSelect={handleNodeSelect}
          onCreate={(name) => {
            handleCreateNew(name, newNodeType);
            setIsCreatingNew(false);
          }}
          onContextMenu={handleContextMenu}
          handleRename={handleRenameAction}
          renamingNode={renamingNode}
        />
      </div>

      {contextMenu.visible && (
        <ul className={style.contextMenu} style={{ top: contextMenu.y, left: contextMenu.x }}>
          {getContextOptions(contextMenu.node?.type || 'folder').map((option) => (
            <li
              key={option.action}
              onClick={() => handleContextAction(option.action, contextMenu.node)}
            >
              {option.icon} {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileExplorer;
