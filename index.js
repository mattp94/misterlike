#!/usr/bin/env node

const puppeteer = require('puppeteer')

const config = require('./lib/config')
const like = require('./lib/like')
const logger = require('./lib/logger')
const login = require('./lib/login')
const logout = require('./lib/logout')
const options = require('./lib/options')

const main = async () => {
    const browser = await puppeteer.launch({
        headless: !options.show,
        executablePath: config.execPath
    })

    const [page] = await browser.pages()
    await page.setBypassCSP(true)

    if (options.show)
        await page.setViewport({
            width: config.viewport.width,
            height: config.viewport.height
        })

    page.setDefaultNavigationTimeout(config.timeout)

    await login(page)
    await like(page)
    await logout(page)
    await browser.close()

    logger.info('Done')
}

main().catch(err => {
    logger.error(err.message)
    process.exit(1)
})
