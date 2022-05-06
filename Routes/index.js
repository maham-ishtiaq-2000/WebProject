// const router = express.Router();
var puppeteer = require('puppeteer');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: ['--disable-web-security', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--single-process', "--proxy-server='direct://'", '--proxy-bypass-list=*', '--deterministic-fetch'],
};

const openConnection = async () => {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.setViewport({width: 1680, height: 1050});
    return {browser, page};
};

const closeConnection = async (page, browser) => {
    page && (await page.close());
    browser && (await browser.close());
};

//-----     get products Images     ------//
// router.get('/products', async (req, res) => {
//     let {browser, page} = await openConnection();

// });

function delay(t, val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val);
        }, t);
    });
}

const getProducts = async () => {
    let {browser, page} = await openConnection();
    try {
        await page.goto('https://www.junaidjamshed.com/womens/stitched.html?product_list_limit=36', {waitUntil: 'networkidle0', timeout: 100000});
        await delay(8000);
        const imgs = await page.$$eval('img.product-image-photo[src]', imgs => imgs.map(img => img.getAttribute('src')));
        console.log(imgs);
    } catch (e) {
        console.log(e);
    } finally {
        await closeConnection(page, browser);
    }
}

getProducts();