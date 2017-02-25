const assert = require('assert')

const cmd = require('./index')

;(async () => {
  try {
    await cmd.cat('a.txt')
    assert.fail(null, null, 'a.txt should not exist yet')
  } catch (e) {
    assert.equal(e.toString(), 'Error: Command failed: cat a.txt\ncat: a.txt: No such file or directory\n')
  }

  await cmd.touch('a.txt')
  await cmd.echo['"hello, world!"']['>']('a.txt')
  assert.equal(await cmd.cat('a.txt'), 'hello, world!\n')

  // cleanup
  await cmd.rm('a.txt')
})()