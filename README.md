# 🧪 Playwright MCP Automation Project

A modern end-to-end testing framework for the [SauceDemo](https://www.saucedemo.com/v1/index.html) web application, using Playwright, Page Object Model, and organized test data.

---

## 📁 Project Structure

```
playwright-mcp/
├── data/
│   └── users.ts           # Test user credentials
├── pageObject/
│   └── loginPage.ts       # Page Object for login page
├── tests/
│   └── login-saucedemo.spec.ts # Main Playwright test suite
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Run all tests**
   ```sh
   npx playwright test
   ```
3. **Run a specific test file**
   ```sh
   npx playwright test tests/login-saucedemo.spec.ts
   ```
4. **View HTML test report**
   ```sh
   npx playwright show-report
   ```

---

## 🏗️ Key Features

- **Page Object Model**: Clean separation of page logic and test logic.
- **Centralized Test Data**: All user credentials are managed in `data/users.ts`.
- **Comprehensive Scenarios**: Includes positive and negative login tests for all user types.
- **Easy Maintenance**: Modular structure for scalable test development.

---

## 📚 File Descriptions

- `data/users.ts` — Stores all test user credentials.
- `pageObject/loginPage.ts` — Encapsulates login page locators and actions.
- `tests/login-saucedemo.spec.ts` — Contains all login test scenarios.
- `playwright.config.ts` — Playwright configuration (browsers, timeouts, etc).

---

## 🧑‍💻 Example Test Scenario

```typescript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login(users.valid.username, users.valid.password);
await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
```

---

## 💡 Tips
- Add new users in `data/users.ts` for more scenarios.
- Extend `loginPage.ts` for more page actions.
- Use Playwright's built-in reporters for advanced reporting.

---

## 🦾 Author & Credits
- Automated by Playwright MCP
- Maintained by your QA Automation Team

---

## 📜 License
MIT
