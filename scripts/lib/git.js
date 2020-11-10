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

/**
 * @returns {Promise<string>}
 */
const getCurrentBranch = () =>
  exec("git branch --contains").then(
    ({ stdout }) => stdout.match(/^\*\s+([\w/]+)/u)[1]
  )

/**
 * @param {string} branch
 * @returns {Promise<void>}
 */
const deleteBranch = (branch) => exec(`git branch -D ${branch}`)

/**
 * @returns {Promise<string[]>}
 */
const getBranches = () =>
  exec(`git branch`).then(({ stdout }) =>
    stdout
      .split("\n")
      .filter((line) => Boolean(line))
      .map((line) => line.match(/^(?:\*)?\s+([\w/]+)/u)[1])
  )

/**
 * @param {string} targetBranch
 * @returns {Promise<boolean>}
 */
const branchExists = (targetBranch) =>
  getBranches().then(
    (branches) => branches.findIndex((branch) => targetBranch === branch) !== -1
  )

module.exports = {
  branchExists,
  checkout,
  deleteBranch,
  getBranches,
  getCurrentBranch,
}
