const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

module.exports = mongoose.model('Icon', IconSchema);
