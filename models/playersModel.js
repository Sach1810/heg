var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerOneSchema = new Schema({
  id: String
});

var playerTwoSchema = new Schema({
  id: String
});

var PlayerOne = mongoose.model('PlayerOne', playerOneSchema);
var PlayerTwo = mongoose.model('PlayerTwo', playerTwoSchema);


module.exports = {PlayerOne: PlayerOne, PlayerTwo: PlayerTwo}

// {
//   PlayerOne: PlayerOne,
//   PlayerTwo: PlayerTwo
// }
