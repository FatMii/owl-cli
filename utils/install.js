const spawn = require('cross-spawn')
// interface installProps {
//   cwd: string  // 项目路径
//   package: string //包管理器 yarn 或者 npm
// }
let options = {
  cwd: "",
  package: ""
}
module.exports = async (options) => {
  const cwd = options.cwd
  return new Promise((resolve, reject) => {
    const command = options.package
     const args = ['install']
    const child = spawn(command, args, {
      cwd,
      stdio: ['pipe', process.stdout, process.stderr],
    })

    child.once('close', (code) => {
      console.log(code);
      if (code !== 0) {
        reject({
          // command: `${command} ${args.join(' ')}`,
          command: `${command} install`,
        })
        return
      }
      resolve(0)
    })
    child.once('error', reject)
  })
}