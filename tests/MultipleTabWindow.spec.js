import {test, expect} from '@playwright/test'

test('handiling child window', async ({page}) => {

    // Step 1 : Open the parent page
    await page.goto("https://the-internet.herokuapp.com/windows")
    // verify that we are on the correct page
    await expect (page.locator("h3")).toHaveText("Opening a new window")
    console.log("Parent Page Title:", await page.title());

    // Step 2 : Capture the new tab

    // Array Destructuring : take the first value from the array and store it in childPage. Ignore the remaining values
    const [childPage] = await Promise.all([
        page.context().waitForEvent('page'), page.locator("text=Click Here").click()
    ])

    // Step 3 : wait until the child page is completely loaded
    await childPage.waitForLoadState()

    // Step 4 : work on the child page
    console.log("Child window title:", await childPage.title())
    // verify that we are on the correct page
    await expect (childPage.locator("h3")).toHaveText("New Window")

    // Step 5 : Switch back to parent tab
    await page.bringToFront()
    console.log('Back to parent page:', await page.title());

    // Step 6: Close Child Tab 
    await childPage.close()

})