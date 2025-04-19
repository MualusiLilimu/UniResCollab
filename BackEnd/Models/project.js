const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minlength: 15 },
  domain: { type: String, required: true },
  abstract: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  methodology: [{ type: String }],
  collaborators: [{ type: String }],
  visibility: { type: String, required: true },
  ethics: { type: String, required: true },
  dataPolicy: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('projects', projectSchema);
