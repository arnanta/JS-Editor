import { useState, useContext } from 'react';
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

const Header = () => {
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(false);
  const { showSidebar, showConsole, onClickSideBarIcon, onClickConsoleIcon } =
    useContext(ViewContext);

  const toggleToolbarVisibilty = () => {
    setIsToolbarVisible((prev) => !prev);
  };

  return (
    <div className={style.container}>
      <div className={style.toolbar} onClick={toggleToolbarVisibilty}>
        Header
        {isToolbarVisible ? <ChevronUp /> : <ChevronDown />}
      </div>
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
