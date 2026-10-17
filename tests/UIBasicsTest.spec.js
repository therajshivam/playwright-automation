// @ts-check

// import annotation from playwright module
const {test, expect} = require('@playwright/test');
const { log } = require('node:console');

// syntax for writing test case
test('Browser Context Declaration Playwright Test', async ({browser}) => {
    // playwright code 

    // default, if not injecting any cookies then we can skip these two steps and add a fixture called 'page' in the function.
    const context = await browser.newContext(); // broweser instance is opened
    const page = await context.newPage(); // new page is opened

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // new url opened

})
// write 'await' keyword after every step so that it become synchronous and execute tests step by step
// with 'await' write the function as 'async'

/*
{browser} it is a playwright fixture.
*/

// cleaner view
test('Page Playwright Test', async ({page}) => {

    // await page.goto("https://google.com"); // new url opened
    // // get the title and put assertation on it
    // console.log(await page.title())
    // await expect(page).toHaveTitle("Google")

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // new url opened

    // Locators 
    // css selectors
    await userName.fill('rahulshetty');
    // to type anything in the textbox, we have two methods - type and fill. use fill methods as type is deprecated.
    await page.locator('[type="password"]').fill('Learning@830$3mK2');
    await signIn.click();
    // extracting the text from page and putting assertation
    console.log(await page.locator("[style*='block']").textContent()); // prints
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    // clear the input boxes and retype the texts
    await userName.fill("") // clear the input
    await userName.fill("rahulshettyacademy") 
    await signIn.click();

    // next page
    // task : grab the title of the first product present on the page.
    // work with locators which extract multiple webelements from the page
    console.log(await cardTitles.nth(0).textContent());
    // or
    console.log(await cardTitles.first().textContent());

    // task : grab the text of all products in a list format in a single step
    const allTitles = await cardTitles.allTextContents(); // gives array
    console.log(allTitles);
    // note : allTextContents wont work until used textContent because of auto-waiting, as textContent supports auto-waiting while allTextContents dont. (first get the first element then run allTextContents)

    
    




    


    
})

/* 
Rules for CSS selectors 
 
1. If Id is present
    css -> tagname#id (or) #id

2. If class attribute is present
    css -> tagname. class (or) . class

3. Write css based on any Attribute
    css -> [attribute='value']

4. Write css with traversing from Parent to child
    css -> parenttagname >> childtagname

5. If needs to write the locator based on text
    text=' '
*/

test.only('UI Controls', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');

    // static dropdown
    await dropdown.selectOption("consult")

    // radio buttons
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    // assertion
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect ( page.locator(".radiotextsty").last()).toBeChecked();
    
    // checkboxes
    await page.locator("#terms").click()
    await expect (page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck()
    expect (await page.locator("#terms").isChecked()).toBeFalsy() // if there is not any readymade assertions then we can make one by own


    




    // await page.pause(); //execution will pause before closing the test runner and opens playwright inspector


})