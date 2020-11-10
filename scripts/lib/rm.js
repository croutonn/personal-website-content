const { promises: fs } = require("fs")
const { join } = require("path")

/**
 * @param {string} targetPath
 * @returns {Promise<void>}
 */
const rm = async (targetPath) => {
  const stats = await fs.stat(targetPath).catch(() => false)
  if (!stats) {
    return
  }
  if (stats.isFile()) {
    await fs.unlink(targetPath)
    return
  }
  const files = await fs.readdir(targetPath)
  await Promise.all(files.map((file) => rm(join(targetPath, file))))
  await fs.rmdir(targetPath, {
    recursive: false,
    maxRetries: 3,
    retryDelay: 50,
  })
}

module.exports = rm
