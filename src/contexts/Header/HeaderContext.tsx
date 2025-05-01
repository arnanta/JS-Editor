import { useState } from 'react';
import HeaderToolbarContext from '@/contexts/Header/context';

const HeaderToolbarContextWrapper = ({ children }: ContextWrapperProps) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);

  const toggleToolbarVisibilty = () => {
    setIsToolbarVisible((prev) => !prev);
  };

  return (
    <HeaderToolbarContext.Provider
      value={{
        isToolbarVisible,
        toggleToolbarVisibilty,
      }}
    >
      {children}
    </HeaderToolbarContext.Provider>
  );
};

export default HeaderToolbarContextWrapper;
