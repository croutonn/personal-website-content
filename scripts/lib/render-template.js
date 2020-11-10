"use strict;"

const { promises: fs } = require("fs")

/**
 * @type {Map<string, string>}
 */
const templateCache = new Map()

/**
 * @param {string} templatePath
 * @param {Object} variables
 */
const renderTemplate = async (templatePath, variables) => {
  if (!templateCache.has(templatePath)) {
    const fileContent = await fs.readFile(templatePath, {
      encoding: "utf-8",
    })
    templateCache.set(templatePath, fileContent)
  }
  const templateContent = templateCache.get(templatePath)
  let variablesContext = ""
  Object.keys(variables).forEach((variableName) => {
    variablesContext += `const ${variableName} = "${variables[variableName]}";`
  })
  // eslint-disable-next-line no-eval
  return eval(`${variablesContext}\`${templateContent}\``)
}

module.exports = renderTemplate
