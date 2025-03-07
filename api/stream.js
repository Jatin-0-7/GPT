// stream.js - Streams content from the M3U file
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'public/indian_channels.m3u');
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Playlist file not found' });
    }
    
    const playlist = fs.readFileSync(filePath, 'utf-8');
    const lines = playlist.split('\n');
    const streamUrls = lines.filter(line => line.startsWith('http'));
    
    if (streamUrls.length === 0) {
        return res.status(500).json({ error: 'No valid stream URLs found' });
    }
    
    const streamUrl = streamUrls[0]; // Select the first stream URL (modify as needed)
    try {
        const response = await fetch(streamUrl);
        res.setHeader('Content-Type', response.headers.get('content-type'));
        response.body.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stream' });
    }
}
