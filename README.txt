⚙️ Setup

1. Install dependencies
npm install

2. Install Playwright browsers
npx playwright install


▶️ Run Tests

1. Run all tests
npx playwright test

2. Run specific test
npx playwright test tests/UIAutomation.spec.js

3. Run with UI mode
npx playwright test --ui


📊 View Test Report
npx playwright show-report


🧪 What the tests do
Open Origin Energy pricing page
Search for address
Disable Electricity plans
Open/download PDF
Validate PDF content (e.g. "Fuel type: Gas", "Origin Basic")

🧠 Tech Stack
Playwright
Node.js
pdf-parse