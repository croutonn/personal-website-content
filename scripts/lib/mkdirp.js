"use strict;"

const { promises: fs } = require("fs")

const exists = require("./exists")

/**
 * @param {string} dirPath
 * @returns {Promise<void>}
 */
const mkdirp = async (dirPath) => {
  const dirExists = await exists(dirPath)
  if (dirExists) {
    return
  }
  await fs.mkdir(dirPath, { recursive: true })
}

module.exports = mkdirp
