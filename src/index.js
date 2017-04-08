const util = require('./util');
const EventEmitter = require('events');
const winProcess = require('../build/Release/win_process');
const events = new EventEmitter();

var running = [];
var focus = null;

const regex = /.*(?:\/|\\)(.+)/g;

/**
  Ask Windows for running processes through a promise.
*/
var updateRunning = () => {

  util
    .running()
    .then(processes => {

      if (running.length) {

        /* 
         * left: get killed processes
         * right: get new started processes
         */
        let diff = util.diff(running, processes);

        update(processes);

        diff.left.forEach(p => {
          events.emit("kill", p);
        });

        diff.right.forEach(p => {
          events.emit("start", p);
        });

      } else {
        update(processes);
      }

    })

}

/**
 * Update running processes.
 */
var update = (processes) => {
  running = processes;
}

/**
 * Update Current Top Process.
 */
var updateFocus = () => {
  let m = regex.exec(winProcess.currentProcess());
  if (m && focus !== m[1]) {
    focus = m[1];
    events.emit('focus', focus);
  }
}

/**
 * @param {Number} running ms for run "updateRunning" function.
 * @param {Number} focus ms for run "updateFocus" function.
 */
module.exports = (running, focus) => {
  setInterval(updateRunning, running || 500);
  setInterval(updateFocus, focus || 200);
  return events;
}

/**
 * Check if a process is running.
 * @param {String} p , name of a process
 */
module.exports.isRunning = (p) => running.indexOf(p) >= 0;

/**
 * Get current top process.
 */
module.exports.getTopProcess = () => focus;
