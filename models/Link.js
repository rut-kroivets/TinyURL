import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [{
    insertedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    targetParamValue: { type: String }
  }],
  targetParamName: { type: String, default: "t"},
  targetValues: [
    {
      name: { type: String },
      value: { type: String }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Link', linkSchema);
