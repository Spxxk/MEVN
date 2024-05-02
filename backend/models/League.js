import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  name: String,
  session: String,
  sport: String,
  division: String,
  details: String,
  age: String,
  teams: [{type: String}],
});

export default mongoose.model('League', leagueSchema);