import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Link', linkSchema);
