import { useEffect, useRef, useState } from 'react';
import style from './Terminal.module.css';
import { isCDCommand, getCDNewPath } from '../Helper/helper';

// Define the type for terminal values
type TerminalValue = {
  key: string;
  value: string;
};

// Define the type for the Terminal component's props
type TerminalProps = {
  path: string;
  onEnterClick: (data: TerminalValue) => void;
  terminalValue?: string;
};

const Terminal = ({ path, onEnterClick, terminalValue = '' }: TerminalProps) => {
  const [currentInput, setCurrentInput] = useState('');
  const [CurrentPath, setCurrentPath] = useState(path);
  const [terminalValues, setTerminalValues] = useState<TerminalValue[]>([]);
  const terminalRef = useRef<HTMLInputElement | null>(null);

  const handleClickOnTerminal = (): void => {
    const input = terminalRef.current;
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentInput(event.target.value);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      if (value.toLowerCase() === 'cls') {
        setTerminalValues([]);
        setCurrentInput('');
      } else if (isCDCommand(value)) {
        const newPath = getCDNewPath(value, CurrentPath);
        setCurrentPath(newPath);
        setCurrentInput('');
        setTerminalValues((prev) => [...prev, { key: CurrentPath, value: value }]);
      } else {
        const data = { key: path, value: value };
        setTerminalValues((prev) => [...prev, data]);
        setCurrentInput('');
        onEnterClick(data);
      }
    }
  };

  useEffect(() => {
    handleClickOnTerminal();
  }, []);

  return (
    <div className={style.terminal_container} onClick={handleClickOnTerminal}>
      {terminalValues.map((item, index) => (
        <div key={index} className={style.terminal_value}>
          <span>{'$ '}</span>
          <span>{item.key}</span>
          <span>{'>'}</span>
          <span>{item.value}</span>
        </div>
      ))}
      <div className={style.terminal_input}>
        <span>{'$ '}</span>
        <span>{CurrentPath}</span>
        <span>{'>'}</span>
        <span>{currentInput}</span>
        <span className={style.blinking_cursor}>|</span>
        <input
          ref={terminalRef}
          type="text"
          style={{ width: '0.25rem', opacity: '0' }}
          value={currentInput}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
      </div>
    </div>
  );
};

export default Terminal;
