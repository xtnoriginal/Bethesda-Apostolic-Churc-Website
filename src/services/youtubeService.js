// YouTube API Service for fetching latest sermons
class YouTubeService {
  constructor() {
    // You'll need to get a YouTube Data API v3 key from Google Cloud Console
    this.apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY';
    this.channelId = 'UCBethesdaApostolicChurch'; // Replace with actual channel ID
    this.baseUrl = 'https://www.googleapis.com/youtube/v3';
  }

  // Extract video ID from various YouTube URL formats
  extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // Get video thumbnail URL
  getThumbnail(videoId, quality = 'maxresdefault') {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }

  // Format duration from YouTube API format (PT4M13S) to readable format (4:13)
  formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');

    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
  }

  // Format date to readable format
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Fetch latest videos from the channel
  async fetchLatestVideos(maxResults = 6) {
    try {
      // If no API key is provided, return fallback data
      if (!this.apiKey || this.apiKey === 'YOUR_YOUTUBE_API_KEY') {
        console.warn('YouTube API key not configured. Using fallback data.');
        return this.getFallbackSermons();
      }

      // Fetch latest videos from channel
      const searchUrl = `${this.baseUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet&type=video&order=date&maxResults=${maxResults}`;
      
      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) {
        throw new Error('Failed to fetch videos from YouTube');
      }
      
      const searchData = await searchResponse.json();
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');

      // Fetch video details including duration
      const videosUrl = `${this.baseUrl}/videos?key=${this.apiKey}&id=${videoIds}&part=snippet,contentDetails`;
      
      const videosResponse = await fetch(videosUrl);
      if (!videosResponse.ok) {
        throw new Error('Failed to fetch video details');
      }
      
      const videosData = await videosResponse.json();

      // Transform the data to match our sermon format
      const sermons = videosData.items.map((video, index) => ({
        id: index + 1,
        title: video.snippet.title,
        preacher: this.extractPreacherFromTitle(video.snippet.title),
        date: this.formatDate(video.snippet.publishedAt),
        duration: this.formatDuration(video.contentDetails.duration),
        image: this.getThumbnail(video.id),
        video: `https://youtu.be/${video.id}`,
        description: video.snippet.description.substring(0, 150) + '...',
        publishedAt: video.snippet.publishedAt,
        videoId: video.id
      }));

      return sermons;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return this.getFallbackSermons();
    }
  }

  // Extract preacher name from video title
  extractPreacherFromTitle(title) {
    // Common patterns for preacher names in titles
    const patterns = [
      /(?:Bishop|Pastor|Rev\.?|Dr\.?)\s+([^-|,]+)/i,
      /(?:by|with)\s+([^-|,]+)/i,
      /([^-|,]+)(?:\s*-|\s*\|)/,
    ];

    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    // Default to extracting name from common church patterns
    if (title.includes('Manhango')) return 'Bishop N Manhango';
    if (title.includes('Mai ArchBishop')) return 'Mai ArchBishop Manhango';
    
    return 'Bethesda Apostolic Church';
  }

  // Fallback sermons data when API is not available
  getFallbackSermons() {
    return [
      {
        id: 1,
        title: 'Murehwa-Mutoko Passover 2025 || Bishop N Manhango',
        preacher: 'Bishop N Manhango',
        date: 'July 27, 2025',
        duration: '46:11',
        image: '/images/1.jpg',
        video: 'https://youtu.be/HPVrTZjYbPY?si=EyQLsJ9TiJTO41SP',
        description: 'Murehwa-Mutoko Passover 2025',
        publishedAt: '2025-07-27T00:00:00Z',
        videoId: 'HPVrTZjYbPY'
      },
      {
        id: 2,
        title: 'Marondera Passover 2025 - Mai ArchBishop Manhango',
        preacher: 'Mai ArchBishop Manhango',
        date: 'June 11, 2023',
        duration: '10:12',
        image: '/images/2.jpg',
        video: 'https://youtu.be/HPgtLSWVSnU?si=NJ49NDca3oRhhun7',
        description: 'Marondera Passover 2025',
        publishedAt: '2023-06-11T00:00:00Z',
        videoId: 'HPgtLSWVSnU'
      },
      {
        id: 3,
        title: 'Zaka Jerera Passover 2025 - Mai ArchBishop Manhango Sermon',
        preacher: 'Mai ArchBishop Manhango',
        date: 'July 20, 2025',
        duration: '10:52',
        image: '/images/3.jpg',
        video: 'https://youtu.be/mwRDA6jkILk?si=WzDzXfFfxjhldyG_',
        description: 'Zaka Jerera Passover 2025',
        publishedAt: '2025-07-20T00:00:00Z',
        videoId: 'mwRDA6jkILk'
      },
    ];
  }

  // Check for new videos by comparing with cached data
  async hasNewVideos(cachedSermons = []) {
    try {
      const latestVideos = await this.fetchLatestVideos(1);
      if (latestVideos.length === 0) return false;

      const latestVideoDate = new Date(latestVideos[0].publishedAt);
      const cachedLatestDate = cachedSermons.length > 0 ? 
        new Date(cachedSermons[0].publishedAt) : 
        new Date(0);

      return latestVideoDate > cachedLatestDate;
    } catch (error) {
      console.error('Error checking for new videos:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
const youtubeService = new YouTubeService();
export default youtubeService;