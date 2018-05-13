const yargs = require('yargs')

module.exports = yargs
    .example('$0 --email bob@mail.com --password 12345 --all --show ')
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
