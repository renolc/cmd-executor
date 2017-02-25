const cmd = require('./index')

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