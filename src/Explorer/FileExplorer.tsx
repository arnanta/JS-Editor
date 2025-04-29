import { useEffect, useState } from 'react';
import style from './FileExplorer.module.css';
import { folderStructure } from './constants/FolderStructure';
import { AddFile, Folder as FolderIcon, CollapseAll } from '@/assets/icons';
import Folder from '@/Explorer/components/Folder/Folder';
import { IFile } from '@/types';

const FileExplorer = () => {
  type NodeType = 'file' | 'folder';
  const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<IFile.FileNode | null>(null);
  const [treeData, setTreeData] = useState<IFile.FileNode>(() => deepClone(folderStructure));
  const [newNodeType, setNewNodeType] = useState<NodeType>('file');
  const handleNodeSelect = (node: IFile.FileNode) => {
    setSelectedNodeData(node);
  };

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

    const updatedTree = addNodeToFolderByName(treeData, selectedNodeData.name, { name, type });
    localStorage.setItem('fileTree', JSON.stringify(updatedTree));
    setTreeData(updatedTree);
  };

  useEffect(() => {
    const saved = localStorage.getItem('fileTree');
    if (saved) {
      setTreeData(JSON.parse(saved));
    }
  }, []);

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
          selectedNodeData={selectedNodeData}
          onNodeSelect={handleNodeSelect}
          onCreate={(name) => {
            handleCreateNew(name, newNodeType);
            setIsCreatingNew(false);
          }}
        />
      </div>
    </div>
  );
};

export default FileExplorer;
