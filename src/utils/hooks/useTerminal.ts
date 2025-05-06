import { useCallback, useEffect, useState } from 'react';
import { getCDNewPath, isCDCommand } from '@/Console/Helper/helper';
import { TerminalValue, UseTerminalReturn } from '@/types';

const useTerminal = (terminalRef: HTMLElement | null): UseTerminalReturn => {
  const [terminalValues, setTerminalValues] = useState<TerminalValue[]>([]);

  const handleClickOnTerminal = useCallback(() => {
    const terminalInputRef = terminalRef ? terminalRef.querySelector('input') : null;
    if (terminalInputRef) {
      terminalInputRef.focus();
      terminalInputRef.setSelectionRange(
        terminalInputRef.value.length,
        terminalInputRef.value.length,
      );
    }
  }, [terminalRef]);

  const handleKeydown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentPath: string,
  ): void => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      if (value.toLowerCase() === 'cls') {
        setTerminalValues([]);
      } else if (isCDCommand(value)) {
        const newPath = getCDNewPath(value, currentPath);
        console.log('🚀 ~ useTerminal ~ newPath:', newPath);
        setTerminalValues((prev) => [...prev, { key: currentPath, value: value }]);
      } else {
        const data = { key: currentPath, value: value };
        setTerminalValues((prev) => [...prev, data]);
      }
    }
  };

  useEffect(() => {
    handleClickOnTerminal();

    if (terminalRef) {
      terminalRef.addEventListener('click', () => {
        handleClickOnTerminal();
      });

      () => {
        terminalRef.removeEventListener('click', () => {
          handleClickOnTerminal();
        });
      };
    }
  }, [terminalRef, handleClickOnTerminal]);

  return {
    terminalValues,
    handleKeydown,
  };
};

export default useTerminal;
