import { useEffect, useRef, useState } from 'react';
import style from '../contextMenu.module.css';
import { ChevronRight } from '@assets/icons';
import ContextMenu from '@/components/ContextMenu/ContextMenu';

const ContextMenuOptions = ({ option, handleToolbarOptionClick, isSelected }: any) => {
  const targetElement = useRef<HTMLDivElement>(null);
  const [showNestedContextMenu, setShowNestedContextMenu] = useState<boolean>(false);

  const handleOptionClick = (option: any) => {
    if (option.childData && option.childData.length) {
      setShowNestedContextMenu(true);
    } else {
      option.onClick?.();
    }
    handleToolbarOptionClick(option, targetElement.current);
  };

  useEffect(() => {
    if (!isSelected) setShowNestedContextMenu(false);
  }, [isSelected]);

  return (
    <div
      className={`${style.header_options} ${isSelected ? style.selected_options : ''}`}
      onClick={() => handleOptionClick(option)}
      onMouseEnter={() => handleOptionClick(option)}
      ref={targetElement}
    >
      <div>{option.title}</div>
      {option.childData?.length > 0 && (
        <div className={style.options_icon}>
          <ChevronRight />
        </div>
      )}
      {option.childData && targetElement && showNestedContextMenu && (
        <ContextMenu
          data={option.childData}
          onClickOptions={handleToolbarOptionClick}
          htmlRef={targetElement.current!}
          isNested={true}
        />
      )}
    </div>
  );
};

export default ContextMenuOptions;
