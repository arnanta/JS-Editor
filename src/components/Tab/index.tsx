import Editor from '@monaco-editor/react';

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
      <div className={style.main_editor}>
        {/* placeholder for breadcrumb */}
        <Editor
          theme="vs-dark"
          width="100%"
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          options={{
            scrollBeyondLastLine: false, // Important for height calculation
            minimap: { enabled: true }, // Optional: disable minimap for cleaner look
            automaticLayout: true, // Adjust layout on container resize
          }}
        />
      </div>
    </div>
  );
};

export default Tab;
