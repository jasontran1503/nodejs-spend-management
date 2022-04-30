const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    icon: {
      type: String,
      trim: true,
      required: true
    },
    color: {
      type: String,
      trim: true,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

module.exports = mongoose.model('Category', CategorySchema);
