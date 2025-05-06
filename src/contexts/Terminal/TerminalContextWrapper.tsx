import { useContext, useState } from 'react';
import TerminalContext from './context';
import { TerminalData } from '@/types';
import ViewContext from '../View/Context';
import useTerminal from '@/utils/hooks/useTerminal';

const TerminalContextWrapper = ({ children }: ContextWrapperProps) => {
  const { onClickConsoleIcon } = useContext(ViewContext);
  const [selectedTerminal, setSelectedTerminal] = useState<string>('');
  const [terminalData, setTerminalData] = useState<Map<string, TerminalData>>(new Map());
  const [terminalRef, setTerminalRef] = useState<HTMLElement | null>(null);

  const { handleKeydown } = useTerminal(terminalRef ? terminalRef : null);

  const onDeleteTerminal = (key: string) => {
    onSelectTerminal('');
    if (terminalData.size > 1) {
      let previousOpenTerminal = '';
      const openedTerminalKeys = Array.from(terminalData.keys());
      const currentSelectedTerminalIndex = openedTerminalKeys.indexOf(key);
      if (terminalData.size === 2) {
        if (currentSelectedTerminalIndex === 0) {
          previousOpenTerminal = openedTerminalKeys[1];
        } else {
          previousOpenTerminal = openedTerminalKeys[0];
        }
      } else if (terminalData.size > 2) {
        if (currentSelectedTerminalIndex === 0) {
          previousOpenTerminal = openedTerminalKeys[currentSelectedTerminalIndex + 1];
        } else previousOpenTerminal = openedTerminalKeys[currentSelectedTerminalIndex - 1];
      }
      onSelectTerminal(previousOpenTerminal);
    }
    terminalData.delete(key);
    if (terminalData.size === 0) {
      onSelectTerminal('');
      onClickConsoleIcon();
    }
  };

  const onSelectTerminal = (selectedKey: string) => {
    setSelectedTerminal(selectedKey);
  };

  const handleCurrentInput = (value: string) => {
    const selectedTerminalData = getSelectedTerminalData();
    if (selectedTerminalData) {
      const newSelectedTerminalData: TerminalData = {
        ...selectedTerminalData,
        CurrentInput: value.length ? value : '',
      };
      onCreateUpdateTerminalData(newSelectedTerminalData, selectedTerminal);
    }
  };

  const getSelectedTerminalData = () => {
    return terminalData.get(selectedTerminal);
  };
  const handleEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const selectedTerminalData = getSelectedTerminalData();
    if (event.key === 'Enter' && selectedTerminalData) {
      //update the context with the currentInput value and currentPath value for selected terminal
      const updatedData: TerminalData = {
        ...selectedTerminalData,
        CurrentInput: '',
        terminalValues: [
          ...(selectedTerminalData.terminalValues ?? []),
          { path: selectedTerminalData.CurrentPath, value: selectedTerminalData.CurrentInput },
        ],
      };
      onCreateUpdateTerminalData(updatedData, selectedTerminal);
      handleKeydown(event, selectedTerminalData.CurrentPath);
    }
  };

  const onCreateUpdateTerminalData = (newTerminalData: TerminalData, key = '') => {
    let cryptoKey = key;
    if (!cryptoKey.length) {
      cryptoKey = crypto.randomUUID();
    }
    const tempTerminalData = new Map(terminalData);
    tempTerminalData.set(cryptoKey, newTerminalData);
    setTerminalData(tempTerminalData);
    onSelectTerminal(cryptoKey);
  };

  return (
    <TerminalContext.Provider
      value={{
        selectedTerminal,
        terminalData,
        onSelectTerminal,
        onDeleteTerminal,
        onCreateUpdateTerminalData,
        getSelectedTerminalData,
        setTerminalRef,
        handleEnterClick,
        handleCurrentInput,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export default TerminalContextWrapper;
