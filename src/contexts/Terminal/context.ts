import { TerminalData } from '@/types';
import { createContext } from 'react';

type Terminal = {
  selectedTerminal: string;
  terminalData: Map<string, TerminalData>;
  onSelectTerminal: (key: string) => void;
  onDeleteTerminal: (key: string) => void;
  getSelectedTerminalData: () => void;
  setTerminalRef: (ref: HTMLElement | null) => void;
  onCreateUpdateTerminalData: (newTerminalData: TerminalData, key?: string) => void;
  handleEnterClick: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCurrentInput: (value: string) => void;
};

const initialState: Terminal = {
  selectedTerminal: '',
  terminalData: new Map(),
  onSelectTerminal: () => {},
  onDeleteTerminal: () => {},
  getSelectedTerminalData: () => {},
  setTerminalRef: () => {},
  onCreateUpdateTerminalData: () => {},
  handleEnterClick: () => {},
  handleCurrentInput: () => {},
};

const TerminalContext = createContext(initialState);

export default TerminalContext;
