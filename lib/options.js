const yargs = require('yargs')

const config = require('./config')

module.exports = yargs
    .usage('$0 --email <email> --password <password> [--all --show --remember]')
    .example('$0 -e abcd@mail.com -p 1234 -asr')
    .option('email', {
        alias: 'e',
        describe: 'Email address',
        type: 'string',
        demandOption: !config.has('email')
    })
    .option('password', {
        alias: 'p',
        describe: 'Password',
        type: 'string',
        demandOption: !config.has('password')
    })
    .option('all', {
        alias: 'a',
        describe: 'Like all posts',
        type: 'boolean'
    })
    .option('show', {
        alias: 's',
        describe: 'Show me your work',
        type: 'boolean'
    })
    .option('remember', {
        alias: 'r',
        describe: 'Remember me',
        type: 'boolean'
    })
    .help()
    .locale('en')
    .argv
