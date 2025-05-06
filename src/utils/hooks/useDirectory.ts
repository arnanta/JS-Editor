import { useEffect, useState } from 'react';
import { IFile } from '@/types';

const useDirectory = () => {
  const [root, setRoot] = useState<Nullable<IFile.FolderNode>>(null);

  const createNode = (
    name: string,
    type: IFile.NODE_TYPE,
    parent: IFile.FolderNode | null = root,
    content: Nullable<string>,
  ) => {
    if (type === IFile.NODE_TYPE.FILE && !parent) {
      throw new Error("Can't add file as a root");
    }

    if (!root) {
      const folder = new IFile.FolderNode(name, type, parent);
      setRoot(folder);
    } else {
      //search if there are any child with the same name in the parent's children
      if (parent) {
        const children = parent.getChildren();

        const isSameChildExists = children.find((c) => c.name === name && c.type === type);
        if (isSameChildExists !== undefined) return;

        let newNode: IFile.FolderNode | IFile.Node;

        if (type === IFile.NODE_TYPE.FOLDER) {
          newNode = new IFile.FolderNode(name, type, parent);
        } else {
          newNode = new IFile.Node(name, type, parent, content);
        }
        parent.addChildren(newNode);
      }
    }
  };

  const deleteNode = (name: string, parent: IFile.FolderNode | null) => {
    if (!parent) {
      throw new Error('Deleting the root is not allowed');
    } else {
      if (!root) {
        throw new Error("Can't delete in an empty directory");
      } else {
        const targetNode = parent.search(name);

        if (!targetNode) {
          throw new Error('element not found');
        } else {
          try {
            targetNode.delete();
          } catch (error: unknown) {
            console.log('Error');
            throw error;
          }
        }
      }
    }
  };
  function generateUniqueName(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  const initDirectory = () => {
    const rootName = generateUniqueName(16);

    createNode(rootName, IFile.NODE_TYPE.FOLDER, null, null);

    // createNode('index.js', IFile.NODE_TYPE.FILE, );
  };

  useEffect(() => {
    if (root) sessionStorage.setItem('root', JSON.stringify(root.toJSON()));
    else {
      const stored = sessionStorage.getItem('root');

      if (stored) {
        const parsed = JSON.parse(stored);
        const restored = IFile.FolderNode.fromJSON(parsed);
        setRoot(restored);
      }
    }
  }, [root]);

  return {
    root: root,
    setRoot: setRoot,
    initDirectory: initDirectory,
    createNode: createNode,
    deleteNode: deleteNode,
  };
};

export default useDirectory;
