const config = require('./config')
const options = require('./options')
const logger = require('./logger')

module.exports = async page => {
    logger.info('Go to login page...')

    await page.goto(config.url)

    const [email, password, submit] = await Promise.all([
        page.$('#login-email'),
        page.$('#login-password'),
        page.$('#login-submit')
    ])

    logger.info('Enter credentials...')

    await email.type(options.email, { delay: 100 })
    await password.type(options.password, { delay: 100 })
    await submit.click({ delay: 20 })

    logger.info('Connection...')

    await page.waitForNavigation()

    return page.url() === `${config.url}/feed/`
}
