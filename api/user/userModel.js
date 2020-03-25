import mongoose, { Schema } from 'mongoose';

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', UserSchema);
