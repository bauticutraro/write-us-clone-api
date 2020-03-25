import mongoose, { Schema } from 'mongoose';

// Create Schema
const ArticleSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['public', 'private', 'unlisted', 'protected'],
    default: 'public'
  }
});

export default mongoose.model('Article', ArticleSchema);
