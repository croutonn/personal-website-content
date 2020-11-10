const { promises: fs } = require("fs")

const exists = async (path) => Boolean(await fs.stat(path).catch(() => false))

module.exports = exists
