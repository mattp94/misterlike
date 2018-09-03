const config = require('./config')
const logger = require('./logger')
const { remember } = require('./options')

module.exports = async (
    page,
    email = config.get('email'),
    password = config.get('password')
) => {
    logger.info('Go to login page...')

    await page.goto(config.get('url'))

    const [emailInput, passwordInput, submitButton] = await Promise.all([
        page.$('#login-email'),
        page.$('#login-password'),
        page.$('#login-submit')
    ])

    logger.info('Enter credentials...')

    await emailInput.type(email, { delay: 100 })
    await passwordInput.type(password, { delay: 100 })
    await submitButton.click({ delay: 20 })

    logger.info('Connection...')

    await page.waitForNavigation()

    if (['feed/','check/add-phone'].every(path => page.url() !== `${config.get('url')}/${path}`))
        throw new Error('Wrong credentials')

    if (remember) {
        logger.info('Store credentials...')

        config.set({ email, password })
    }
}
