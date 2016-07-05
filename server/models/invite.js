const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    index: true,
  },
  invited: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
}, {
  autoIndex: true,
  timestamps: true,
});

module.exports = mongoose.model('Invite', inviteSchema);