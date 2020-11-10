const readline = require("readline")

/**
 * @param {string} question
 * @param {Function} callback
 */
const createQuestion = (question, callback) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  readlineInterface.question(question, (input) => {
    callback(input)
    readlineInterface.close()
  })
}

/**
 * @param {string} question
 */
const confirm = (question) => {
  return new Promise((resolve) => {
    /**
     * @param {string} answer
     */
    const callback = (answer) => {
      const normalizedAnswer = answer.trim().toLowerCase()
      if (normalizedAnswer === "y") {
        return resolve(true)
      }
      return resolve(false)
    }
    createQuestion(`${question} (y/N): `, callback)
  })
}

module.exports = {
  confirm,
  createQuestion,
}
