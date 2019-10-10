const express = require('express');
const search = require('youtube-search');
const router = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');
let opts = {
    maxResults: 10,
    key: 'AIzaSyCYOYgFePAWSwUrvANxVVy77FCfMjSS4TQ'
};

/**
 * This function comment is parsed by doctrine
 * @route GET /youtube/{name}
 * @group youtube
 * @param {string} name.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.get('/:name', (req, res) => {
    search(req.params.name, opts, (err, results) => {
        if (err) return res.status(400).json(err);
        return res.json(results);
    });
});

/**
 * This function comment is parsed by doctrine
 * @route GET /youtube/download/{link}
 * @group youtube
 * @param {string} link.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.get('/download/:link', (req, res) => {
    ytdl.getInfo(req.params.link, (err, info) => {
        if (err) res.status(400).json(err);
        let audioFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
        res.json(audioFormats)
      });
});

/**
 * This function comment is parsed by doctrine
 * @route GET /youtube/download/video/{link}
 * @group youtube
 * @param {string} link.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.get('/download/video/:link', (req, res) => {
    ytdl.getInfo(req.params.link, (err, info) => {
        if (err) res.status(400).json(err);
        let audioFormats = ytdl.filterFormats(info.formats, 'videoonly');
        res.json(audioFormats)
      });
});

/**
 * This function comment is parsed by doctrine
 * @route GET /youtube/download/audio/{link}
 * @group youtube
 * @param {string} link.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.get('/download/audio/:link', (req, res) => {
    ytdl.getInfo(req.params.link, (err, info) => {
        if (err) res.status(400).json(err);
        let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        res.json(audioFormats)
      });
});

module.exports = router;