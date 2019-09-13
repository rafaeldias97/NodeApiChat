const express = require('express');
const router = express.Router();
const Youtube = require('youtube-node')
const youtube = new Youtube();
youtube.setKey('adasdasdoas');

router.get('', (req, res) => {
    youTube.search(req.params.title, req.params.pagination, (error, result) => {
        if (error) {
            res.status(400).json(error);
            return;
        }
        res.json(JSON.stringify(result));
    });
});