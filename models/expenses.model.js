const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema(
  {
    money: {
      type: Number,
      trim: true,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
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

module.exports = mongoose.model('Expenses', ExpensesSchema);
