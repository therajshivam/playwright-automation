import {expect, test} from '@playwright/test'

test('Hidden Elements', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // for navigation to different urls on a single browser
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible(); // to verify that its in visible mode.
    await page.locator("#hide-textbox").click() // now that element is hidden .
    await expect(page.locator("#displayed-text")).toBeHidden(); // to verify that its in hidden mode.
})

test.only('Java Popups/Dialog', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // page.on() -- listens for events, it will emit when event ocurred.
    page.on('dialog', dialog => dialog.accept())
    // page.on('dialog', dialog => dialog.dismiss()) 

    await page.locator('#confirmbtn').click()
 })