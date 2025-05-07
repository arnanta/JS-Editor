import { AddIcon, DeleteIcon, CloseIcon, SidebarHidden } from '@/assets/icons';
import { HEADER_DOM, TerminalData } from '@/types';

const HEADER_ICON_DATA: HEADER_DOM = {
  'split-terminal': SidebarHidden,
  'add-terminal': AddIcon,
  close: CloseIcon,
  delete: DeleteIcon,
};

const initialTerminalData = {
  title: 'Terminal',
  CurrentInput: '',
  CurrentPath: '',
  terminalValues: [],
} as TerminalData;
export default { HEADER_ICON_DATA, initialTerminalData };
