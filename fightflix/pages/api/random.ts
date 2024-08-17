import type { NextApiRequest, NextApiResponse } from 'next';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Store your API key in an environment variable
const PLAYLIST_ID = 'PL9m3-_Hv6qNhVCCmgvVd8oRU_5yeszfUt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Fetch playlist items from YouTube Data API
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        const videos = data.items;

        // Select a random video
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        const videoUrl = `https://www.youtube.com/watch?v=${randomVideo.snippet.resourceId.videoId}`;

        // Return the video ID and other relevant info
        res.status(200).json({
            videoId: randomVideo.snippet.resourceId.videoId,
            videoUrl: videoUrl,
            title: randomVideo.snippet.title,
            description: randomVideo.snippet.description,
            thumbnail: randomVideo.snippet.thumbnails.high.url,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random video' });
    }
}
