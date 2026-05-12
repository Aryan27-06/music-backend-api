const express= require('express');
const musicController = require('../controllers/music.controller');
const multer = require('multer');

const allowedAudioTypes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav',
    'audio/aac',
    'audio/ogg',
    'audio/webm'
];

const upload= multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!allowedAudioTypes.includes(file.mimetype)) {
            return cb(new Error('Only audio files are allowed'));
        }

        cb(null, true);
    }
});

const router = express.Router();



router.post("/upload", upload.single('music'), musicController.createMusic)

module.exports=router;
