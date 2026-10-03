// @ts-check

// import annotation from playwright module
const {test, expect} = require('@playwright/test')

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
test.only('Page Playwright Test', async ({page}) => {

    // await page.goto("https://google.com"); // new url opened
    // // get the title and put assertation on it
    // console.log(await page.title())
    // await expect(page).toHaveTitle("Google")

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn')

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

    // work with locators which extract multiple webelements in page
    console.log(await page.locator(".card-body a").textContent());
    

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