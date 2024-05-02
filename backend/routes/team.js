import express from 'express';
const router = express.Router();
import Team from '../models/Team.js';
import { isAuthenticated, hasPermission } from '../utils/authenticated.js';


router.post('/', isAuthenticated, hasPermission('admin'), async (req, res) => {
    try {
      const newTeam = new Team(req.body);
      await newTeam.save();
  
      return res.status(201).json(req.body);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' + error });
    }
});

router.delete('/:team', isAuthenticated, hasPermission('admin'), async (req, res) => {
  try {
    await Team.deleteOne({ team: req.params.team });

    return res.status(202).json({ message: 'Team successfully deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const all = await Team.find();
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error });
  }
});

router.get('/:team', async (req, res) => {
  try {
    const team = await Team.find({ name: req.params.team });
    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' + error });
  }
});

export default router;
