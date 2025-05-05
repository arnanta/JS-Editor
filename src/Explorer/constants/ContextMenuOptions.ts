export type ContextMenuData = {
  title: string;
  key: string;
  disabled?: boolean;
  subMenu?: ContextMenuData[];
  onClick?: (option: { key: string }) => void;
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

export const FileContextMenuData: ContextMenuData[] = [
  {
    title: 'Rename',
    key: 'rename',
  },
  {
    title: 'Delete',
    key: 'delete',
  },
  {
    title: 'Cut',
    key: 'cut',
  },
  {
    title: 'Copy',
    key: 'copy',
  },
  {
    title: 'Paste',
    key: 'paste',
    disabled: false,
  },
];

export const FolderContextMenuData: ContextMenuData[] = [
  {
    title: 'Rename',
    key: 'rename',
  },
  {
    title: 'Delete',
    key: 'delete',
  },
  {
    title: 'Cut',
    key: 'cut',
  },
  {
    title: 'Copy',
    key: 'copy',
  },
  {
    title: 'Paste',
    key: 'paste',
    disabled: false,
  },
  {
    title: 'New File',
    key: 'new_file',
  },
  {
    title: 'New Folder',
    key: 'new_folder',
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
