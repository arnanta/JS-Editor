import { useState, useContext, useRef } from 'react';
import style from './Header.module.css';
import {
  BottomSectionHidden,
  BottomSectionVisible,
  ChevronDown,
  ChevronUp,
  SidebarHidden,
  SidebarVisible,
} from '@assets/icons';

import ViewContext from '@/contexts/View/Context';
import { ContextMenu } from '@/components';
import { HeaderConstants } from '@/constants';

// Define a separate type for the toolbar option
type ToolbarOption = {
  title: string;
  path: string;
};

const Header = () => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { showSidebar, showConsole, onClickSideBarIcon, onClickConsoleIcon } =
    useContext(ViewContext);

  const handletoolbarClick = ({ title, path }: ToolbarOption) => {
    console.log('🚀 ~ handletoolbarClick ~ path:', path);
    switch (title) {
      case 'File':
        console.log('File clicked');
        break;
      case 'Terminal':
        onClickConsoleIcon();
        break;
      case 'Help':
        console.log('Help clicked');
        break;
    }
    toggleToolbarVisibilty();
  };

  window.addEventListener('click', (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const path = event.composedPath();
    if (headerRef.current && !path.includes(headerRef.current)) {
      setIsToolbarVisible(false);
    }
  });
  const toggleToolbarVisibilty = () => {
    setIsToolbarVisible((prev) => !prev);
  };

  return (
    <div className={style.container}>
      <div ref={headerRef} className={style.toolbar} onClick={toggleToolbarVisibilty}>
        Header
        {isToolbarVisible ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isToolbarVisible && headerRef.current && (
        <ContextMenu
          data={HeaderConstants.headerToolbarData}
          htmlRef={headerRef.current}
          onClickOptions={handletoolbarClick}
        />
      )}
      <div className={style.slot_container}>
        <div className={style.icon_container} onClick={onClickSideBarIcon}>
          {showSidebar ? <SidebarVisible /> : <SidebarHidden />}
        </div>
        <div className={style.icon_container} onClick={onClickConsoleIcon}>
          {showConsole ? <BottomSectionVisible /> : <BottomSectionHidden />}
        </div>
      </div>
    </div>
  );
};

export default Header;
