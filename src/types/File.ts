export type FileNode = {
  type: string;
  name: string;
  children?: FileNode[];
};
export type FileObject = {
  name: string;
  path: string;
  isDirty: boolean;
  isActive: boolean;
};
