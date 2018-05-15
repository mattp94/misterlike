#!/usr/bin/env node

const puppeteer = require('puppeteer')

const config = require('./lib/config')
const like = require('./lib/like')
const logger = require('./lib/logger')
const login = require('./lib/login')
const logout = require('./lib/logout')
const options = require('./lib/options')

const main = async () => {
    const browser = await puppeteer.launch({ headless: !options.show })
    const [page] = await browser.pages()

    if (options.show) await page.setViewport({ width: config.width, height: config.height })

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
