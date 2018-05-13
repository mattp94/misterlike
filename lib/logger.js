const chalk = require('chalk')

module.exports = {
    info: message => console.log(`${chalk.green('✔')} ${message}`),
    error: message => console.error(`${chalk.red('✘')} ${message}`)
}
