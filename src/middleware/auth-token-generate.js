const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
    try {
        console.log(user._id)
        const peopleDetails = {
            id: user._id,
            Name: user.full_name,
            Email: user.email,
            DOB: user.date_of_birth
        }
        jwToken = jwt.sign(peopleDetails, process.env.ACCESS_TOKEN);
        console.log(jwToken)
        return jwToken;
    } catch (er) {
        return res.status(400).send('')
    }
}

module.exports = {
    generateAccessToken
}