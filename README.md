# win-watcher
Get killed, started, running, top processes on Windows

# Install

```sh
npm i --save win-watcher
```

### Requirements
[node-gyp](https://github.com/nodejs/node-gyp#installation) to build **src/win.cpp**

# Usage

```javascript
var windows = require('win-watcher')
var win = windows()

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

`Number` runningInterval: milliseconds for check new/killed processed.

`Number` focusInterval: milliseconds of interval for check top process.

### isRunning(process)
`String` process: name of process.
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
