import cp from "child_process";

export const checkModule = (module: string, dev?: boolean): any => {
  try {
    return require(module);
  } catch (e) {
    throw new Error(`missing ${module} module\nrun npm install ${module} --save${dev ? "" : "-dev"}`);
  }
}

export const execSync = (cmd: string, options?: cp.ExecSyncOptionsWithBufferEncoding) => {
  console.log(cmd);
  console.log(cp.execSync(
    cmd,
    options ? { stdio: 'inherit', ...options } : { stdio: 'inherit' }
  ).toString());
}