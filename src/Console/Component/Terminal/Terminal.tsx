import style from './Terminal.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { TerminalData } from '@/types';
import TerminalContext from '@/contexts/Terminal/context';

const Terminal = () => {
  const [selectedTerminalData, setSelectedTerminalData] = useState<TerminalData>();
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const { handleCurrentInput, handleEnterClick, setTerminalRef, getSelectedTerminalData } =
    useContext(TerminalContext);

  useEffect(() => {
    const tempSelectedTerminal = getSelectedTerminalData();
    if (tempSelectedTerminal !== undefined) {
      setSelectedTerminalData(tempSelectedTerminal);
    }
    setTerminalRef(terminalRef.current);
  }, [setTerminalRef, getSelectedTerminalData]);

  const getTerminalPrompt = () => {
    return selectedTerminalData?.terminalValues.map((item, index) => (
      <div key={index} className={style.terminal_value}>
        <span>{'$ '}</span>
        <span>{item.path}</span>
        <span>{'>'}</span>
        <span>{item.value}</span>
      </div>
    ));
  };

  return (
    <div className={style.terminal_container} ref={terminalRef}>
      {getTerminalPrompt()}
      <div className={style.terminal_input}>
        <span>{'$ '}</span>
        <span>{selectedTerminalData ? selectedTerminalData.CurrentPath : ''}</span>
        <span>{'>'}</span>
        <span>{selectedTerminalData ? selectedTerminalData.CurrentInput : ''}</span>
        <span className={style.blinking_cursor}>|</span>
        <input
          type="text"
          value={
            selectedTerminalData && selectedTerminalData.CurrentInput.length
              ? selectedTerminalData.CurrentInput
              : ''
          }
          onChange={(event) => handleCurrentInput(event.target.value)}
          onKeyDown={handleEnterClick}
        />
      </div>
    </div>
  );
};

export default Terminal;
