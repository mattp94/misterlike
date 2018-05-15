const yargs = require('yargs')

module.exports = yargs
    .usage('$0 --email <email> --password <password> [--all --show]')
    .example('$0 -e abcd@mail.com -p 1234 -as')
    .option('email', {
        alias: 'e',
        describe: 'Email address',
        type: 'string',
        demandOption: true
    })
    .option('password', {
        alias: 'p',
        describe: 'Password',
        type: 'string',
        demandOption: true
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
    .help()
    .locale('en')
    .argv
