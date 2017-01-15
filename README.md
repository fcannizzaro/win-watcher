# win-watcher
Get killed, started, running, top processes on Windows

[![npm](https://img.shields.io/npm/v/win-watcher.svg)](https://www.npmjs.com/package/win-watcher)
[![npm](https://img.shields.io/npm/dm/win-watcher.svg)](https://www.npmjs.com/package/win-watcher)

# Install

```sh
npm i --save win-watcher
```

### Requirements
[node-gyp](https://github.com/nodejs/node-gyp#installation) to build **src/win.cc**

# Usage

```javascript
var windows = require('win-watcher')
var win = windows(500,250)

win.on('focus', p => {
  console.log('  >> Top Process: %s <<', p)
})

win.on('kill', p => {
  console.log('  >> Killed Process: %s <<', p)
})

win.on('start', p => {
  console.log('  >> Started Process: %s <<', p)
})
```

# Functions

### module(runningInterval, focusInterval)

- `Number` runningInterval: milliseconds for check new/killed processed. (**Default** 500)

- `Number` focusInterval: milliseconds of interval for check top process. (**Default** 200)

### isRunning(process)
- `String` process: name of process.
**Return** if process is running.

### getTopProcess()
**Return** focused process.

# Events

### kill
Called when a process is killed.

### start
Called when a process is started.

### focus
Called when the top process is changed.

# Author
Francesco Cannizzaro
