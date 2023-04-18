const nodemailer = require('nodemailer');
const { dareList } = require("../middleware/getDareDetails")
const Dare = require('../model/dare_model/dare')

async function sendEndOfDayEmail(userEmail, completedDares, pendingDares) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "madhumitharathinasamy23@gmail.com",
                pass: "zhyjsdmjvorfvfdb",
            },
        });

        const pending = JSON.stringify(pendingDares)
        const completed = JSON.stringify(completedDares)

        const mailOptions = {
            from: 'madhumitharathinasamy23@gmail.com',
            to: userEmail,
            subject: 'End of Day Dares Summary',
            html: `<h1>End of Day Dares Summary</h1>
             <p>Hi there,</p>
             <p>Here's the summary of your completed and pending dares:</p>
             <h2>Completed Dares:</h2>
             <ul>${completed}</ul>
             <h2>Pending Dares:</h2>
             <ul>${pending}</ul>
             <p>Thank you for using our Dare Tracker!</p>`
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${userEmail} with message id: ${info.messageId}`);
    } catch (error) {
        console.error(`Failed to send email: ${error}`);
    }
}

const sendmail = async (req, res) => {
    const dare = await Dare.find();
    let suggestedTo = [];
    for (i = 0; i < dare.length; i++) {
        if (!suggestedTo.includes(dare[i].suggested_to)) {
            suggestedTo.push(dare[i].suggested_to)
        }
    }
    for (i = 0; i < suggestedTo.length; i++) {
        console.log(suggestedTo.length)
        const userEmail = suggestedTo[i];
        let listDare = await dareList(suggestedTo[i]);

        // const userEmail = suggestedTo[i];
        const completedDares = listDare.Completed;
        const pendingDares = listDare.inprocess;

        await sendEndOfDayEmail(userEmail, completedDares, pendingDares);
    }
}

module.exports = {
    sendmail
}