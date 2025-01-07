const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const employees = require('../schema/allEmployeeSchema/allEmployeeSchema');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "vishwprajapaticodecrewinfotech@gmail.com",
        pass: "gugb cdcg musq uyre",
    },
});

exports.sendTicketByEmail = async (to, subject) => {
    const mailOptions = {
        from: 'vishwprajapaticodecrewinfotech@gmail.com',
        to: to,
        subject: subject,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

exports.setEmployeePasswordEmail = async (empEmail, password) => {
    try {
        const empData = await employees.findOne({ employeeEmail: empEmail }).select('-employeePassword -__v').populate('employeeRole', { roleName: 1 }).lean();
        const data = { ...empData, password };
        const templatePath = path.join(__dirname, '../views/admin-panel/allUsers/employeePasswordReset.ejs');

        const htmlContent = await ejs.renderFile(templatePath, { data });
        const mailOptions = {
            from: 'vishwprajapaticodecrewinfotech@gmail.com',
            to: empEmail,
            subject: 'Set Password',
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

exports.sendItenryDetailEmail = async (details, interyData, key, paymentSummary) => {
    try {
        const customerDetails = key === 0 ? details : {
            customerName: details.name,
            customerEmail: details.email,
            customerPhone: details.mobile,
            numberOfAdult: details.adults,
            numberOfChildWithBed: details.childrenWithBed,
            numberOfChildWithoutBed: details.childrenWithoutBed,
            itenaryName: interyData.packageTitle,
            travelDate: details.departureDate,
            numberOfInfants: details.infants,
            paymentSummary
        };

        const templatePath = path.join(__dirname, '../views/admin-panel/templateUrl/itenaryDetail.ejs');
        const htmlContent = await ejs.renderFile(templatePath, { customerDetails, interyData });

        const mailOptions = {
            from: 'vishwprajapaticodecrewinfotech@gmail.com',
            to: customerDetails.customerEmail,
            subject: 'Itenary Details',
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending itinerary inquiry email:', error);
    }
};

exports.sendPyamentDetails = async (details, paymentSummary) => {
    const email = [
        'vishwprajapaticodecrewinfotech@gmail.com',
        'sandipganava2357@gmail.com'
    ];

    const textContent = `
       Payment Details:

       Payment Summary: ${paymentSummary}

       Details:
       - Total Amount: ${details}
   `;

    const mailOptions = {
        from: 'vishwprajapaticodecrewinfotech@gmail.com',
        to: email,
        subject: 'Hotel Booking Payment Details',
        text: textContent,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending payment details email:', error);
    }
};

exports.sendHotelBookingDetails = async (hotelBookingDetails, personDetails, bookingAmount) => {
    try {
        const templatePath = path.join(__dirname, '../views/admin-panel/templateUrl/hotelTemplateListing.ejs');
        const htmlContent = await ejs.renderFile(templatePath, { hotelBookingDetails, personDetails, bookingAmount });

        const mailOptions = {
            from: 'vishwprajapaticodecrewinfotech@gmail.com',
            to: personDetails.email,
            subject: 'Hotel Booking',
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending hotel booking email:', err);
    }
};