const FIELDS = {
  addressInput: '#address-lookup',
  planTable: "[data-id='plan-info-table-desktop']",
  electricityCheckbox: '[data-id="elc-checkbox"] input:visible',
  planRow: '[data-id="row-0"]',
  planLinkName: 'Origin Basic'
};

class PricingPage {
  constructor(page) {
    this.page = page;
    this.addressInput = page.locator(FIELDS.addressInput);
    this.planTable = page.locator(FIELDS.planTable);
    this.electricityCheckbox = page.locator(FIELDS.electricityCheckbox);
  }

async open(url) {
  await this.page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await this.page.waitForLoadState('networkidle');
}

async searchAddress(address) {

  await this.addressInput.waitFor({ state: 'visible' });
  await this.addressInput.fill(address);
  await this.page.locator('[role="listbox"] >> [role="option"]').first().waitFor({
    state: 'visible'
  });
  await this.addressInput.press('ArrowDown');
  await this.addressInput.press('Enter');
}

  async waitForPlans() {
    await this.planTable.waitFor();
  }

  async disableElectricity() {
    await this.electricityCheckbox.click();
  }

  getPlanLink() {
    return this.page
      .locator(FIELDS.planRow)
      .getByRole('link', { name: FIELDS.planLinkName });
  }

  async openPdfInNewTab() {
    const link = this.getPlanLink();
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      link.click()
    ]);
    
    return newPage;
  }

  async getPdfUrl() {
    const link = this.getPlanLink();
   
    return await link.getAttribute('href');
  }
}

module.exports = { PricingPage, FIELDS };