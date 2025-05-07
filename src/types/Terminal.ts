import { JSX } from 'react';

export enum TERMINAL_HEADER_ACTION {
  'SPLIT-TERMINAL' = 'split-terminal',
  'ADD-TERMINAL' = 'add-terminal',
  'CLOSE' = 'close',
  'DELETE' = 'delete',
}

export type HEADER_DOM = {
  [key in TERMINAL_HEADER_ACTION]: () => JSX.Element;
};
export type TerminalValue = {
  key: string;
  value: string;
};

export type UseTerminalReturn = {
  handleKeydown: (event: React.KeyboardEvent<HTMLInputElement>, currentPath: string) => void;
  terminalValues: TerminalValue[];
};

export type TerminalData = {
  title: string;
  CurrentInput: string;
  CurrentPath: string;
  terminalValues: {
    path: string;
    value: string;
  }[];
};
