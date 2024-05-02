import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: String,
  size: Number,
});

export default mongoose.model('Team', teamSchema);