const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Data = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    obs: String,
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Data', Data);
