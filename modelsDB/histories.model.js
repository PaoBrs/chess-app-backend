const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  games: [{ type: mongoose.Types.ObjectId, ref: 'Game' }],
});

module.exports = mongoose.model('History', HistorySchema);
