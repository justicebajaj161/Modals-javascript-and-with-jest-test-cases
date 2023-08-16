import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Modal', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;
    jest.useFakeTimers(); // mock timers
  });

  afterEach(() => {
    jest.clearAllTimers(); // clear all timers after each test
  });

  test("When the user clicks on the button, the modal should open", () => {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById("openModalBtn");
    const stylesBeforeClick = window.getComputedStyle(modal);
    
    expect(stylesBeforeClick.display).toBe('none'); // Ensure it's hidden before the click

    btn.click(); // Simulate the click event

    const stylesAfterClick = window.getComputedStyle(modal);
    expect(stylesAfterClick.display).toBe('block'); // Ensure it's displayed after the click
  });
  

  test("When the user clicks on the cross , should close model", () => {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementById("closeModalBtn");
    const stylesBeforeClick = window.getComputedStyle(modal);
    
    expect(stylesBeforeClick.display).toBe('none'); // Ensure it's hidden before the click

    btn.click(); // Simulate the click event

    const stylesAfterClick = window.getComputedStyle(modal);
    expect(stylesAfterClick.display).toBe('block'); // Ensure it's displayed after the click

    span.click();


    const stylesAftercrossClick = window.getComputedStyle(modal);
    expect(stylesAftercrossClick.display).toBe('none');
  });

  test("When the user clicks outside of the modal, the modal should close", () => {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById("openModalBtn");

    // Open the modal first
    btn.click();

    const stylesAfterOpen = window.getComputedStyle(modal);
    expect(stylesAfterOpen.display).toBe('block'); // Ensure it's displayed after opening

    // Simulate a click on the modal background (outside the content)
    modal.dispatchEvent(new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    }));

    const stylesAfterClickOutside = window.getComputedStyle(modal);
    expect(stylesAfterClickOutside.display).toBe('none'); // Ensure it's hidden after clicking outside
});

});
