import TerminalContext from '@/contexts/Terminal/context';
import style from './TerminalListItems.module.css';
import { DeleteIcon } from '@/assets/icons';
import React, { useContext } from 'react';
import { TerminalData } from '@/types';

type TerminalListItemsProps = {
  terminalKey: string;
  terminalData: TerminalData;
};

const TerminalListItems = ({ terminalKey, terminalData }: TerminalListItemsProps) => {
  const { onDeleteTerminal, onSelectTerminal, selectedTerminal } = useContext(TerminalContext);
  const handleTerminalActionClick = (event: React.MouseEvent, terminalKey: string) => {
    event.stopPropagation();
    onDeleteTerminal(terminalKey);
  };
  return (
    <React.Fragment>
      <div
        className={`${style.terminal_list} ${
          terminalKey === selectedTerminal ? style.selected : null
        }`}
        onClick={() => onSelectTerminal(terminalKey)}
      >
        {terminalData.title}
        <span onClick={(event) => handleTerminalActionClick(event, terminalKey)}>
          <DeleteIcon />
        </span>
      </div>
    </React.Fragment>
  );
};

export default TerminalListItems;
