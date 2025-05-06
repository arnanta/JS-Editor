import React, { useContext } from 'react';
import TerminalContext from '@/contexts/Terminal/context';
import TerminalListItems from '../TerminalListItems/TerminalListItems';

const TerminalList = () => {
  const { terminalData } = useContext(TerminalContext);

  return (
    <React.Fragment>
      <div>
        {Array.from(terminalData.entries()).map(([key, value]) => (
          <TerminalListItems key={key} terminalKey={key} terminalData={value} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default TerminalList;
