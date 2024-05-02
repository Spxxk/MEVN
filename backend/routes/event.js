import express from 'express';
const router = express.Router();
import Event from '../models/Event.js';

router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    return res.status(201).json(req.body);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

router.put('/:game', async (req, res) => {
  try {
    await Event.updateOne({ game: req.params.game }, req.body);

    return res.status(201).json(req.body);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

router.delete('/:game', async (req, res) => {
  try {
    await Event.deleteOne({ game: req.params.game });

    return res.status(202).json({ message: 'Event successfully deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const all = await Event.find();
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error });
  }
});

router.get('/:game', async (req, res) => {
  try {
    const game = await Event.find({ game: req.params.game });
    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

export default router;
