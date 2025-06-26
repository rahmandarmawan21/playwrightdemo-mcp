import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/loginPage';
import { users } from '../data/users';

test('login to saucedemo with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.valid.username, users.valid.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

test('login to saucedemo with locked_out_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

test('login to saucedemo with problem_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.problem.username, users.problem.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

test('login to saucedemo with performance_glitch_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.performanceGlitch.username, users.performanceGlitch.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});

test('login to saucedemo with valid username and invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with invalid username and valid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', users.valid.password);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with both username and password invalid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', 'invalid_pass');
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with empty username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('login to saucedemo with empty username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', users.valid.password);
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('login to saucedemo with empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.valid.username, '');
  await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});

test('login to saucedemo with username containing special characters', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user!@#$', 'somepassword');
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with password containing leading/trailing spaces', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.valid.username, ' secret_sauce ');
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with SQL injection in username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("' OR 1=1; --", 'somepassword');
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with SQL injection in password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.valid.username, "' OR 1=1; --");
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with whitespace-only username', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('   ', users.valid.password);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with whitespace-only password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.valid.username, '   ');
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('login to saucedemo with extremely long username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  const longUsername = 'user'.repeat(50);
  const longPassword = 'pass'.repeat(50);
  await loginPage.login(longUsername, longPassword);
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});