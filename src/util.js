const cp = require('child_process');
const regexExe = /((.*).exe).*/g;

/**
 *  @return Promise, resolve will return running processes
 */
exports.running = () => {

  return new Promise((resolve, reject) => {

    cp.exec('tasklist /fi "Status eq RUNNING"', (err, stdout, stderr) => {

      if (err || stderr)
        return reject(err || stderr);

      let processes = [];
      let m = regexExe.exec(stdout);

      while (m) {
        processes.push(m[1]);
        m = regexExe.exec(stdout);
      }

      resolve(processes);

    });

  });

}

/**
 * @param a1 first array
 * @param a2 second array
 * @return difference object where left=(a1-a2) and right=(a2-a1)
 */
exports.diff = (a1, a2) => {
  return {
    left: a1.filter(x => a2.indexOf(x) < 0),
    right: a2.filter(x => a1.indexOf(x) < 0)
  };
}
