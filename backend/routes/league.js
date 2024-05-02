import express from 'express';
const router = express.Router();
import League from '../models/League.js';


router.post('/', async (req, res) => {
    try {
      const newLeague = new League(req.body);
      await newLeague.save();
  
      return res.status(201).json(req.body);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' + error });
    }
});

router.delete('/:league', async (req, res) => {
  try {
    await League.deleteOne({ name: req.params.league });

    return res.status(202).json({ message: 'League successfully deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const all = await League.find();
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error });
  }
});

router.get('/:league', async (req, res) => {
  try {
    const league = await League.find({ name: req.params.league });
    return res.status(200).json(league);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

export default router;
