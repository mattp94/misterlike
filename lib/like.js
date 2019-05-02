const config = require('./config')
const logger = require('./logger')
const { all } = require('./options')
const { sanitize } = require('./util')

module.exports = async (page, company) => {
    logger.info(`Go to ${company} page...`)

    await page.goto(`${config.get('url')}/company/${company}/`)

    logger.info('Waiting for new articles...')

    const feed = await page.waitForSelector('#organization-feed')
    await feed.hover()

    let article

    while (
        article = await page.waitForSelector('#organization-feed .feed-shared-update-v2').catch(() => null)
    ) {
        await article.hover()

        const button = await article.$('.feed-shared-social-action-bar [data-control-name="like_toggle"]')
        await button.hover()
    
        const liked = await page.evaluate(node => node.getAttribute('aria-pressed') === 'true', button)
        const text = await page.evaluate(node => node.querySelector('.feed-shared-text').innerText, article)

        if (!liked) {
            logger.info(`Like → ${sanitize(text)}...`)
            await button.click({ delay: 20 })
        } else if (!all) {
            break
        }

        await page.evaluate(node => node.remove(), article)
        await page.waitFor(config.get('sleep'))
        await page.evaluate(() => window.scrollBy({ top: -100 }))
        await page.waitFor(100)
        await page.evaluate(() => window.scrollBy({ top: 1000 }))
    }
}
