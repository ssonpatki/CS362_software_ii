// use npm run test:e2e

import {test as base, expect } from '@playwright/test';

const test = base.extend({
    calculatorPage: async ({ page }, use) => {
        const response = await page.goto('http://127.0.0.1:8080/');
        expect(response?.ok()).toBeTruthy();
        await expect(page).toHaveTitle('Roman Numeral Calculator');
        await expect(page.locator('#app')).toBeVisible();

        await use(page);
    },
    userRegistered: async ({ page }, use) => {
        await page.goto('http://127.0.0.1:8080/');
        await page.getByRole('link', {name: 'Register'}).click();
        await expect(page).toHaveURL('http://127.0.0.1:8080/register');
        
        await page.getByLabel('Email').fill('hello@example.com');
        await page.getByLabel('Password').fill('abcABC123!');
        await page.getByRole('button', { name: /register/i }).click();

        const successMessage = page.getByRole('status');
        await expect(successMessage).toHaveText(/registration successful/i);

        await use(page);
    },
    userLoggedIn: async ({ page }, use) => {
        await page.goto('http://127.0.0.1:8080/');
        await page.getByRole('link', {name: 'Register'}).click();
        await expect(page).toHaveURL('http://127.0.0.1:8080/register');
        
        await page.getByLabel('Email').fill('hello@example.com');
        await page.getByLabel('Password').fill('abcABC123!');
        await page.getByRole('button', { name: /register/i }).click();

        const successMessage = page.getByRole('status');
        await expect(successMessage).toHaveText(/registration successful/i);

        await page.getByRole('link', {name: 'Login'}).click();
        await page.getByLabel('Email').fill('hello@example.com');
        await page.getByLabel('Password').fill('abcABC123!');
        await page.getByRole('button', { name: /login/i }).click();

        await expect(page.locator('#text-display')).toHaveText('0');
        await expect(page.getByRole('link', {name: 'History'})).toBeVisible();

        await use(page);
    }
});

