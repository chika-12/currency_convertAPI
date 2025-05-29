const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User id required'],
  },
  base: {
    type: String,
    required: [true, 'favorite currency required'],
    minlength: 3,
    maxlength: 3,
    uppercase: true,
  },
  target: {
    type: String,
    required: [true, 'choose a target'],
    minlength: 3,
    maxlength: 3,
    uppercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

favoriteSchema.index({ userId: 1, base: 1, target: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
