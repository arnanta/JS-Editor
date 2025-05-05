import { useContext, useEffect, useRef, useState } from 'react';
import style from './FileExplorer.module.css';
import { AddFile, Folder as FolderIcon, CollapseAll } from '@/assets/icons';
import Folder from '@/Explorer/components/Folder/Folder';
import FileContext from '@/contexts/File/Context';
import { IFile } from '@/types';
import { ContextMenu } from '@/components';
import { getContextMenudata, ContextActionType } from './constants/ContextMenuOptions';

const FileExplorer = () => {
  type NodeType = 'file' | 'folder';
  const {
    root,
    createNode,
    deleteNode,
    renameNode,
    initDirectory,
    updateSelectedFile,
    selectedFile,
    closeFile,
    openedFiles,
  } = useContext(FileContext);

  const rootNode = useRef<Nullable<IFile.FolderNode>>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renamingNode, setRenamingNode] = useState<Nullable<IFile.Node>>(null);
  const [copiedNode, setCopiedNode] = useState<Nullable<IFile.Node>>(null);
  const [isCutOperation, setIsCutOperation] = useState(false);
  const [newNodeType, setNewNodeType] = useState<NodeType>('file');
  const [collapseTrigger, setCollapseTrigger] = useState<boolean>(false);
  const selectedNodeRef = useRef<Nullable<HTMLElement>>(null);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false);
  const [contextMenuNode, setContextMenuNode] = useState<Nullable<IFile.Node>>(null);
  const [selectedFolder, setSelectedFolder] = useState<Nullable<IFile.FolderNode>>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const handleNodeSelect = (node: IFile.Node) => {
    if (node.type === IFile.NODE_TYPE.FILE) {
      updateSelectedFile(node);
    } else {
      setSelectedFolder(node as IFile.FolderNode);
    }
  };

  const handleCutNode = (node: IFile.Node) => {
    setCopiedNode(node);
    setIsCutOperation(true);
  };

  const handleCopyNode = (node: IFile.Node) => {
    setCopiedNode(node);
    setIsCutOperation(false);
  };

  const handleCreateNew = (name: string, type: NodeType) => {
    if (!name || !selectedFolder) return;

    const trimmedName = name.trim();
    if (!trimmedName) {
      setIsCreatingNew(false);
      return;
    }

    const isFile = type === 'file';
    const allowedExtensions = [
      '.js',
      '.ts',
      '.json',
      '.txt',
      '.md',
      '.html',
      '.css',
      'scss',
      'tsx',
      'jsx',
    ];

    if (isFile) {
      const hasValidExtension = allowedExtensions.some((ext) => trimmedName.endsWith(ext));
      if (!hasValidExtension) {
        alert(`File must have a valid extension: ${allowedExtensions.join(', ')}`);
        return;
      }
    }

    try {
      createNode(
        trimmedName,
        isFile ? IFile.NODE_TYPE.FILE : IFile.NODE_TYPE.FOLDER,
        selectedFolder,
      );
      setIsCreatingNew(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handlePasteNode = (targetNode: IFile.Node) => {
    if (!copiedNode || !targetNode || targetNode.type !== IFile.NODE_TYPE.FOLDER) return;

    if (copiedNode.getParent()?.name === targetNode.name) {
      alert('Cannot paste into the same folder');
      return;
    }

    try {
      createNode(
        copiedNode.name,
        copiedNode.type,
        targetNode as IFile.FolderNode,
        copiedNode.getContent(),
      );

      if (isCutOperation) {
        deleteNode(copiedNode.name, copiedNode.getParent()!);
      }

      setCopiedNode(null);
      setIsCutOperation(false);
    } catch (error) {
      alert(error);
    }
  };

  const handlePasteNode = (targetNode: IFile.Node) => {
    if (!copiedNode || !targetNode || targetNode.type !== IFile.NODE_TYPE.FOLDER) return;
    try {
      createNode(
        copiedNode.name,
        copiedNode.type,
        targetNode as IFile.FolderNode,
        copiedNode.getContent(),
      );
      if (isCutOperation) {
        deleteNode(copiedNode.name, copiedNode.getParent()!);
      }
      setCopiedNode(null);
      setIsCutOperation(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleRenameAction = (newName: string) => {
    if (renamingNode && newName && newName !== renamingNode.name && renamingNode.getParent()) {
      try {
        renameNode(renamingNode.name, newName, renamingNode.getParent());
      } catch (error) {
        alert(error);
      }
    }
    setIsRenaming(false);
    setRenamingNode(null);
  };

  const expandFolder = (folderName: string) => {
    setExpandedFolders((prev) => new Set(prev).add(folderName));
  };

  const handleContextAction = (option: { key: string }) => {
    if (!contextMenuNode) return;

    switch (option.key) {
      case ContextActionType.Rename:
        setIsRenaming(true);
        setRenamingNode(contextMenuNode);
        break;
      case ContextActionType.Delete:
        if (contextMenuNode.getParent()) {
          deleteNode(contextMenuNode.name, contextMenuNode.getParent());
          if (openedFiles.has(contextMenuNode.name)) {
            closeFile(contextMenuNode);
          }
        }
        break;
      case ContextActionType.Cut:
        handleCutNode(contextMenuNode);
        break;
      case ContextActionType.Copy:
        handleCopyNode(contextMenuNode);
        break;
      case ContextActionType.Paste:
        handlePasteNode(contextMenuNode);
        break;
      case ContextActionType.NewFile:
      case ContextActionType.NewFolder:
        const targetFolder =
          contextMenuNode.type === IFile.NODE_TYPE.FOLDER
            ? (contextMenuNode as IFile.FolderNode)
            : contextMenuNode.getParent()!;

        setSelectedFolder(targetFolder);
        expandFolder(targetFolder.name);
        setNewNodeType(option.key === ContextActionType.NewFile ? 'file' : 'folder');
        setIsCreatingNew(true);
        break;
      default:
        break;
    }
    setIsContextMenuVisible(false);
  };

  const collapseAllhandler = () => {
    setCollapseTrigger((prev) => !prev);
    setExpandedFolders(new Set());
  };

  const handleContextMenu = (e: React.MouseEvent, node: IFile.Node) => {
    e.preventDefault();
    setContextMenuNode(node);
    if (node.type === IFile.NODE_TYPE.FILE) {
      updateSelectedFile(node);
    } else {
      setSelectedFolder(node as IFile.FolderNode);
    }
    selectedNodeRef.current = e.currentTarget as HTMLElement;
    setIsContextMenuVisible(true);
  };

  const handleClickAnywhere = () => {
    if (isContextMenuVisible) {
      setIsContextMenuVisible(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, node: IFile.Node) => {
    e.preventDefault();
    setContextMenuNode(node);
    updateSelectedFile(node);
    selectedNodeRef.current = e.currentTarget as HTMLElement;
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    if (root) {
      rootNode.current = root;
      sessionStorage.setItem('root', JSON.stringify(root.toJSON()));
      createNode('index.js', IFile.NODE_TYPE.FILE, root, 'let data = 8');
      createNode('index.html', IFile.NODE_TYPE.FILE, root);
      createNode('index.css', IFile.NODE_TYPE.FILE, root);
      setSelectedFolder(root);
      expandFolder(root.name);
    }
  }, [root]);

  useEffect(() => {
    const stored = sessionStorage.getItem('root');
    if (!stored) {
      initDirectory();
    }
  }, [initDirectory]);

  useEffect(() => {
    window.addEventListener('click', handleClickAnywhere);
    return () => window.removeEventListener('click', handleClickAnywhere);
  }, [isContextMenuVisible]);

  return (
    <div className={style.explorer}>
      <div className={style.toolbar}>
        <button
          onClick={() => {
            setIsCreatingNew(true);
            setNewNodeType('file');
            if (selectedFolder) expandFolder(selectedFolder.name);
          }}
        >
          <AddFile />
        </button>
        <button
          onClick={() => {
            setIsCreatingNew(true);
            setNewNodeType('folder');
            if (selectedFolder) expandFolder(selectedFolder.name);
          }}
        >
          <FolderIcon />
        </button>
        <button onClick={collapseAllhandler}>
          <CollapseAll />
        </button>
      </div>

      <div className={style.tree_container}>
        {root ? (
          <Folder
            item={root}
            isCreatingNew={isCreatingNew}
            isRenaming={isRenaming}
            selectedNodeData={selectedFile}
            selectedFolderData={selectedFolder}
            onNodeSelect={handleNodeSelect}
            onCreate={(name) => {
              handleCreateNew(name, newNodeType);
              setIsCreatingNew(false);
            }}
            handleRename={handleRenameAction}
            renamingNode={renamingNode}
            onCollapseAll={collapseAllhandler}
            isCollapsed={collapseTrigger}
            onContextMenu={handleContextMenu}
            expandedFolders={expandedFolders}
            setExpandedFolders={setExpandedFolders}
            copiedNode={copiedNode}
            isCutOperation={isCutOperation}
          />
        ) : (
          <span>No folder</span>
        )}
      </div>

      {isContextMenuVisible && selectedNodeRef.current && contextMenuNode && (
        <ContextMenu
          htmlRef={selectedNodeRef.current}
          onClickOptions={handleContextAction}
          data={getContextMenudata(
            contextMenuNode.type,
            !!copiedNode,
            copiedNode?.getParent()?.name !== contextMenuNode.name,
          )}
        />
      )}
    </div>
  );
};

export default FileExplorer;
