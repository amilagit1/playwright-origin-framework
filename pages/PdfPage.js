const fs = require('fs');
const path = require('path');
const pdfModule = require('pdf-parse');
const pdf = pdfModule.default || pdfModule;

class PdfPage {

  async download(page, url) {
    const response = await page.context().request.get(url);
    if (!response.ok()) {
      throw new Error(`Failed to download PDF: ${response.status()}`);
    }
    const buffer = await response.body();
    if (buffer.slice(0, 4).toString() !== '%PDF') {
      throw new Error('Downloaded file is not a valid PDF');
    }

    return buffer;
  }

  save(buffer, fileName) {
    const filePath = path.join(process.cwd(), 'downloads', fileName);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buffer);

    return filePath;
  }

  async extractText(buffer) {
    const data = await pdf(buffer);
    
    return data.text;
  }

  validateGasPlan(text) {
    return {
      hasPlanName: text.includes('Origin Basic'),
      hasFuelType: /Fuel\s*type\s*:?\s*Gas/i.test(text),
      hasGas: /Gas/i.test(text)
    };
  }
}

module.exports = { PdfPage };