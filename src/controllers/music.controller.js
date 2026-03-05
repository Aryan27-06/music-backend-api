const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

const createMusic = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
let decoded;
  try {
     decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(401)
        .json({ message: "You dont have access to create a music" });
    }

    const { title } = req.body;
    const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      title,
      uri: result.url,
      artist: decoded.id,
    });

    return res.status(201).json({
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.error (error);
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { createMusic };
