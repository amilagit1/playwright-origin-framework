const { test, expect } = require('@playwright/test');
const { PricingPage } = require('../pages/PricingPage');
const { PdfPage } = require('../pages/PdfPage');
const data = require('../test-data/gasPlanData');

test('Validate Gas Plan PDF', async ({ page }) => {

  const pricing = new PricingPage(page);
  const pdfPage = new PdfPage();

  await pricing.open(data.baseUrl);

  await pricing.searchAddress(data.address);
  await pricing.waitForPlans();
  await pricing.disableElectricity();

  const href = await pricing.getPdfUrl();
  const pdfUrl = new URL(href, page.url()).toString();

  const buffer = await pdfPage.download(page, pdfUrl);

  pdfPage.save(buffer, 'origin-basic.pdf');

  const text = await pdfPage.extractText(buffer);

  const result = pdfPage.validateGasPlan(text);

  expect(result.hasPlanName).toBeTruthy();
  expect(result.hasFuelType).toBeTruthy();
  expect(result.hasGas).toBeTruthy();
});