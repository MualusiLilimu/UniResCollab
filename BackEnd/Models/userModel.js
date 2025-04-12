const mongoose = require('mongoose');

const OAuthUserSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    enum: ['google', 'github']
  },
  providerId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: String,
  firstName: String,
  lastName: String,
  username: String,
  email: {
    type: String,
    unique: true,
    sparse: true 
  },
  role: {
    type: String,
    default: 'Researcher',
    enum: ['Researcher', 'Reviewer', 'Admin']
  }
});

const OAuthUser = mongoose.model('USERS', OAuthUserSchema);
module.exports = OAuthUser;
