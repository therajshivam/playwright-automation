// @ts-check

// tasks : 
// 1. Complete the login
// 2. get the first product title


const {test, expect} = require('@playwright/test');
const { log } = require('console');
const { title } = require('process');

test('Client App', async({page})=>{

    const titles = page.locator(".card-body b")

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    // Assertation that we are on the login page
    await expect(page.locator("h1.login-title")).toContainText("Log in")

    // login into the page
    await page.locator("#userEmail").fill("shivamrajlearn@gmail.com")
    await page.locator("#userPassword").fill("Asd@1234")
    await page.locator("#login").click()

    // asseration of next page
    await expect(page.locator("#burgundy:visible")).toContainText("Filters")

    // get the first product title
    // await expect(titles.first()).toContainText("ADIDAS")
    // console.log(await titles.first().textContent());

    // print array of all the titles
    // await page.waitForLoadState('networkidle') // this can be flaky, can use alternate way
    await titles.first().waitFor() // alternate way (this is only for one element waiting)

    console.log(await titles.allTextContents());
    
    
})