const path = require('path');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const fs = require('fs');

exports.pdfGenerator = async (htmlFilePath, tickectName, ticketData) => {

    const pdfPath = path.join(__dirname, '../public', `/ticketsPDF/${tickectName}`);

    if (fs.existsSync(pdfPath)) {
        return { pdfUrl: `/ticketsPDF/${tickectName}` };
    }

    const htmlContent = await ejs.renderFile(
        path.join(__dirname, '../views', htmlFilePath),
        ticketData 
    );

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true, 
    });

    await browser.close();

    return { pdfUrl: `/ticketsPDF/${tickectName}` };
}