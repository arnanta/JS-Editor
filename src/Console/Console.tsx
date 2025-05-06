import React from 'react';
import { Terminal } from './index';
import style from './Console.module.css';
import TerminalList from './Component/TreminalList/TerminalList';
import TerminalHeader from './Component/TerminalHeader/TerminalHeader';

const Console = () => {
  return (
    <React.Fragment>
      <div className={style.multiConsole_terminal}>
        <div className={style.terminal_header}>
          <div>Terminal</div>
          <div className={style.header_action}>
            <TerminalHeader />
          </div>
        </div>
        <div className={style.terminal}>
          <div className={style.terminal_editor}>
            <Terminal />
          </div>
          <div className={style.terminal_list}>
            <TerminalList />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Console;
