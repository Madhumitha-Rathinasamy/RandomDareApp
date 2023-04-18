const { User } = require("../../model/user_model/user");

const getUsers = async (req, res) => {
  try {
    let user = await User.find().select("-password");
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: "Failed",
      message: "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) { 
    return res.status(404).send("Not found")
  }
};

const updateUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.body.id,
      {
        full_name: req.body.full_name,
        email: req.body.email,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        kyc_documents: req.body.kyc_documents,
        profile_image: req.body.profile_image,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      status: "success",
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Failed to delete user",
    });
  }
};

const updateKYC = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate({ email: req.body.userEmail }, {
      '$set': {
        kyc_documents: req.body.kyc_documents,
      }
    });
    if (user.count >= 4) {
      return res.status(400).json({
        status: "failed",
        message: "User blocked"
      });
    }
    if (!user) {
      return res.status(400).send("User not found")
    }
    res.status(200).send(user);
  } catch (er) {
    return res.status(401).send("Not found");
  }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser, updateKYC };