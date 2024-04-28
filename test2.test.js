

const { Builder, By, Key, until } = require('selenium-webdriver');

describe('TodoMVC React App Tests', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://todomvc.com/examples/react/dist/');
  });

  afterEach(async () => {
    await driver.quit();
  });

  test('Mark Task as Complete', async () => { 
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys('Buy groceries', Key.ENTER); 

    const taskCheckbox = await driver.findElement(By.css('.todo-list li .toggle')); 
    await taskCheckbox.click();
	
    // Verification: Check if the task has a 'completed' element
	expect(await driver.wait(until.elementLocated(By.css('.todo-list li.completed')), 5000)); // Timeout after 5 seconds	
	
	
  });


 test('Edit a Task', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys('Learn about testing', Key.ENTER); 

    const taskLabel = await driver.findElement(By.css('.todo-list li label'));
    await driver.actions().doubleClick(taskLabel).perform();

    const editInput = await driver.findElement(By.css('.todo-list li.editing .edit'));
    await editInput.clear(); // Clear existing text
    await editInput.sendKeys('Learn about automated testing', Key.ENTER); 

    // Verification: Check if the updated text is displayed
    expect(await taskLabel.getText()).toEqual('Learn about automated testing'); 
	
	//expect(await driver.wait(until.elementLocated(By.css('.todo-list li.completed')), 5000)); // Timeout after 5 seconds	
  });



test('Delete a Task', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys('Attend important meeting', Key.ENTER); 

    const taskLabel = await driver.findElement(By.css('.todo-list li label'));
    const deleteButton = await taskLabel.findElement(By.xpath('following-sibling::button')); // Assuming delete button is next to the label
    await driver.actions().move({ origin: taskLabel }).perform(); // Hover to reveal the button
    await deleteButton.click(); 

    // Verification: Check that the task element is no longer present 
    const taskElements = await driver.findElements(By.css('.todo-list li'));
    expect(taskElements.length).toEqual(0);  // Or adjust how you verify task absence
});



test('Add Task with Empty Description', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    await taskInput.sendKeys(Key.ENTER); // Send only an Enter keypress (empty input)

    // Verification: Check for an error message (adjust how you locate this based on the app)
    const errorMessage = await driver.findElement(By.css('.error-message')); // Placeholder selector
    expect(await errorMessage.isDisplayed()).toBe(true);
});



test('Add Task with Excessively Long Description', async () => {
    const taskInput = await driver.findElement(By.className('new-todo'));
    const longDescription = 'a'.repeat(500); // Create a very long string 
    await taskInput.sendKeys(longDescription, Key.ENTER);

    // Verification: Depends on how the app handles this (Error or Save)
    // Option 1: Check for error message (similar to previous scenario)
    // Option 2: Check if the task was actually saved (adjust accordingly) 
});



test('Mark Nonexistent Task as Complete', async () => {
    // Attempt to find and click a task checkbox that doesn't exist
    try {
        const taskCheckbox = await driver.findElement(By.css('.todo-list li .toggle')); 
        await taskCheckbox.click(); 
    } catch (error) {
        // Handle the error gracefully. Ex: Check if error message is displayed 
    }

    // Alternative Verification: Check if no UI changes occurred to indicate completion
});



test('Edit Nonexistent Task', async () => {
    // Attempt to find and double-click a task label that doesn't exist
    try {
        const taskLabel = await driver.findElement(By.css('.todo-list li label'));
        await driver.actions().doubleClick(taskLabel).perform();
    } catch (error) {
         // Handle the error gracefully. Ex: Check if error message is displayed 
    }

    // Alternative Verification: Check if no elements enter the 'editing' state
});

});