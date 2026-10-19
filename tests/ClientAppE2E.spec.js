

const {test, expect} = require('@playwright/test');

test('Client App', async({page})=>{

    // variables
    const products = page.locator(".card-body")
    const productName = 'ZARA COAT 3'
    const email = "shivamrajlearn@gmail.com"

    await page.goto("https://rahulshettyacademy.com/client")

    // login
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill("Asd@1234")
    await page.locator("#login").click()
    
    await page.waitForLoadState('networkidle')

    // get the desired product dynamically and add to cart
    const count = await products.count()
    for(let i = 0; i < count; ++i){
        if (await products.nth(i).locator("b").textContent() === productName) {
            // add product to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    // verify in the cart page
    await page.locator("[ routerlink*='cart']").click()
    await page.locator("div li").first().waitFor()
    const bool= await page.locator('h3:has-text("ZARA COAT 3")').isVisible()
    expect (bool).toBeTruthy()

    // checkout from cart
    await page.locator("text=Checkout").click()

    // handling dynamic dropdown
    await page.locator("[placeholder*='Country']").pressSequentially('ind', { delay: 150 })
    // pressSequentially() : type letters one by one
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; i++) {
        
        if (await dropdown.locator('button').nth(i).textContent() === " India") {
            await dropdown.locator('button').nth(i).click()
            break
        }
    }

    await expect(page.locator('div label')).toHaveText(email)
    await page.locator(".action__submit").click()

    // validate the thank you page
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")

    // get order id
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("td [routerlink*='/dashboard/myorders']").click()

    
    // dynamically find the order from order history page TABLE
    await page.locator('tbody').waitFor()
    const rows = page.locator('tbody tr')
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId =  await rows.nth(i).locator('th').textContent()
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click()
            break
        }
    }

    // validating the order summary page about correct info
    const orderIdDetails = await page.locator('.col-text').textContent()
    expect(orderId.includes(orderIdDetails)).toBeTruthy



    
    // await page.pause()
})