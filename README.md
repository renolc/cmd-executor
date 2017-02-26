# cmd-executor [![npm version](https://badge.fury.io/js/cmd-executor.svg)](https://badge.fury.io/js/cmd-executor)

Tiny proxy object to execute arbitrary CLI commands. All calls return a promise.

### Installation

```bash
npm i cmd-executor -S
```

### Usage

```js
const cmd = require('cmd-executor')

// all calls return a promise, so you should wait for them to complete
// before executing another command. You can use `.then()` or `await`.
;(async () => {

  // any attributes/functions/parameters you call on `cmd` will be parsed
  // into a command string and executed. For example:

  // will call `touch a.txt`
  await cmd.touch('a.txt')

  // will call `echo "hello, world!" > a.txt`
  await cmd.echo['"hello, world!"']['>']('a.txt')

  // since the attributes/functions are arbitrary, these are
  // functionally equivalent to the above line:
  //   await cmd.echo('"hello, world!" > a.txt')
  //   await cmd.echo["hello, world!"]('> a.txt')

  // only the last attribute can be called as a function
  // so this will not work:
  //   await cmd.echo('"hello, world!"')['>']('a.txt')

  // any text the cli would print out is resolved by the promise
  const output = await cmd.cat('a.txt')
  console.log(output) // "hello, world!\n"

  // any errors will be rejected by the promise which you can catch
  // (or `.catch()` if not using `async`/`await`)
  try {
    await cmd.mkdir('a.txt')
  } catch (e) {
    console.log(e) // error contains "mkdir: a.txt: File exists"
  }

  // clean up the file
  await cmd.rm('a.txt')
})()
```

### Advanced Usage

```js
// lets say you wanted a promise wrapper around `git`, you
// could easily do this with cmd-executor
const git = require('cmd-executor').git

// and now you have complete access to the git CLI
;(async () => {
  await git.init()
  await git.add('.')
  await git.remote.add('origin', url)
  await git.commit('-m "Initial commit"')
})()

// destructuring also works for whatever commands you want
const { mkdir, touch, echo, cat, rm } = require('cmd-executor')

;(async () => {
  await mkdir('bork')
  await touch('bork/file')
  await echo('"hi!" > bork/file')
  console.log(await cat('bork/file'))
  await rm('-rf bork')
})()
```
