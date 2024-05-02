import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  type: String,
  location: String,
  longitude: Number,
  latitude: Number,
  date: Date,
  description: String,
  game: String,
  team1: String,
  team2: String,
  league: String,
});

export default mongoose.model('Event', eventSchema);
