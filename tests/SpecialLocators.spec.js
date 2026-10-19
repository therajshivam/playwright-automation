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


})
