import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

/** 
 * @route POST /api/short
 * @desc Create short url
 * @body {origUrl, shortUrl}
 * @returns {object} Success message
 */
router.post('/short', async (req, res) => {
  const { origUrl, shortUrl } = req.body;

  const urlId = nanoid();
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ shortUrl });
      if (url) {
        res.json(url);
      } else {

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

router.get('/:origUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ origUrl: req.params.origUrl });
    if (url) {
      return res.status(200).send(url.shortUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

router.get('/all', async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    res.status(500).json('Server Error');
  }
});

export default router;
