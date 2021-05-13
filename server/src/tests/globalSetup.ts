import cache from './../cache/redis'

// Flush redis cache before all tests
module.exports = async () => {
  await cache.flush()
  cache.disconnect()
}
