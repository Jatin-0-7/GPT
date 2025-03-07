// generatePlaylist.js - Serves the uploaded M3U file dynamically
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'public/indian_channels.m3u');
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Playlist file not found' });
    }

    const playlist = fs.readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Type', 'audio/x-mpegurl');
    res.send(playlist);
}
