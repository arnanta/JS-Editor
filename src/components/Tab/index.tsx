import TabHeader from '@/components/Tab/components/Header';

import style from './style.module.css';
import { useContext } from 'react';
import FileContext from '@/contexts/File/Context';

const Tab = () => {
  const { openedFiles } = useContext(FileContext);

  const renderTabs = () => {
    return Array.from(openedFiles.entries()).map(([fileName, file]) => (
      <TabHeader key={fileName} file={file!} />
    ));
  };

  return (
    <div className={style.tab_container}>
      <div className={style.header_container}>{renderTabs()}</div>
      <div className={style.main_editor}>Main Editor area</div>
    </div>
  );
};

export default Tab;
