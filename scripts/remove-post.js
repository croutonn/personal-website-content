"use strict;"

const { resolve, join } = require("path")

const chalk = require("chalk")

const { BRANCH_PREFIX, DEFAULT_BRANCH, POSTS_DIR } = require("./lib/constants")
const {
  branchExists,
  checkout,
  deleteBranch,
  getCurrentBranch,
} = require("./lib/git")
const { confirm } = require("./lib/input")
const rm = require("./lib/rm")

const postsDirPath = resolve(__dirname, `../${POSTS_DIR}`)

/**
 * @param {string} basename
 * @returns {Promise<void>}
 */
const run = async (basename) => {
  const yes = await confirm(`Remove "${basename}"`)
  if (!yes) {
    process.exit(1)
  }
  const currentBranch = await getCurrentBranch()
  if (currentBranch !== DEFAULT_BRANCH) {
    await checkout(DEFAULT_BRANCH)
  }
  const targetBranch = `${BRANCH_PREFIX}${basename}`
  if (await branchExists(targetBranch)) {
    await deleteBranch(targetBranch)
  }

  const postDir = join(postsDirPath, basename)
  await rm(postDir)
  console.log(`${chalk.green("success")} "\${basename}" was removed`)
}

// checking argv
if (process.argv.length < 3) {
  console.error("Usage: yarn add-post basename [extension-without-leading-dot]")
  process.exit(-1)
}

// Run task
run(...process.argv.slice(2))
