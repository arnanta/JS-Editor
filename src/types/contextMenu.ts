export type ContextMenuData = {
  title: string;
  path?: string;
  key: string;
  subMenu?: Array<ContextMenuData>;
  onClick?: Function;
};

export type ContextMenuOptions = {
  option: ContextMenuData;
  handleToolbarOptionClick: (option: ContextMenuData, targetElement: HTMLElement | null) => void;
  onClickOptions: () => void;
  isSelected: boolean;
};

export type ContextMenu = {
  data: Array<ContextMenuData>;
  onClickOptions: () => void;
  htmlRef: HTMLElement;
  isNested?: boolean;
  position?: string;
};
