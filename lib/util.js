module.exports.sanitize = text => text
    .replace(/\[.+\]/, '')
    .replace(/[^àâçéèêëîïôûùüÿ\w\d\s,?;.:()/’'%-]/ig, '')
    .replace(/\s+/g, ' ')
    .replace(/’/g, "'")
    .substring(0, 50)
    .trim()
