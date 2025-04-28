import { createContext } from 'react';

type ViewContextType = {
  showSidebar: boolean;
  showConsole: boolean;
  onClickSideBarIcon: () => void;
  onClickConsoleIcon: () => void;
};

const initialState: ViewContextType = {
  showSidebar: false,
  showConsole: false,
  onClickSideBarIcon: () => {},
  onClickConsoleIcon: () => {},
};

const ViewContext = createContext(initialState);

export default ViewContext;
