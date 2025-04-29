import { useRef } from 'react';
import style from '../contextMenu.module.css';
import { ChevronRight } from '@assets/icons';

const ContextMenuOptions = ({ option, handleToolbarOptionClick, isSelected }: any) => {
  const targetElement = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: any, targetElement: any) => {
    handleToolbarOptionClick(option, targetElement.current);
  };

  return (
    <div
      className={`${style.header_options} ${isSelected ? style.selected_options : ''}`}
      onClick={() => handleOptionClick(option, targetElement)}
    >
      <div>{option.title}</div>
      {option.childData?.length > 0 && (
        <div ref={targetElement} className={style.options_icon}>
          <ChevronRight />
        </div>
      )}
    </div>
  );
};

export default ContextMenuOptions;
