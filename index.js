const exec = require('simple-exec-promise')

const makeProxy = (o, stack = []) => new Proxy(o, {
  get (_, k) {
    return makeProxy((...args) => {
      return exec(`${[].concat(stack, k, args).join(' ')}`)
    }, [].concat(stack, k))
  }
})

module.exports = makeProxy({})