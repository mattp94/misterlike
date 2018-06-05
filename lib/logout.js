const config = require('./config')
const logger = require('./logger')

module.exports = async page => {
    logger.info('Logout...')

    await page.goto(`${config.get('url')}/m/logout`)
}
