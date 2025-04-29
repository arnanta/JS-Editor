import style from './contextMenu.module.css';
import { createPortal } from 'react-dom';
import { JSX, useState } from 'react';
import ContextMenuOptions from './Components/ContextMenuOptions';

type ContextMenuProps = {
  data: any;
  onClickOptions: (item: { title: string; path: string }) => void;
  htmlRef: HTMLElement;
  isNested?: boolean;
};

type ToolbarDropdownProps = {
  options: any;
  onClickToolbarItem: (item: { title: string; path: string }) => void;
};

const ToolbarDropdown = ({ options, onClickToolbarItem }: ToolbarDropdownProps): JSX.Element => {
  const [childData, setChildData] = useState<any[] | null>(null);
  const [htmlref, setHtmlref] = useState<any>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleToolbarOptionClick = (option: any, targetElement: any): void => {
    setHtmlref(targetElement);
    setSelectedKey(option.key); // Update the selected option
    if (option.childData?.length) {
      setChildData(option.childData);
    } else {
      onClickToolbarItem({ title: option.title, path: option.path });
    }
  };

  return (
    <>
      {options.map((option: any) => (
        <ContextMenuOptions
          option={option}
          handleToolbarOptionClick={handleToolbarOptionClick}
          isSelected={selectedKey === option.key}
        />
      ))}
      {childData && (
        <ContextMenu
          data={childData}
          onClickOptions={onClickToolbarItem}
          htmlRef={htmlref}
          isNested={true}
        />
      )}
    </>
  );
};

const ContextMenu = ({
  data,
  onClickOptions,
  htmlRef,
  isNested = false,
}: ContextMenuProps): JSX.Element => {
  return createPortal(
    <div className={`${style.header_modal} ${isNested ? style.subheader_modal : ''}`}>
      <ToolbarDropdown options={data} onClickToolbarItem={onClickOptions} />
    </div>,
    htmlRef,
  );
};

export default ContextMenu;
