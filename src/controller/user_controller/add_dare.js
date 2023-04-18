const { User } = require("../../model/user_model/user");
const Dare = require("../../model/dare_model/dare");

const add_friend = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const friend = await User.findOne({ email: req.body.friendEmail });

    if (!user && !friend) {
        return res.status(401).send("User or friend not found");
    }
    else {
        user.friends.push(req.body.friendEmail)
        await user.save()
        res.status(200).json(user.friends);
    }
};

const add_dare = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.suggested_by });
        console.log(user)
        if (!user) {
            return res.status(401).send("user Not found");
        } else {
            let dare = new Dare({
                suggested_to: req.body.suggested_to,
                dare_name: req.body.dare_name,
                suggested_by: req.body.suggested_by,
                isCompleted: false
            });
            console.log(dare)
            dare.save();
            res.status(201).json({
                status: "success",
                Dare_created: {
                    suggested_to: dare.suggested_to,
                    dare_name: dare.dare_name,
                    suggested_by: dare.suggested_by,
                    isCompleted: dare.isCompleted
                },
            });
        }
    } catch (err) {
        return res.status(400).send("Dare not successfully added")
    }
}

const deleteDare = async (req, res) => {
    try {
        const dare = await Dare.findByIdAndDelete(req.body.id);
        if (!dare) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            status: "success",
            message: "dare deleted successfully",
        });
    } catch (err) {
        return res.status(400).send("Not found")
    }
}

const updateDare = async (req, res) => {
    try {
        let dare = await Dare.findByIdAndUpdate(
            req.body.id,
            {
                suggested_by: req.body.suggested_by,
                suggested_to: req.body.suggested_to,
                dare_name: req.body.dare_name
            },
            { new: true }
        );
        if (!dare) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            status: "success",
            message: "Dare updated successfully",
            dare,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to update user",
        });
    }
}

const updateCompletedStatus = async (req, res) => {
    try {
        console.log(Dare)
        let dare = await Dare.findByIdAndUpdate(
            req.body.id,
            {
                isCompleted: true,
            },
            { new: true }
        );
        if (!dare) {
            return res.status(400).send("Not found")
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully updated",
            dare: dare
        })
    } catch (err) {
        return res.status(400).send("Not updated")
    }
}

module.exports = {
    add_friend,
    add_dare,
    updateCompletedStatus,
    deleteDare,
    updateDare
};
