const { NotFound } = require("http-errors");
const { user, User } = require("../../models");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "success",
    code: 200,
    message: "Email success verify",
  });
};

module.exports = verify;
