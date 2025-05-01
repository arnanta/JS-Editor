import { handleToolbarClick } from '@/Header/helper';
const headerToolbarData = [
  {
    title: 'File',
    key: 'file',
    path: 'file',
    childData: [
      {
        title: 'File1',
        key: 'file1',
        path: 'file/file1',
        childData: [],
        onClick: function () {
          handleToolbarClick({ title: this.title, path: this.path });
        },
      },
      {
        title: 'File2',
        key: 'file2',
        path: 'file/file2',
        childData: [],
        onClick: function () {
          handleToolbarClick({ title: this.title, path: this.path });
        },
      },
      {
        title: 'File3',
        key: 'file3',
        path: 'file/file3',
        childData: [],
        onClick: function () {
          handleToolbarClick({ title: this.title, path: this.path });
        },
      },
    ],
  },
  {
    title: 'Terminal',
    key: 'terminal',
    path: 'terminal',
    childData: [
      {
        title: 'Terminal1',
        key: 'terminal1',
        path: 'terminal/terminal1',
        childData: [
          {
            title: 'Terminal1.1',
            key: 'terminal1.1',
            path: 'terminal/terminal1/terminal1.1',
            childData: [],
            onClick: function () {
              handleToolbarClick({ title: this.title, path: this.path });
            },
          },
        ],
      },
      {
        title: 'Terminal2',
        key: 'terminal2',
        path: 'terminal/terminal2',
        childData: [],
        onClick: function () {
          handleToolbarClick({ title: this.title, path: this.path });
        },
      },
    ],
  },
  {
    title: 'Help',
    key: 'help',
    path: 'help',
    childData: [],
    onClick: function () {
      handleToolbarClick({ title: this.title, path: this.path });
    },
  },
];

export default { headerToolbarData };
