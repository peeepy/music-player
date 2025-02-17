import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use("/music", express.static(path.join(__dirname, "music")));
app.use(express.static("public"));

app.get("/api/songs", (req, res) => {
    const musicDir = path.join(__dirname, "music");
    const songs = [];

    fs.readdirSync(musicDir).forEach(artist => {
        const artistPath = path.join(musicDir, artist);
        if (fs.statSync(artistPath).isDirectory()) {
            fs.readdirSync(artistPath).forEach(file => {
                if (file.endsWith(".mp3")) {
                    songs.push({
                        title: file.replace(".mp3", ""), // Remove file extension
                        artist: artist,
                        filePath: `music/${artist}/${file}`,
                        albumArt: `music/${artist}/album_art.jpg`
                    });
                }
            });
        }
    });

    res.json(songs);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
