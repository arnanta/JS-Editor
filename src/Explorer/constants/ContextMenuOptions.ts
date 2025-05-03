export type ContextMenuData = {
  title: string;
  key: string;
  disabled?: boolean;
  subMenu?: ContextMenuData[];
};

export const FileContextMenuData: ContextMenuData[] = [
  { title: 'Rename', key: 'rename' },
  { title: 'Delete', key: 'delete' },
  { title: 'Cut', key: 'cut' },
  { title: 'Copy', key: 'copy' },
  { title: 'Paste', key: 'paste' },
];

export const FolderContextMenuData: ContextMenuData[] = [
  { title: 'Rename', key: 'rename' },
  { title: 'Delete', key: 'delete' },
  { title: 'Cut', key: 'cut' },
  { title: 'Copy', key: 'copy' },
  { title: 'Paste', key: 'paste' },
  { title: 'New File', key: 'new_file' },
  { title: 'New Folder', key: 'new_folder' },
];

export const getContextMenudata = (nodeType: string, isNodeCopied: boolean): ContextMenuData[] => {
  const baseMenu = nodeType === 'file' ? [...FileContextMenuData] : [...FolderContextMenuData];
  if (isNodeCopied) {
    baseMenu.splice(4, 0, { title: 'paste', key: 'paste' });
  }
  return baseMenu;
};
