const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const musicDir = path.join(__dirname, 'music');
app.get('/songs', (req, res) => {
    fs.readdir(musicDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Không thể đọc thư mục' });
        }
        const songs = files.filter(file => file.endsWith('.mp3'));
        res.json(songs);
    });
});
app.use('/music', express.static(musicDir));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});