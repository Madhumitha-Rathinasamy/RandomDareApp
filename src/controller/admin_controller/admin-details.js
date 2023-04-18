const Admin = require("../../model/admin_model/admin");

const getAdminDetails = async (req, res) => {
  const admin = await Admin.find().select("-password");
  res.status(200).json({
    admin
  });
};

const updateAdmin = async (req, res) => {
  try {
    let admin = await Admin.findByIdAndUpdate(
      req.body.id,
      {
        full_name: req.body.full_name,
        email: req.body.email,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
      },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    return res.json({
      status: "success",
      message: "Admin details updated successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to update admin details",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.body.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json({
      status: "success",
      message: "Admin deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Failed to delete admin",
    });
  }
};

module.exports = { getAdminDetails, updateAdmin, deleteAdmin };
