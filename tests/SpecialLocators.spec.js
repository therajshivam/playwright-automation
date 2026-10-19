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

    // getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()

    await page.getByRole('link', {name: 'Shop'}).click()

    // locator filter and chaining
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click()
})

test('Step level assertation timeout', async({page})=>{

    // Understand how Assertions Time out works in Global level & Step level 

    page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByPlaceholder('Password').fill("abc123")
    await page.getByRole("button", {name: 'Submit'}).click()

    // previously we have already learnt about few timeouts like waitFor()

    // By default timeouts for :
        // test is 30 secs
        // expect assertion is 5 secs 

    // Timeout for Assertions : override by {timeout: 10_000} - step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})

    // for assetion timeout at global level : 
        // in the playwright.config.js 


})

// 30sec is the default timeout for tests - after 30sec test timeout error,
// if a particular test demands to have extended timeout then dont change values at the global level at config file.
// instead, use test.setTimeout(60000) - for a particular test suite.
test('Test level timeout assertion timeout', async({page})=>{

    test.setTimeout(60000) // timeout override for a particular whole test (actions and assertions)

    page.setDefaultTimeout(9000) // action timeout at test level

    // navigation timeout is for page.goto() to land on a webpage

    // Test level timeout assertion timeout
    const slowExpect = expect.configure({timeout : 9000}) // test level timeout, save in a const and use it instead of expect put slowExpect

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByLabel("Check me out if you Love IceCreams!").click({timeout: 15000}) // action timeout step level
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder('Password').fill("abc123")
    await page.getByRole("button", {name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).
    toBeVisible()

    await page.getByRole('link', {name: 'Shop'}).click()
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name")

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click()




    // cascading : global level -> test level -> step level
    // hence highest priority is test level
    // priority : step level > test level > global level


})