export const checkModule = (module: string): any => {
  try {
    return require(module);
  } catch(e) {
    throw new Error(`missing ${module} module\nrun npm install ${module} --save`);
  }
}
