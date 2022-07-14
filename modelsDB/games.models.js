const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true, required: true },
  player1: { type: String, default: '' },
  player2: { type: String, default: '' },
  positions: { type: [] },
  history: [{ type: String }],
  result: { type: String, enum: ['player1', 'player2', 'tie', 'pending'], default: 'pending' },
  isCompleted: { type: Boolean, default: false },

});

module.exports = mongoose.model('Game', GameSchema);
