# QUICK START GUIDE

## 🎯 Quick Execution

### Run all tests
```bash
npm test
```

### Run tests with visible browser
```bash
npm run test:headed
```

### Run a specific test
```bash
npx playwright test tests/orangehrm.spec.ts
```

### Run a specific test case
```bash
npx playwright test -g "TC001"
```

### View HTML report
```bash
npx playwright show-report
```

---

## 📋 What Tests Do

### **TC001: Login and verify My Info page navigation with passport details check**
1. ✅ Navigates to OrangeHRM login page
2. ✅ Verifies login page is loaded
3. ✅ Logs in with credentials (admin/admin123)
4. ✅ Navigates to My Info section
5. ✅ Verifies My Info page loaded
6. ✅ Gets employee name and ID
7. ✅ Navigates to Immigration section
8. ✅ Checks if passport records exist
9. ✅ Extracts passport details if available
10. ✅ Takes screenshot of immigration section

### **TC002: Detailed check of My Info navigation and section visibility**
1. ✅ Logs in to OrangeHRM
2. ✅ Navigates to My Info
3. ✅ Verifies navigation success
4. ✅ Confirms Immigration section is visible
5. ✅ Accesses Immigration section
6. ✅ Takes screenshot for documentation

### **TC003: Passport details extraction and verification**
1. ✅ Logs in and navigates to Immigration section
2. ✅ Verifies immigration page loaded
3. ✅ Checks for passport records
4. ✅ Extracts all immigration details
5. ✅ Logs passport information
6. ✅ Verifies document types

---

## 🏗️ Project Structure Overview

```
d:\Playwright-Practice\
├── 📁 pages/
│   ├── BasePage.ts              # Base class with utilities
│   ├── LoginPage.ts             # Login page object
│   ├── MyInfoPage.ts            # My Info page object
│   └── ImmigrationPage.ts       # Immigration page object
├── 📁 tests/
│   └── orangehrm.spec.ts        # Test specifications
├── 📁 config/
│   └── testConfig.ts            # Test configuration
├── 📄 playwright.config.ts      # Playwright configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 package.json              # NPM dependencies
├── 📄 README.md                 # Full documentation
├── 📄 USAGE_GUIDE.ts            # Usage examples
└── 📄 QUICK_START.md            # This file
```

---

## 🔑 Test Credentials

```
URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Username: admin
Password: admin123
```

---

## 📦 Page Objects Summary

### **BasePage.ts** - Foundation for all pages
- `navigateTo(url)` - Navigate to URL
- `fillInput(selector, text)` - Fill form fields
- `clickElement(selector)` - Click elements
- `getElementText(selector)` - Extract text
- `waitForElement(selector, timeout)` - Wait for element
- `elementExists(selector)` - Check existence
- `takeScreenshot(name)` - Capture screenshot

### **LoginPage.ts** - Login functionality
- `navigateToLoginPage()` - Go to login
- `login(username, password)` - Perform login
- `verifyLoginPageLoaded()` - Check page load
- `getErrorMessage()` - Get error text

### **MyInfoPage.ts** - My Info section
- `navigateToMyInfo()` - Go to My Info
- `navigateToImmigrationSection()` - Go to Immigration
- `getEmployeeName()` - Get employee name
- `getEmployeeID()` - Get employee ID
- `isPassportDetailsAvailable()` - Check passport data

### **ImmigrationPage.ts** - Immigration/Passport
- `hasPassportRecords()` - Check for passport records
- `getPassportRecords()` - Get all records
- `getRecordCount()` - Count records
- `getAllImmigrationDetails()` - Get all details
- `verifyDocumentTypeExists(type)` - Verify document type

---

## 🚨 Expected Test Results

### ✅ **Success Case** (Employee with Passport)
```
✓ Passport records found
✓ Passport document type verified
✓ Passport details are available
✓ Test case completed successfully
```

### ℹ️ **No Records Case** (Employee without Passport)
```
ℹ No passport records found - "No Records Found" message displayed
⚠ Warning: No passport details available for this employee
✓ Test case completed successfully (Page loaded)
```

---

## 🔄 Complete Test Flow

```
Login Page
    ↓
Enter Credentials (admin/admin123)
    ↓
Dashboard/Home Page
    ↓
Click "My Info" Menu
    ↓
My Info Page
    ↓
Click "Immigration" Tab
    ↓
Immigration Section
    ↓
Check for Passport Records
    ↓
Extract & Verify Details
    ↓
Test Complete
```

---

## 💡 Key Features of the Framework

✅ **Page Object Model Pattern**
- Maintainable and scalable test code
- Easy to locate page elements
- Reusable methods across test cases

✅ **Robust Locators**
- CSS Selectors for direct targeting
- XPath for complex selections
- Text matchers for element identification

✅ **Comprehensive Error Handling**
- Try-catch blocks for safety
- Fallback selectors for reliability
- Detailed error logging

✅ **Multiple Wait Strategies**
- Element visibility waits
- Network waits
- Custom timeouts

✅ **Logging & Reporting**
- Detailed console logs for tracking
- HTML test reports
- Screenshots on failure
- Video recording on failure

✅ **Configuration Management**
- Centralized credentials
- Environment-based settings
- Reusable constants

---

## 🐛 Troubleshooting

### **Tests timing out**
```bash
# Increase timeout in playwright.config.ts
timeout: 60000 // milliseconds
```

### **Login fails**
- Verify credentials in `config/testConfig.ts`
- Check website availability
- Clear browser cache

### **Locators not found**
```bash
# Use Playwright inspector to identify elements
npm run codegen
```

### **Screenshots not created**
- Ensure `screenshots/` directory exists
- Check file permissions
- Verify screenshot path is valid

---

## 📊 Test Reports

After running tests:

```bash
# View HTML report
npx playwright show-report

# Or navigate to: playwright-report/index.html
```

The report shows:
- ✅ Passed tests
- ❌ Failed tests with screenshots
- ⏱️ Test duration
- 🎥 Video recordings (on failure)

---

## 🎬 Running in Different Modes

### **Headless Mode (Default)**
```bash
npm test
# Runs in background, no browser window
```

### **Headed Mode (Visible Browser)**
```bash
npm run test:headed
# Browser window visible during execution
```

### **Debug Mode**
```bash
npm run test:debug
# Step through tests interactively
```

### **UI Mode**
```bash
npm run test:ui
# Interactive UI for running and debugging tests
```

---

## 📝 Test Execution Examples

### Run all tests across all browsers
```bash
npm test
```

### Run specific test in Chrome only
```bash
npx playwright test tests/orangehrm.spec.ts --project=chromium
```

### Run test and keep browser open
```bash
npm run test:headed
```

### Run with debugging
```bash
npm run test:debug
```

### Generate test from recording
```bash
npm run codegen
```

---

## ✅ Verification Checklist

After running tests:

- [ ] All test cases executed
- [ ] Console logs show expected flow
- [ ] Screenshots captured successfully
- [ ] HTML report generated
- [ ] No unhandled exceptions
- [ ] Employee information extracted
- [ ] Immigration section verified
- [ ] Passport details checked

---

## 📞 Support

For issues or questions:
1. Check console logs for error messages
2. Review HTML test report
3. Check screenshots captured
4. Verify test credentials
5. Ensure website is accessible

---

**Ready to run? Try:** `npm test`

Happy Testing! 🎭✨
