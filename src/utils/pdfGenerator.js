const path = require('path');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const fs = require('fs');

exports.pdfGenerator = async (htmlFilePath, tickectName) => {

    const pdfPath = path.join(__dirname, '../public', `/ticketsPDF/${tickectName}`);

    if (fs.existsSync(pdfPath)) {
        return { pdfUrl: `/ticketsPDF/${tickectName}` };
    }

    const htmlContent = await ejs.renderFile(path.join(__dirname, '../views', `${htmlFilePath}`));

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();

    return { pdfUrl: `/ticketsPDF/${tickectName}` };
}