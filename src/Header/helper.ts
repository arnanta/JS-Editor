import { useContext } from 'react';
import HeaderToolbarContext from '@/contexts/Header/context';

// Define a separate type for the toolbar option
type ToolbarOption = {
  title: string;
  path: string;
};

export const handleToolbarClick = ({ title, path }: ToolbarOption) => {
  const { toggleToolbarVisibilty } = useContext(HeaderToolbarContext);
  console.log('🚀 ~ handletoolbarClick ~ path:', path);
  switch (title) {
    case 'File':
      console.log('File clicked');
      break;
    case 'Terminal':
      console.log('File clicked');
      break;
    case 'Help':
      console.log('Help clicked');
      break;
  }
};
