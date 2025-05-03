import React, { useState } from 'react';
import { Terminal } from './index';
import { AddIcon, CloseIcon, DeleteIcon, SidebarHidden } from '@/assets/icons';
import style from './Console.module.css';

type TerminalItem = {
  name: string;
  key: string;
};

const Console = () => {
  const [terminalData, setTerminalData] = useState<TerminalItem[]>([
    { name: 'Terminal', key: crypto.randomUUID() },
    { name: 'Terminal', key: crypto.randomUUID() },
    { name: 'Terminal', key: crypto.randomUUID() },
    { name: 'Terminal', key: crypto.randomUUID() },
  ]);

  const [activeTerminal, setActiveTerminal] = useState<string>(terminalData[0]?.key);
  const path = 'root\\JS-Editor';

  const handleEnterClick = (data: any) => {
    console.log('🚀 ~ handleEnterClick ~ data:', data);
  };

  const handleTerminalActionClick = (event: React.MouseEvent, action: string, terminalKey = '') => {
    event.stopPropagation();
    event.preventDefault();
    console.log('🚀 ~ handleTerminalActionClick ~ action:', action);

    if (action === 'add-terminal') {
      const newTerminal: TerminalItem = {
        name: 'Terminal',
        key: crypto.randomUUID(),
      };
      setTerminalData((prev) => [...prev, newTerminal]);
      setActiveTerminal(newTerminal.key);
    } else if (action === 'delete') {
      const keyToDelete = terminalKey || activeTerminal;
      setTerminalData((prev) => prev.filter((item) => item.key !== keyToDelete));

      // If deleting the active terminal, reset to another one
      if (activeTerminal === keyToDelete && terminalData.length > 1) {
        const remaining = terminalData.find((item) => item.key !== keyToDelete);
        if (remaining) setActiveTerminal(remaining.key);
      }
    }
  };

  const handleTerminalListClick = (selectedKey: string) => {
    setActiveTerminal(selectedKey);
  };

  return (
    <React.Fragment>
      <div className={style.multiConsole_terminal}>
        <div className={style.terminal_header}>
          <div>Terminal</div>
          <div className={style.header_action}>
            <span onClick={(event) => handleTerminalActionClick(event, 'split-screen')}>
              <SidebarHidden />
            </span>
            <span onClick={(event) => handleTerminalActionClick(event, 'delete')}>
              <DeleteIcon />
            </span>
            <span onClick={(event) => handleTerminalActionClick(event, 'close')}>
              <CloseIcon />
            </span>
            <span onClick={(event) => handleTerminalActionClick(event, 'add-terminal')}>
              <AddIcon />
            </span>
          </div>
        </div>
        <div className={style.terminal}>
          <div className={style.terminal_editor}>
            <Terminal path={path} onEnterClick={handleEnterClick} />
          </div>
          <div className={style.terminal_list}>
            <div>
              <ul className={style.terminal_ul}>
                {terminalData.map((item) => (
                  <li
                    key={item.key}
                    className={style.terminal_li}
                    onClick={() => handleTerminalListClick(item.key)}
                  >
                    {item.name}
                    <span onClick={(event) => handleTerminalActionClick(event, 'delete', item.key)}>
                      <DeleteIcon />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Console;
