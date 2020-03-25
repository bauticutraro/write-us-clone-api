import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected'.cyan.bold);
  } catch (err) {
    console.log('MongoDB Error'.red.bold, err);
  }
};
