/* eslint-disable import/order */
const { promisify } = require("util")
const exec = promisify(require("child_process").exec)

/**
 * @param {string} branch
 * @param {boolean} createBranch
 * @returns {Promise<void>}
 */
const checkout = (branch, createBranch = false) =>
  exec(`git checkout${createBranch ? " -b" : ""} ${branch}`)

module.exports = {
  checkout,
}
