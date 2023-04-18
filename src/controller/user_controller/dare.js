const Dare = require("../../model/dare_model/dare")
const Fuse = require('fuse.js');
const moment = require('moment');

const listDareByFriends = async (req, res) => {
    const suggestedEmail = req.body.suggested_to;
    let listSuggestedEmail = [];
    try {
        const foundEmails = await Dare.find();

        const fuseOptions = {
            keys: ['suggested_to'],
        };
        const fuse = new Fuse(foundEmails, fuseOptions);

        const result = fuse.search(suggestedEmail);
        for (i = 0; i < result.length; i++) {
            if (result[i].item.suggested_to === suggestedEmail) {
                listSuggestedEmail.push(result[i])
            }
        }
        if (listSuggestedEmail.length > 0) {
            res.json(listSuggestedEmail);
            listSuggestedEmail.length = 0;
        }
        else {
            res.json({ message: 'No suggested email addresses found' });
        }
    } catch (err) {
        return res.status(404).send("NOT found")
    }
}

const previousDatePendingDare = async (req, res) => {
    try {
        const currentDate = moment().startOf('day');
        const previousDate = moment(currentDate).subtract(1, 'day');
        console.log(Dare)
        const dare = await Dare.find({
            isCompleted: false,
            created_at: {
                $gte: previousDate.toDate(),
                $lt: currentDate.toDate()
            }
        })
        console.log('Pending dares for previous day:', dare);
        return res.status(200).json({
            status: "Success",
            message: "Pending dare for previous day",
            pendingDares: dare
        })
    } catch (error) {
        console.error(error);
        return res.status(404).send("Not found")
    };

}

module.exports = {
    listDareByFriends,
    previousDatePendingDare
}