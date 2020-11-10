"use strict;"

const { promises: fs } = require("fs")
const { resolve, join } = require("path")

const {
  BRANCH_PREFIX,
  DEFAULT_EXTENSION,
  LOCALES,
  POST_TEMPLATE,
  POSTS_DIR,
} = require("./lib/constants")
const exists = require("./lib/exists")
const { checkout } = require("./lib/git")
const mkdirp = require("./lib/mkdirp")
const renderTemplate = require("./lib/render-template")

const postTemplatePath = resolve(__dirname, `../${POST_TEMPLATE}`)
const postsDirPath = resolve(__dirname, `../${POSTS_DIR}`)

/**
 * @param {string} basename
 * @param {string} extension
 * @returns {Promise<void>}
 */
const run = async (basename, extension = DEFAULT_EXTENSION) => {
  await checkout(`${BRANCH_PREFIX}${basename}`, true)

  const postDir = join(postsDirPath, basename)
  await mkdirp(postDir)

  const variables = {
    basename,
    datetime: new Date().toISOString(),
  }

  const writeFileJobs = LOCALES.map(async (locale) => {
    const content = await renderTemplate(postTemplatePath, {
      ...variables,
      locale,
    })
    const fileName = `${basename}.${locale}.${extension}`
    const postFilePath = join(postDir, fileName)
    const postFileExists = await exists(postFilePath)
    if (postFileExists) {
      console.log(
        `"${POSTS_DIR}/${basename}/${fileName}" was not generated because it exists`
      )
      return
    }
    await fs.writeFile(postFilePath, content).then(() => {
      console.log(`"${POSTS_DIR}/${basename}/${fileName}" was generated`)
    })
  })

  await Promise.all(writeFileJobs)
}

// checking argv
if (process.argv.length < 3) {
  console.error("Usage: yarn add-post basename [extension-without-leading-dot]")
  process.exit(-1)
}

// Run task
run(...process.argv.slice(2))
