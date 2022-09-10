const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    title: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    status: { type: String, default: "pending" },
    gender: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    img: {
      type: String,
      default:
        "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
