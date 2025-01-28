const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },      
      title: { type: String, required: true },
      content: { type: String, required: true },
      tags: [String],
      category: { type: String, enum: ['Scientific', 'IT'], required: true },
      image: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Blog', blogSchema);
