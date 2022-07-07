const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true, required: true },
  player1: { type: mongoose.Types.ObjectId, ref: 'User' },
  player2: { type: mongoose.Types.ObjectId, ref: 'User' },
  positions: [{ type: String }],
  history: [{ type: String }],
  result: { type: String, enum: ['player1', 'player2', 'tie', 'pending'], default: 'pending' },
  isCompleted: { type: Boolean, default: false },

});

module.exports = mongoose.model('Game', GameSchema);
