// changind locators with getBy locators

const { test, expect } = require('@playwright/test');

test('Client App', async({page})=>{

    // variables
    const products = page.locator(".card-body")
    const productName = 'ZARA COAT 3'
    const email = "shivamrajlearn@gmail.com"

    await page.goto("https://rahulshettyacademy.com/client")

    // login
    await page.getByPlaceholder("email@example.com").fill(email)
    await page.getByPlaceholder("enter your passsword").fill("Asd@1234")
    await page.getByRole('button', {name: 'Login'}).click()
    
    await page.waitForLoadState('networkidle')

    // get the desired product dynamically and add to cart
    // const count = await products.count()
    // for(let i = 0; i < count; ++i){
    //     if (await products.nth(i).locator("b").textContent() === productName) {
    //         // add product to cart
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();


    // verify in the cart page
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click()

    await page.locator("div li").first().waitFor()

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    
    // checkout from cart
    await page.getByRole("button", {name:"Checkout"}).click()

    // handling dynamic dropdown
    await page.getByPlaceholder("Select Country").pressSequentially('ind', { delay: 150 })
    
    // const dropdown = page.locator(".ta-results")
    // await dropdown.waitFor()
    // const optionsCount = await dropdown.locator("button").count()
    // for (let i = 0; i < optionsCount; i++) {
        
    //     if (await dropdown.locator('button').nth(i).textContent() === " India") {
    //         await dropdown.locator('button').nth(i).click()
    //         break
    //     }
    // }

    await page.getByRole("button", {name:"India"}).nth(1).click()

    await page.getByText("PLACE ORDER").click()

    // validate the thank you page
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();


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