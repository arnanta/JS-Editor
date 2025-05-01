import Header from '@/Header';
import ViewContext from '@/contexts/View/Context';
import { Fragment, useContext } from 'react';
import FileExplorer from '@/Explorer/FileExplorer';
import style from './Container.module.css';
import NavigationContextWrapper from '@/contexts/Navigation/NavigationContext';
import Editor from '@/Editor';
import HeaderToolbarContextWrapper from '@/contexts/Header/HeaderContext';
const Container = () => {
  const { showConsole, showSidebar } = useContext(ViewContext);

  return (
    <Fragment>
      <HeaderToolbarContextWrapper>
        <Header />
      </HeaderToolbarContextWrapper>
      <NavigationContextWrapper>
        <div className={style.middle_container}>
          {showSidebar ? (
            <div className={style.left}>
              <FileExplorer />
            </div>
          ) : null}
          <div className={style.right}>
            <Editor />
          </div>
        </div>
      </NavigationContextWrapper>
      {showConsole ? <div className={style.console_container}>Console</div> : null}
    </Fragment>
  );
};

export default Container;
