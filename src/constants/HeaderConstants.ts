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
      },
      {
        title: 'File2',
        key: 'file2',
        path: 'file/file2',
      },
      {
        title: 'File3',
        key: 'file3',
        path: 'file/file3',
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
          },
        ],
      },
      {
        title: 'Terminal2',
        key: 'terminal2',
        path: 'terminal/terminal2',
      },
    ],
  },
  {
    title: 'Help',
    key: 'help',
    // onClick: Function
  },
];

export default { headerToolbarData };
