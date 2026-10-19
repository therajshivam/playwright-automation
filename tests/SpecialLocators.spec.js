import {test, expect} from '@playwright/test'

test('Playwright Special Locators', async ({page})=>{
    page.goto('https://rahulshettyacademy.com/angularpractice/')

    // getByLabel : if any text is written inside a label tag, then locate that element
    // Use this locator for selcting items
    // checkboxes
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    // radiobutton
    await page.getByLabel("Employed").check()
    // static dropdown
    await page.getByLabel("Gender").selectOption("Female")

    // getByPlaceholder
    await page.getByPlaceholder('Password').fill("abc123")

    // getByRole
    await page.getByRole("button", {name: 'Submit'}).click()
    await page.getByRole('link', {name: 'Shop'}).click()

    // getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()

    // locator filter and chaining
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click()
})

test('Step level timeout for assertations', async()=>{

    // Understand how Assertions Time out works in Global level & Step level 

    page.goto('https://rahulshettyacademy.com/angularpractice/')

    // previously we have already learnt about few timeouts like waitFor()

    // By default timeouts for :
        // test is 30 secs
        // expect assertion is 5 secs 

    // Timeout for Assertions : override by {timeout: 10_000} - step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})

    // for assetion timeout at global level : 
        // in the playwright.config.js 


})
