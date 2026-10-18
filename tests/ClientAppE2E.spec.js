// @ts-check

const {test, expect} = require('@playwright/test');

test('Client App', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("shivamrajlearn@gmail.com")
    await page.locator("#userPassword").fill("Asd@1234")
    await page.locator("#login").click()
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles);
    
    
})