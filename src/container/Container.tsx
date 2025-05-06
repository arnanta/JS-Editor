import Header from '@/Header';
import ViewContext from '@/contexts/View/Context';
import { Fragment, useContext } from 'react';
import FileExplorer from '@/Explorer/FileExplorer';
import style from './Container.module.css';
import Editor from '@/Editor';
import { Console } from '@/Console';

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
          <Editor />
        </div>
      </div>
      <div className={`${style.console_container} ${!showConsole ? style.hide_console : null}`}>
        <Console />
      </div>
    </Fragment>
  );
};

export default Container;
