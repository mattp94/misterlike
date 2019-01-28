const notifier = require('node-notifier')

module.exports.sanitize = text => text
    .replace(/\[.+\]/, '')
    .replace(/[^àâçéèêëîïôûùüÿ\w\d\s,?;.:()/’'%-]/ig, '')
    .replace(/\s+/g, ' ')
    .replace(/’/g, "'")
    .substring(0, 50)
    .trim()

module.exports.notify = message => new Promise((resolve, reject) => {
    notifier.notify({ title: 'MisterLike', message }, err => {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    })
})
