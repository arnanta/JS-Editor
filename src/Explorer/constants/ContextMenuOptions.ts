export type ContextMenuData = {
  title: string;
  key: string;
  disabled?: boolean;
  subMenu?: ContextMenuData[];
  onClick?: (option: { key: string }) => void; // Match your component's expected type
};

export enum ContextActionType {
  Rename = 'rename',
  Delete = 'delete',
  Cut = 'cut',
  Copy = 'copy',
  Paste = 'paste',
  NewFile = 'new_file',
  NewFolder = 'new_folder',
}

// const handleDeletion = (node: IFile.Node) => {
//   if (node) {
//     deleteNode(node);
//   }
// };
export const onClickContextMenuOptions = (option) => {
  switch (option.key) {
    case ContextActionType.Delete:
      console.log(option);
  }
};

export const FileContextMenuData: ContextMenuData[] = [
  {
    title: 'Rename',
    key: 'rename',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Delete',
    key: 'delete',
    // onClick: (option) => {
    //   onClickContextMenuOptions(option);
    // },
  },
  {
    title: 'Cut',
    key: 'cut',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Copy',
    key: 'copy',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Paste',
    key: 'paste',
    disabled: false,
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
];

export const FolderContextMenuData: ContextMenuData[] = [
  {
    title: 'Rename',
    key: 'rename',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Delete',
    key: 'delete',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Cut',
    key: 'cut',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Copy',
    key: 'copy',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'Paste',
    key: 'paste',
    disabled: false,
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'New File',
    key: 'new_file',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
  {
    title: 'New Folder',
    key: 'new_folder',
    onClick: (option) => {
      onClickContextMenuOptions(option);
    },
  },
];

export const getContextMenudata = (nodeType: string, isNodeCopied: boolean): ContextMenuData[] => {
  const baseMenu = nodeType === 'FILE' ? [...FileContextMenuData] : [...FolderContextMenuData];

  const pasteIndex = baseMenu.findIndex((item) => item.key === 'paste');
  if (pasteIndex !== -1) {
    baseMenu[pasteIndex] = {
      ...baseMenu[pasteIndex],
      disabled: !isNodeCopied,
    };
  }

  return baseMenu;
};
