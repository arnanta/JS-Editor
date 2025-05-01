import style from './contextMenu.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import ContextMenuOptions from './Components/ContextMenuOptions';

type ContextMenuProps = {
  data: any;
  onClickOptions: (item: { title: string; path: string }) => void;
  htmlRef: HTMLElement;
  isNested?: boolean;
  position?: string;
};

const ContextMenu = ({
  data,
  htmlRef,
  isNested = false,
  position = 'bottom',
}: ContextMenuProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleToolbarOptionClick = (option: any): void => {
    setSelectedKey(option.key); // Update the selected option
    // if (option.childData?.length) {
    // } else {
    //   onClickOptions({ title: option.title, path: option.path });
    // }
  };

  const getPopoverStyle = () => {
    if (htmlRef) {
      console.log('htmlRef', htmlRef, htmlRef.getBoundingClientRect());
      return {
        top: isNested
          ? htmlRef.getBoundingClientRect().top
          : position === 'bottom'
          ? htmlRef.getBoundingClientRect().bottom
          : htmlRef.getBoundingClientRect().top,
        left: htmlRef.getBoundingClientRect().right,
      };
    }
  };

  return createPortal(
    <div
      className={`${style.header_modal} ${isNested ? style.subheader_modal : null}`}
      style={getPopoverStyle()}
      id="header-modal"
    >
      {data.map((option: any) => (
        <ContextMenuOptions
          key={option.key}
          option={option}
          handleToolbarOptionClick={handleToolbarOptionClick}
          isSelected={selectedKey === option.key}
        />
      ))}
    </div>,
    document.body,
  );
};

export default ContextMenu;
