import express from 'express';
import Url from '../models/Url.js';

const router = express.Router();

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          shortUrl: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.status(200).send(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;
