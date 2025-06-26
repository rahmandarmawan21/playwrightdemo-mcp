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