test.describe('Calculator Converter App: Testing', () => {

    test('Loads correctly', async ({ calculatorPage: page }) => {
        const response = await page.goto('http://127.0.0.1:8080/');
        expect(response?.ok()).toBeTruthy();
    
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle('Roman Numeral Calculator');
        await expect(page.locator('#app')).toBeVisible();
    });
  
    test('Simple Calculation and Conversion', async ({ calculatorPage: page }) => {
        await expect(page.locator('#text-display')).toHaveText('0');
        
        await page.getByRole('button', {name: '1'}).click();
        await expect(page.locator('#text-display')).toHaveText('I');
        
        await page.getByRole('button', {name: '+'}).click();
        await page.getByRole('button', {name: '2'}).click();
        await expect(page.locator('#text-display')).toHaveText('II');

        await page.getByRole('button', {name: '+'}).click();
        await expect(page.locator('#text-display')).toHaveText('III');
        await page.getByRole('button', {name: '3'}).click();
        await expect(page.locator('#text-display')).toHaveText('III');

        await page.getByRole('button', {name: '+'}).click();
        await expect(page.locator('#text-display')).toHaveText('VI');
        await page.getByRole('button', {name: '4'}).click();
        await expect(page.locator('#text-display')).toHaveText('IIII');

        await page.getByRole('button', {name: '÷'}).click();
        await expect(page.locator('#text-display')).toHaveText('X');
        await page.getByRole('button', {name: '5'}).click();
        await expect(page.locator('#text-display')).toHaveText('V');

        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('II');

    });

    test('Calculation and Conversion to Modern Roman', async ({ calculatorPage: page }) => {
        await expect(page.locator('#text-display')).toHaveText('0');
        
        await page.getByRole('button', {name: '3'}).click();
        await expect(page.locator('#text-display')).toHaveText('III');
        
        await page.getByRole('button', {name: '×'}).click();
        await page.getByRole('button', {name: '3'}).click();
        await expect(page.locator('#text-display')).toHaveText('III');

        await page.getByRole('button', {name: '3'}).click();
        await expect(page.locator('#text-display')).toHaveText('XXXIII');

        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('LXXXXVIIII');

        await page.getByRole('button', {name: 'mdrn'}).click();
        await expect(page.locator('#text-display')).toHaveText('XCIX');

    });

    test('User Registration', async ({ calculatorPage: page }) => {
        await expect(page.locator('#text-display')).toHaveText('0');
        
        await page.getByRole('link', {name: 'Register'}).click();
        await expect(page).toHaveURL('http://127.0.0.1:8080/register');
        
        await page.getByLabel('Email').fill('hello@example.com');
        await page.getByLabel('Password').fill('abcABC123!');
        await page.getByRole('button', { name: /register/i }).click();

        const successMessage = page.getByRole('status');
        await expect(successMessage).toHaveText(/registration successful/i);
    });

    test('User Login', async ({ userRegistered: page }) => {
        await page.getByRole('link', {name: 'Login'}).click();
        await page.getByLabel('Email').fill('hello@example.com');
        await page.getByLabel('Password').fill('abcABC123!');
        
        await page.getByRole('button', { name: /login/i }).click();
        await expect(page.locator('#text-display')).toHaveText('0');
    });

    test('Calculation History', async ({ userLoggedIn: page }) => {
        await page.getByRole('button', {name: '1'}).click();
        await expect(page.locator('#text-display')).toHaveText('I');
        
        await page.getByRole('button', {name: '+'}).click();
        await page.getByRole('button', {name: '2'}).click();
        await expect(page.locator('#text-display')).toHaveText('II');

        await page.getByRole('button', {name: '+'}).click();
        await expect(page.locator('#text-display')).toHaveText('III');

        await page.getByRole('button', {name: '3'}).click();
        await expect(page.locator('#text-display')).toHaveText('III');
        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('VI');

        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('VI');

        await page.getByRole('button', {name: '−'}).click();
        await page.getByRole('button', {name: '2'}).click();
        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('IIII');

        await page.getByRole('button', {name: '×'}).click();
        await page.getByRole('button', {name: '8'}).click();
        await expect(page.locator('#text-display')).toHaveText('VIII');

        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('XXXII');

        await page.getByRole('button', {name: '5'}).click();
        await expect(page.locator('#text-display')).toHaveText('V');
        await page.getByRole('button', {name: '×'}).click();
        await page.getByRole('button', {name: '9'}).click();
        await expect(page.locator('#text-display')).toHaveText('VIIII');
        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('XXXXV');

        await page.getByRole('button', {name: '÷'}).click();
        await page.getByRole('button', {name: '5'}).click();
        await expect(page.locator('#text-display')).toHaveText('V');
        await page.getByRole('button', {name: '='}).click();
        await expect(page.locator('#text-display')).toHaveText('VIIII');

        await page.getByRole('link', {name: 'History'}).waitFor();
        await page.getByRole('link', {name: 'History'}).click();
        await expect(page).toHaveURL('http://127.0.0.1:8080/history');

        //console.log(await page.content());    // [debug] print what is shown on the page

        await expect(page.getByText('I + II + III = VI')).toBeVisible();
        await expect(page.getByText('VI − II = IIII')).toBeVisible();
        await expect(page.getByText('IIII × VIII = XXXII')).toBeVisible();
        await expect(page.getByText('V × VIIII = XXXXV')).toBeVisible();
        await expect(page.getByText('XXXXV ÷ V = VIIII')).toBeVisible();

    });


    test('Logout and History Hidden', async ({ userLoggedIn: page }) => {
        await page.getByRole('link', {name: 'Logout'}).click();
        await expect(page).toHaveURL('http://127.0.0.1:8080/');

        await expect(page.getByRole('link', {name: 'History'})).toBeHidden();
        await expect(page.getByRole('link', {name: 'Login'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Register'})).toBeVisible();
    });
});
