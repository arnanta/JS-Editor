import { useEffect, useRef, useState } from 'react';
import style from '../contextMenu.module.css';
import { ChevronRight } from '@assets/icons';
import ContextMenu from '@/components/ContextMenu/ContextMenu';
import { ContextMenuData } from '@/types';

const ContextMenuOptions = ({
  option,
  handleToolbarOptionClick,
  onClickOptions,
  isSelected,
}: ContextMenuData.ContextMenuOptions) => {
  const targetElement = useRef<HTMLDivElement>(null);
  const [showNestedContextMenu, setShowNestedContextMenu] = useState<boolean>(false);

  const handleOptionClick = (option: ContextMenuData.ContextMenuData) => {
    if (option.subMenu && option.subMenu.length) {
      setShowNestedContextMenu(true);
    } else {
      onClickOptions();
      option.onClick && option.onClick();
    }
    handleToolbarOptionClick(option, targetElement.current);
  };

  const handleOptionMouseEnter = (option: ContextMenuData.ContextMenuData) => {
    if (option.subMenu && option.subMenu.length) {
      setShowNestedContextMenu(true);
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
      onMouseEnter={() => handleOptionMouseEnter(option)}
      ref={targetElement}
    >
      <div>{option.title}</div>
      {option.subMenu && option.subMenu.length > 0 && (
        <div className={style.options_icon}>
          <ChevronRight />
        </div>
      )}
      {option.subMenu && targetElement && showNestedContextMenu && (
        <ContextMenu
          onClickOptions={onClickOptions}
          data={option.subMenu}
          htmlRef={targetElement.current!}
          isNested={true}
        />
      )}
    </div>
  );
};

export default ContextMenuOptions;
