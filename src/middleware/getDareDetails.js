const Dare = require("../model/dare_model/dare")
const Fuse = require('fuse.js');

let inProcess = []
let completedStatus = []

const dareList = async (suggestedEmail) => {
    try {
        const foundEmails = await Dare.find();

        const fuseOptions = {
            keys: ['suggested_to'],
        };
        if (inProcess.length > 0 || completedStatus.length > 0) {
            inProcess.length = 0;
            completedStatus.length = 0;
        }

        const fuse = new Fuse(foundEmails, fuseOptions);
        const result = fuse.search(suggestedEmail);
        for (i = 0; i < result.length; i++) {
            if (result[i].item.suggested_to === suggestedEmail && result[i].item.isCompleted === false) {
                inProcess.push({ dare: result[i].item.dare_name })
            }
            else if (result[i].item.suggested_to === suggestedEmail && result[i].item.isCompleted === true) {
                completedStatus.push({ dare: result[i].item.dare_name })
            }
        }
        return ({
            inprocess: inProcess,
            Completed: completedStatus
        })

    } catch (err) {
        return res.status(404).send("NOT found")
    }
}

module.exports = {
    dareList
}