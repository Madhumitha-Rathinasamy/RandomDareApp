var cron = require('node-cron');
const { sendmail } = require("../../middleware/taskUpdateJob")

const sending_main = async (req, res) => {
    cron.schedule('59 23 * * *', () => {
        console.log('running a task every minute');
        sendmail;
    });
}

module.exports = {
    sending_main
}