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

        const mailOptions = {
            from: 'madhumitharathinasamy23@gmail.com',
            to: userEmail,
            subject: 'End of Day Dares Summary',
            html: `<h1>End of Day Dares Summary</h1>
             <p>Hi there,</p>
             <p>Here's the summary of your completed and pending dares:</p>
             <h2>Completed Dares:</h2>
             <ul>${completedDares}</ul>
             <h2>Pending Dares:</h2>
             <ul>${pendingDares}</ul>
             <p>Thank you for using our Dare Tracker!</p>`
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${userEmail}`);
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
    let pendingDares = []
    let completedDares = []
    for (let i = 0; i < suggestedTo.length; i++) {
        let listDare = await dareList(suggestedTo[i]);
        const pending = JSON.stringify(listDare.inprocess)
        const completed = JSON.stringify(listDare.Completed)
        console.log("pending" + pending);
        console.log("completed" + completed)
        sendEndOfDayEmail(suggestedTo[i], completed, pending);
    }
}

module.exports = {
    sendmail
}