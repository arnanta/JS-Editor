import style from './contextMenu.module.css';
import { createPortal } from 'react-dom';
import { JSX, useState } from 'react';

type ContextMenuProps = {
  data: any;
  onClickOptions: (item: { title: string; path: string }) => void;
  htmlRef: HTMLElement;
};

type ToolbarDropdownProps = {
  options: any;
  onClickToolbarItem: (item: { title: string; path: string }) => void;
};

const ToolbarDropdown = ({ options, onClickToolbarItem }: ToolbarDropdownProps): JSX.Element => {
  const [childData, setChildData] = useState<any[] | null>(null);
  const [htmlref, setHtmlref] = useState<any>(null);

  const handleToolbarOptionClick = (option: any, targetElement: any): void => {
    setHtmlref(targetElement);
    if (option.childData?.length) {
      setChildData(option.childData);
    } else {
      onClickToolbarItem({ title: option.title, path: option.path });
    }
  };

  return (
    <>
      {options.map((option: any) => (
        <div
          onClick={(event) => handleToolbarOptionClick(option, event.target)}
          className={style.header_options}
          key={option.key}
        >
          {option.title}
        </div>
      ))}
      {childData && (
        <ContextMenu
          data={childData}
          onClickOptions={onClickToolbarItem}
          htmlRef={htmlref}
        />
      )}
    </>
  );
};

const ContextMenu = ({ data, onClickOptions, htmlRef }: ContextMenuProps): JSX.Element => {
  return createPortal(
    <div className={style.header_modal}>
      <ToolbarDropdown
        options={data}
        onClickToolbarItem={onClickOptions}
      />
    </div>,
    htmlRef
  );
};

export default ContextMenu;
