#!/usr/bin/env node

const puppeteer = require('puppeteer')

const config = require('./lib/config')
const like = require('./lib/like')
const logger = require('./lib/logger')
const login = require('./lib/login')
const logout = require('./lib/logout')
const { email, password, show } = require('./lib/options')

const main = async () => {
    const browser = await puppeteer.launch({
        headless: !show,
        executablePath: config.get('path')
    })

    const [page] = await browser.pages()
    await page.setBypassCSP(true)

    if (show) {
        await page.setViewport({
            width: config.get('viewport.width'),
            height: config.get('viewport.height')
        })
    }

    page.setDefaultNavigationTimeout(config.get('timeout'))

    await login(page, email, password)

    for (const company of config.get('companies')) {
        await like(page, company)
    }

    await logout(page)
    await browser.close()

    logger.info('Done')
}

main().catch(err => {
    logger.error(err.message)
    process.exit(1)
})
