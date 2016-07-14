const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  votes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['private', 'public'],
    default: 'public',
    index: true,
  },
}, {
  autoIndex: true,
  timestamps: true,
});

module.exports = mongoose.model('Quote', quoteSchema);
