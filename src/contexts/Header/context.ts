import { createContext } from 'react';

type ViewContextType = {
  isToolbarVisible: boolean;
  toggleToolbarVisibilty: () => void;
};

const initialState: ViewContextType = {
  isToolbarVisible: false,
  toggleToolbarVisibilty: () => {},
};

const ViewContext = createContext(initialState);

export default ViewContext;
