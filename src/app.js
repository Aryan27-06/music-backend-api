const express = require ('express');
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth.routes');
const musicRouter = require('./routes/music.routes');
const { getAllowedOrigins } = require('./config/env');
const app = express();

const allowedOrigins = getAllowedOrigins();

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Vary', 'Origin');
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/music', musicRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Spotify Role Based Authentication API is running'
    });
});

app.use((err, req, res, next) => {
    if (err && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: 'Music file is too large'
        });
    }

    if (err && err.message === 'Only audio files are allowed') {
        return res.status(400).json({
            message: err.message
        });
    }

    console.error(err);
    return res.status(500).json({
        message: 'Internal server error'
    });
});

module.exports=app;
