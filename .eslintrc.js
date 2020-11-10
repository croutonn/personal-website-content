/**
 * @type import("eslint").Linter.Config
 */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['@croutonn/eslint-config/javascript-loose']
}
