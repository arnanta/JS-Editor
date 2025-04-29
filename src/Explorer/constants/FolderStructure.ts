export const folderStructure = {
  type: 'folder',
  name: 'root',
  children: [
    {
      type: 'folder',
      name: 'js-Editor',
      children: [
        { type: 'file', name: 'App.tsx' },
        { type: 'file', name: 'main.tsx' },
        {
          type: 'folder',
          name: 'components',
          children: [
            { type: 'file', name: 'Button.tsx' },
            { type: 'file', name: 'Header.tsx' },
          ],
        },
      ],
    },
    {
      type: 'file',
      name: 'package.json',
    },
    {
      type: 'file',
      name: 'vite.config.ts',
    },
  ],
};
