import { useState } from 'react';
import ViewContext from '@/contexts/View/Context';
import { ContextWrapperProps } from '@/types';

const ViewContextWrapper = ({ children }: ContextWrapperProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showConsole, setShowConsole] = useState<boolean>(false);

  const onClickSideBarIcon = () => {
    setShowSidebar((prev) => !prev);
  };

  const onClickConsoleIcon = () => {
    setShowConsole((prev) => !prev);
  };

  return (
    <ViewContext.Provider
      value={{
        showSidebar,
        showConsole,
        onClickSideBarIcon,
        onClickConsoleIcon,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextWrapper;
