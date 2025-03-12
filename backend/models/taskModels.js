const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assigned user
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Created user
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
