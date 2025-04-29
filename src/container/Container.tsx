import Header from '@/Header';
import ViewContext from '@/contexts/View/Context';
import { Fragment, useContext } from 'react';
import FileExplorer from '@/Explorer/FileExplorer';
import style from './Container.module.css';
const Container = () => {
  const { showConsole, showSidebar } = useContext(ViewContext);

  return (
    <Fragment>
      <Header />
      <div className={style.middle_container}>
        {showSidebar ? (
          <div className={style.left}>
            <FileExplorer />
          </div>
        ) : null}
        <div className={style.right}>
          <div>Editor</div>
        </div>
      </div>
      {showConsole ? <div className={style.console_container}>Console</div> : null}
    </Fragment>
  );
};

export default Container;
