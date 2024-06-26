const {Builder, By, Key, until} = require('selenium-webdriver');

describe('TodoMVC React App Tests', () => {
    let driver;

    beforeEach(async () => {
        console.log("debug-dev: 0a")
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://todomvc.com/examples/react/dist/');
    });

    afterEach(async () => {
        console.log("debug-dev: 0")
        await driver.quit();
    });

    test('Edit a Task', async () => {
        console.log("debug-dev: 1")
        const taskInput = await driver.findElement(By.className('new-todo'));
        console.log("debug-dev: 2")
        const inputText = 'Learn about testing';
        await taskInput.sendKeys(inputText, Key.ENTER);
        console.log("debug-dev: 3")

        expect(await driver.wait(until.elementLocated(By.css('.todo-list li label')), 5000)); // Timeout after 5 seconds
        console.log("debug-dev: 4")
        
        const xpathLabel1 = "/html/body/section/main/ul/li/div/label"
        // const taskLabel = await driver.findElement(By.css('.todo-list li label'));
        const taskLabel = await driver.findElement(By.xpath(xpathLabel1));
        console.log("debug-dev: 5")
        await driver.actions().doubleClick(taskLabel).perform();

        console.log("debug-dev: 6")

        const xpathTextInput = "/html/body/section/main/ul/li/div/div/input";
        // const editInput = await driver.findElement(By.css('.todo-list li.editing .view'));
        const editInput = await driver.findElement(By.xpath(xpathTextInput));

        const total = inputText.length;
        for (let i = 0; i < total; i++) {
            await editInput.sendKeys(Key.BACK_SPACE);
        }
        // await editInput.clear(); // Clear existing text
        console.log("debug-dev: 8")

        expect(await driver.wait(until.elementLocated(By.css('.todo-list li')), 5000)); // Timeout after 5 seconds
        console.log("debug-dev: 9")

        const xpathTextInput2 = "/html/body/section/main/ul/li/div/div/input";
        const editInput2 = await driver.findElement(By.xpath(xpathTextInput2));
        await editInput2.sendKeys('Learn about automated testing', Key.ENTER);
        console.log("debug-dev: 10")

        const xpathLabel2 = "/html/body/section/main/ul/li/div/label"
        const taskLabel2 = await driver.findElement(By.xpath(xpathLabel2));

        console.log("debug-dev: 11")

        // Verification: Check if the updated text is displayed
        expect(await taskLabel2.getText()).toEqual('Learn about automated testing');
        // expect(await driver.wait(until.elementLocated(By.css('.todo-list li.editing')), 5000)); // Timeout after 5 seconds
    });

});