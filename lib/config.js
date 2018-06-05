const Config = require('conf')

module.exports = new Config({
    encryptionKey: 'H1j2icNl7',
    defaults: {
        url: 'https://www.linkedin.com',
        timeout: 60000,
        sleep: 2000,
        viewport: {
            width: 1200,
            height: 600
        }
    }
})
