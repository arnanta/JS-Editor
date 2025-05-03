const isCDCommand = (command: string): boolean => {
  const cdRegex = RegExp(/^cd+/);
  const splitCommand = command.split(' ');
  if (splitCommand.length === 2) {
    if (cdRegex.test(splitCommand[0].trim())) {
      return true;
    } else return false;
  } else return false;
};
const getCDNewPath = (value: string, path: string) => {
  const splitValue = value.split(' ');
  const splitFolder = splitValue[1].split('/');
  const splitPath = path.split('\\');
  if (splitPath.length > 1 || !splitFolder.includes('..')) {
    splitFolder.forEach((item: string) => {
      if (item === '..') {
        splitPath.pop();
      } else if (item !== '.' && item.length) {
        splitPath.push(item);
      }
    });
  }
  console.log('🚀 ~ splitFolder.forEach ~ item:', splitPath);
  return splitPath.join('\\');
};
export { isCDCommand, getCDNewPath };
