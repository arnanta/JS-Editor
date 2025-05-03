export type ContextMenuData = {
  title: string;
  key: string;
  disabled?: boolean;
  subMenu?: ContextMenuData[];
  onClick?: (option: { key: string }) => void; // Match your component's expected type
};

export const FileContextMenuData: ContextMenuData[] = [
  {
    title: 'Rename',
    key: 'rename',
    onClick: (option) => {}, // Now properly typed
  },
  {
    title: 'Delete',
    key: 'delete',
    onClick: (option) => {},
  },
  {
    title: 'Cut',
    key: 'cut',
    onClick: (option) => {},
  },
  {
    title: 'Copy',
    key: 'copy',
    onClick: (option) => {},
  },
  {
    title: 'Paste',
    key: 'paste',
    disabled: false,
    onClick: (option) => {},
  },
];

export const FolderContextMenuData: ContextMenuData[] = [
  {
    title: 'Rename',
    key: 'rename',
    onClick: (option) => {},
  },
  {
    title: 'Delete',
    key: 'delete',
    onClick: (option) => {},
  },
  {
    title: 'Cut',
    key: 'cut',
    onClick: (option) => {},
  },
  {
    title: 'Copy',
    key: 'copy',
    onClick: (option) => {},
  },
  {
    title: 'Paste',
    key: 'paste',
    disabled: false,
    onClick: (option) => {},
  },
  {
    title: 'New File',
    key: 'new_file',
    onClick: (option) => {},
  },
  {
    title: 'New Folder',
    key: 'new_folder',
    onClick: (option) => {},
  },
];

export const getContextMenudata = (nodeType: string, isNodeCopied: boolean): ContextMenuData[] => {
  const baseMenu = nodeType === 'file' ? [...FileContextMenuData] : [...FolderContextMenuData];

  const pasteIndex = baseMenu.findIndex((item) => item.key === 'paste');
  if (pasteIndex !== -1) {
    baseMenu[pasteIndex] = {
      ...baseMenu[pasteIndex],
      disabled: !isNodeCopied,
    };
  }

  return baseMenu;
};
