# OrangeHRM Test Automation - Page Object Model Framework

This repository contains a robust Playwright-based test automation framework using the **Page Object Model (POM)** design pattern for testing the OrangeHRM website.

## 📋 Project Overview

This framework automates the following test scenarios:
- **Login to OrangeHRM** with valid credentials
- **Navigate to My Info** section
- **Access Immigration details** and verify passport information
- **Extract and validate** employee passport records

## 📁 Project Structure

```
orangehrm-automation/
├── pages/                      # Page Object Models
│   ├── BasePage.ts            # Base class with common methods
│   ├── LoginPage.ts           # Login page object
│   ├── MyInfoPage.ts          # My Info page object
│   └── ImmigrationPage.ts     # Immigration/Passport page object
├── tests/                      # Test specifications
│   └── orangehrm.spec.ts      # Main test cases
├── config/                     # Configuration files
│   └── testConfig.ts          # Test credentials and constants
├── screenshots/               # Screenshots directory
├── playwright.config.ts       # Playwright configuration
├── package.json              # NPM dependencies
└── README.md                 # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (with visible browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI mode
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/orangehrm.spec.ts
```

### Run specific test case
```bash
npx playwright test -g "TC001"
```

## 📄 Page Object Model Details

### **BasePage** (`pages/BasePage.ts`)
Base class containing common utilities used across all page objects:
- Navigation methods
- Element interaction methods (click, fill, getText)
- Wait and visibility methods
- Screenshot capture
- Error handling

### **LoginPage** (`pages/LoginPage.ts`)
Handles login functionality:
- **Locators:**
  - `usernameInput`: Username input field
  - `passwordInput`: Password input field
  - `loginButton`: Login button
  - `loginErrorMessage`: Error message display
  
- **Methods:**
  - `navigateToLoginPage()`: Navigate to login page
  - `login(username, password)`: Perform login action
  - `loginWithVerification()`: Login with verification
  - `verifyLoginPageLoaded()`: Check if login page is loaded
  - `getErrorMessage()`: Get error message text

### **MyInfoPage** (`pages/MyInfoPage.ts`)
Handles My Info section:
- **Locators:**
  - `myInfoMenuItem`: My Info menu item
  - `immigrationTab`: Immigration section tab
  - `employeeName`: Employee name field
  - `employeeID`: Employee ID field
  
- **Methods:**
  - `navigateToMyInfo()`: Navigate to My Info
  - `navigateToImmigrationSection()`: Navigate to Immigration section
  - `getPassportDetails()`: Extract passport details
  - `isPassportDetailsAvailable()`: Check passport availability
  - `getEmployeeName()`: Get employee name
  - `getEmployeeID()`: Get employee ID

### **ImmigrationPage** (`pages/ImmigrationPage.ts`)
Handles immigration/passport details:
- **Locators:**
  - `immigrationTable`: Immigration records table
  - `documentNumberField`: Document number field
  - `issuedDateField`: Issued date field
  - `expiryDateField`: Expiry date field
  - `issuanceCountryField`: Issuance country field
  
- **Methods:**
  - `verifyImmigrationPageLoaded()`: Verify page load
  - `hasPassportRecords()`: Check if passport records exist
  - `getPassportRecords()`: Get all passport records
  - `getFirstPassportDetails()`: Get first passport details
  - `verifyDocumentTypeExists(documentType)`: Verify document type
  - `getAllImmigrationDetails()`: Get all immigration details

## 🧬 Test Cases

### **TC001: Login and verify My Info page with passport details**
- Navigate to OrangeHRM login page
- Login with valid credentials
- Navigate to My Info section
- Access Immigration section
- Verify passport details availability
- Capture screenshots

### **TC002: Detailed My Info navigation and section visibility**
- Login to OrangeHRM
- Verify My Info navigation
- Check Immigration section visibility
- Verify all sections are accessible

### **TC003: Passport details extraction and verification**
- Login and navigate to Immigration section
- Extract passport records
- Verify passport document type
- Log all immigration details

## 🔐 Test Credentials

Default test credentials in `config/testConfig.ts`:
```typescript
Username: admin
Password: admin123
```

## 📊 Reports

After running tests, an HTML report is generated in the `playwright-report` directory:
```bash
npx playwright show-report
```

## 📸 Screenshots and Videos

- Screenshots are captured on test failures in the `screenshots/` directory
- Videos are recorded for failed tests

## 🎯 Best Practices Implemented

1. **Page Object Model Pattern**: Each page is represented as a separate class
2. **Separation of Concerns**: Locators and methods are organized logically
3. **Reusable Methods**: Common actions are in BasePage class
4. **Robust Selectors**: Multiple selector strategies for element identification
5. **Error Handling**: Try-catch blocks for error scenarios
6. **Logging**: Detailed console logs for test execution flow
7. **Wait Strategies**: Proper waits for element visibility and page load
8. **Configuration**: Centralized test configuration and constants

## 🔧 Locator Strategies

The framework uses multiple selector strategies:
- **CSS Selectors**: For direct element targeting
- **XPath**: For complex element selection
- **Text Matchers**: For elements identified by visible text
- **Attribute Selectors**: For elements with specific attributes

## ⚙️ Configuration Options

Edit `playwright.config.ts` to customize:
- Browser types (Chromium, Firefox, WebKit)
- Viewport size and resolution
- Timeout values
- Reporter settings
- Screenshot and video capture options
- Retry strategy

## 🐛 Troubleshooting

### Tests timeout
- Increase `timeout` value in `playwright.config.ts`
- Check if elements are dynamically loaded

### Locators not found
- Use `npm run codegen` to generate selectors automatically
- Update locators in page object classes
- Check if element is within iframe

### Login fails
- Verify credentials in `config/testConfig.ts`
- Check website availability
- Clear browser cache and cookies

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Locators Guide](https://playwright.dev/docs/locators)

## 🤝 Contributing

1. Create a new branch for features/fixes
2. Update page objects with new locators/methods
3. Add corresponding test cases
4. Follow existing code structure and naming conventions
5. Ensure all tests pass before submitting

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Created as a demonstration of Playwright Page Object Model framework best practices.

---

**Happy Testing! 🎭**
