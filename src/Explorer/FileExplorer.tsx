import { useEffect, useState } from 'react';
import style from './FileExplorer.module.css';
import { folderStructure } from './constants/FolderStructure';
import { AddFile, Folder as FolderIcon, CollapseAll } from '@/assets/icons';
import Folder from '@/Explorer/components/Folder/Folder';
import { IFile } from '@/types';
import { fileContextMenuOptions, folderContextMenuOptions } from './constants/ContextMenuOptions';

const FileExplorer = () => {
  type NodeType = 'file' | 'folder';

  const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renamingNode, setRenamingNode] = useState<IFile.FileNode | null>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<IFile.FileNode | null>(null);
  const [copiedNode, setCopiedNode] = useState<IFile.FileNode | null>(null);
  const [isCutOperation, setIsCutOperation] = useState(false);
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

  const handleCutNode = (node: IFile.FileNode) => {
    setCopiedNode(node);
    setIsCutOperation(true);
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

  function removeNodeByMatchImmutable(node: any, target: any): any {
    if (JSON.stringify(node) === JSON.stringify(target)) {
      return null;
    }

    if (node.type === 'folder' && Array.isArray(node.children)) {
      const updatedChildren = node.children
        .map((child: any) => removeNodeByMatchImmutable(child, target))
        .filter(Boolean);

      return { ...node, children: updatedChildren };
    }
    return node;
  }
  const handleDeletion = (node: IFile.FileNode) => {
    if (node) {
      const updatedTree = removeNodeByMatchImmutable(treeData, node);
      setTreeData(updatedTree);
      localStorage.setItem('fileTree', JSON.stringify(updatedTree));
    }
  };

  const handleCopyNode = (node: IFile.FileNode) => {
    //! The node got copied
    setCopiedNode(node);
  };

  const handlePasteNode = (
    currentNode: IFile.FileNode,
    targetNodeName: string,
    copiedNode: IFile.FileNode,
  ): IFile.FileNode => {
    if (currentNode.type === 'folder') {
      if (currentNode.name === targetNodeName) {
        const existingNames = (currentNode.children || []).map((child) => child.name);

        if (existingNames.includes(copiedNode.name)) {
          alert('Node with the same name already exists in this folder.');
          return currentNode;
        }

        return {
          ...currentNode,
          children: [
            ...(currentNode.children || []),
            {
              ...copiedNode,
              ...(copiedNode.type === 'folder' ? { children: [] } : {}),
            },
          ],
        };
      }

      return {
        ...currentNode,
        children:
          currentNode.children?.map((child) =>
            handlePasteNode(child, targetNodeName, copiedNode),
          ) || [],
      };
    }

    return currentNode;
  };

  const pasteHandler = (targetNode: IFile.FileNode) => {
    if (!copiedNode) return;

    let updatedTree = treeData;

    if (isCutOperation) {
      updatedTree = removeNodeByMatchImmutable(updatedTree, copiedNode);
    }
    updatedTree = handlePasteNode(updatedTree, targetNode.name, copiedNode);
    setTreeData(updatedTree);
    localStorage.setItem('fileTree', JSON.stringify(updatedTree));
    setCopiedNode(null);
    setIsCutOperation(false);
  };

  const handleContextAction = (actionType: string, node: IFile.FileNode | null) => {
    switch (actionType) {
      case 'rename':
        setIsRenaming(true);
        setRenamingNode(node);
        break;
      case 'delete':
        handleDeletion(node as IFile.FileNode);
        break;
      case 'copy':
        handleCopyNode(node as IFile.FileNode);
        break;
      case 'paste':
        pasteHandler(node as IFile.FileNode);
        break;
      case 'cut':
        handleCutNode(node as IFile.FileNode);
        break;
      case 'new_file':
        setSelectedNodeData(node);
        setNewNodeType('file');
        setIsCreatingNew(true);
        break;
      case 'new_folder':
        setSelectedNodeData(node);
        setNewNodeType('folder');
        setIsCreatingNew(true);
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
