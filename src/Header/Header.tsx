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
import { HeaderConstants, TerminalConstants } from '@/constants';
import TerminalContext from '@/contexts/Terminal/context';
import FileContext from '@/contexts/File/Context';

const Header = () => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const { root } = useContext(FileContext);
  const headerRef = useRef<HTMLDivElement>(null);
  const { showSidebar, showConsole, onClickSideBarIcon, onClickConsoleIcon } =
    useContext(ViewContext);
  const { onCreateUpdateTerminalData, terminalData } = useContext(TerminalContext);

  const handleConsoleIconClick = () => {
    onClickConsoleIcon();
    if (terminalData.size === 0 && root) {
      TerminalConstants.initialTerminalData.CurrentPath = root.path;
      onCreateUpdateTerminalData(TerminalConstants.initialTerminalData);
    }
  };
  window.addEventListener('click', (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const path = event.composedPath();
    if (headerRef.current && !path.includes(headerRef.current)) {
      let isHeaderModalPresent = false;

      path.forEach((el) => {
        if ((el as HTMLElement).id === 'header-modal') {
          isHeaderModalPresent = true;
        }
      });
      !isHeaderModalPresent && setIsToolbarVisible(false);
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
          onClickOptions={toggleToolbarVisibilty}
          data={HeaderConstants.headerToolbarData}
          htmlRef={headerRef.current}
        />
      )}
      <div className={style.slot_container}>
        <div className={style.icon_container} onClick={onClickSideBarIcon}>
          {showSidebar ? <SidebarVisible /> : <SidebarHidden />}
        </div>
        <div className={style.icon_container} onClick={handleConsoleIconClick}>
          {showConsole ? <BottomSectionVisible /> : <BottomSectionHidden />}
        </div>
      </div>
    </div>
  );
};

export default Header;
