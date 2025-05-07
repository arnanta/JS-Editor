import React, { JSX, useContext } from 'react';
import { TerminalConstants } from '@/constants';
import TerminalContext from '@/contexts/Terminal/context';
import { TERMINAL_HEADER_ACTION } from '@/types';
import ViewContext from '@/contexts/View/Context';
import FileContext from '@/contexts/File/Context';

const TerminalHeader = () => {
  const { root } = useContext(FileContext);
  const { onDeleteTerminal, onCreateUpdateTerminalData, selectedTerminal } =
    useContext(TerminalContext);
  const { onClickConsoleIcon } = useContext(ViewContext);

  const handleTerminalActionClick = (event: React.MouseEvent, action: string) => {
    event.stopPropagation();
    if (action === TERMINAL_HEADER_ACTION.DELETE) {
      onDeleteTerminal(selectedTerminal);
    } else if (action === TERMINAL_HEADER_ACTION.CLOSE) {
      onClickConsoleIcon();
    } else if (action === TERMINAL_HEADER_ACTION['ADD-TERMINAL'] && root) {
      TerminalConstants.initialTerminalData.CurrentPath = root.path;
      onCreateUpdateTerminalData(TerminalConstants.initialTerminalData);
    }
  };
  return (
    <div>
      {(
        Object.entries(TerminalConstants.HEADER_ICON_DATA) as [
          TERMINAL_HEADER_ACTION,
          () => JSX.Element,
        ][]
      ).map(([action, IconComponent]) => (
        <span key={action} onClick={(event) => handleTerminalActionClick(event, action)}>
          <IconComponent />
        </span>
      ))}
    </div>
  );
};

export default TerminalHeader;
