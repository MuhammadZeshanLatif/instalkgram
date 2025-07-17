// ===== INSTAGRAM API INTEGRATION =====

// ===== API CONFIGURATION =====
const API_CONFIG = {
    // These would be real API endpoints in production
    BASE_URL: 'https://api.instalkgram.com/v1',
    ENDPOINTS: {
        USER_INFO: '/user',
        STORIES: '/stories',
        REELS: '/reels',
        HIGHLIGHTS: '/highlights'
    },
    TIMEOUT: 10000, // 10 seconds
    MAX_RETRIES: 3
};

// ===== MAIN FETCH FUNCTION =====
async function fetchInstagramData(username) {
    try {
        // Validate username
        if (!username || !InStalkgram.isValidUsername(username)) {
            throw new Error('Invalid username provided');
        }
        
        // For demo purposes, we'll simulate API calls with mock data
        // In production, this would make real API calls
        const data = await simulateAPICall(username);
        
        return data;
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
        throw error;
    }
}

// ===== SIMULATE API CALL (FOR DEMO) =====
async function simulateAPICall(username) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Simulate occasional API errors
    if (Math.random() < 0.1) {
        throw new Error('API temporarily unavailable');
    }
    
    // Return mock data
    return generateMockData(username);
}

// ===== GENERATE MOCK DATA =====
function generateMockData(username) {
    const mockData = {
        user: {
            username: username,
            fullName: generateRandomName(),
            profilePicture: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
            isPrivate: Math.random() < 0.3, // 30% chance of private account
            isVerified: Math.random() < 0.1, // 10% chance of verified account
            followerCount: Math.floor(Math.random() * 100000),
            followingCount: Math.floor(Math.random() * 1000),
            postCount: Math.floor(Math.random() * 500),
            biography: generateRandomBio()
        },
        stories: generateMockStories(),
        reels: generateMockReels(),
        highlights: generateMockHighlights()
    };
    
    return mockData;
}

// ===== MOCK DATA GENERATORS =====
function generateRandomName() {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Sage', 'River'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function generateRandomBio() {
    const bios = [
        '🌟 Living my best life ✨',
        '📸 Photography enthusiast | 🌍 Travel lover',
        '🎨 Creative soul | ☕ Coffee addict',
        '🏃‍♀️ Fitness journey | 🥗 Healthy living',
        '📚 Bookworm | 🎵 Music lover',
        '🌱 Plant parent | 🐕 Dog lover',
        '💼 Entrepreneur | 🚀 Dream chaser',
        '🍕 Food blogger | 🍷 Wine enthusiast'
    ];
    
    return bios[Math.floor(Math.random() * bios.length)];
}

function generateMockStories() {
    const storyCount = Math.floor(Math.random() * 8) + 1; // 1-8 stories
    const stories = [];
    
    for (let i = 0; i < storyCount; i++) {
        const isVideo = Math.random() < 0.4; // 40% chance of video
        stories.push({
            id: `story_${i}`,
            type: isVideo ? 'video' : 'image',
            url: isVideo 
                ? `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`
                : `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`,
            thumbnail: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
            timestamp: Date.now() - Math.floor(Math.random() * 86400000), // Within last 24 hours
            duration: isVideo ? Math.floor(Math.random() * 15) + 5 : null // 5-20 seconds for videos
        });
    }
    
    return stories;
}

function generateMockReels() {
    const reelCount = Math.floor(Math.random() * 12) + 3; // 3-15 reels
    const reels = [];
    
    for (let i = 0; i < reelCount; i++) {
        reels.push({
            id: `reel_${i}`,
            type: 'video',
            url: `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`,
            thumbnail: `https://picsum.photos/300/400?random=${Math.floor(Math.random() * 1000)}`,
            title: generateReelTitle(),
            viewCount: Math.floor(Math.random() * 100000),
            likeCount: Math.floor(Math.random() * 10000),
            commentCount: Math.floor(Math.random() * 1000),
            timestamp: Date.now() - Math.floor(Math.random() * 2592000000), // Within last 30 days
            duration: Math.floor(Math.random() * 60) + 15 // 15-75 seconds
        });
    }
    
    return reels;
}

function generateMockHighlights() {
    const highlightCount = Math.floor(Math.random() * 6) + 1; // 1-6 highlights
    const highlights = [];
    const highlightNames = ['Travel', 'Food', 'Workout', 'Friends', 'Work', 'Pets', 'Art', 'Music'];
    
    for (let i = 0; i < highlightCount; i++) {
        const storyCount = Math.floor(Math.random() * 10) + 3; // 3-12 stories per highlight
        const stories = [];
        
        for (let j = 0; j < storyCount; j++) {
            const isVideo = Math.random() < 0.3; // 30% chance of video
            stories.push({
                id: `highlight_${i}_story_${j}`,
                type: isVideo ? 'video' : 'image',
                url: isVideo 
                    ? `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`
                    : `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`,
                thumbnail: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`
            });
        }
        
        highlights.push({
            id: `highlight_${i}`,
            name: highlightNames[i] || `Highlight ${i + 1}`,
            coverImage: `https://picsum.photos/150/150?random=${Math.floor(Math.random() * 1000)}`,
            stories: stories,
            storyCount: stories.length
        });
    }
    
    return highlights;
}

function generateReelTitle() {
    const titles = [
        'Amazing sunset vibes 🌅',
        'Quick workout routine 💪',
        'Delicious recipe tutorial 🍳',
        'Travel adventure highlights ✈️',
        'Behind the scenes content 🎬',
        'Daily motivation boost 🚀',
        'Creative art process 🎨',
        'Fun with friends 👥',
        'Pet shenanigans 🐕',
        'Life update vlog 📱'
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// ===== DISPLAY RESULTS =====
function displayResults(data) {
    const resultsSection = document.getElementById('resultsSection');
    if (!resultsSection) return;
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Display profile info
    displayProfileInfo(data.user);
    
    // Display stories
    displayStories(data.stories);
    
    // Display reels
    displayReels(data.reels);
    
    // Display highlights if available
    if (data.highlights && data.highlights.length > 0) {
        displayHighlights(data.highlights);
    }
    
    // Update recent searches
    updateRecentSearchesDisplay();
}

// ===== DISPLAY PROFILE INFO =====
function displayProfileInfo(user) {
    const profileInfoContainer = document.getElementById('profileInfo');
    if (!profileInfoContainer) return;
    
    const isPrivateWarning = user.isPrivate ? `
        <div class="alert alert-warning mt-3">
            <i class="fas fa-lock me-2"></i>
            This account is private. Only public content can be viewed.
        </div>
    ` : '';
    
    profileInfoContainer.innerHTML = `
        <div class="profile-header">
            <img src="${user.profilePicture}" alt="${user.username}" class="profile-avatar">
            <div class="profile-details">
                <h3>
                    @${user.username}
                    ${user.isVerified ? '<i class="fas fa-check-circle text-primary ms-2" title="Verified"></i>' : ''}
                </h3>
                <p class="text-muted mb-2">${user.fullName}</p>
                <p class="mb-3">${user.biography}</p>
                <div class="profile-stats">
                    <div class="stat">
                        <div class="stat-value">${formatNumber(user.postCount)}</div>
                        <div class="stat-label">Posts</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${formatNumber(user.followerCount)}</div>
                        <div class="stat-label">Followers</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${formatNumber(user.followingCount)}</div>
                        <div class="stat-label">Following</div>
                    </div>
                </div>
            </div>
        </div>
        ${isPrivateWarning}
    `;
}

// ===== DISPLAY STORIES =====
function displayStories(stories) {
    const storiesContainer = document.getElementById('storiesGrid');
    if (!storiesContainer) return;
    
    if (!stories || stories.length === 0) {
        storiesContainer.innerHTML = '<p class="text-muted">No stories available</p>';
        return;
    }
    
    const storiesHTML = stories.map(story => `
        <div class="media-item" onclick="openMediaModal('${story.url}', '${story.type}', '${story.id}')">
            <img src="${story.thumbnail}" alt="Story" loading="lazy">
            <div class="media-type">
                <i class="fas fa-${story.type === 'video' ? 'play' : 'image'}"></i>
            </div>
            <div class="media-overlay">
                <div class="media-info">
                    <small>${formatTimeAgo(story.timestamp)}</small>
                </div>
            </div>
        </div>
    `).join('');
    
    storiesContainer.innerHTML = storiesHTML;
}

// ===== DISPLAY REELS =====
function displayReels(reels) {
    const reelsContainer = document.getElementById('reelsGrid');
    if (!reelsContainer) return;
    
    if (!reels || reels.length === 0) {
        reelsContainer.innerHTML = '<p class="text-muted">No reels available</p>';
        return;
    }
    
    const reelsHTML = reels.map(reel => `
        <div class="media-item" onclick="openMediaModal('${reel.url}', '${reel.type}', '${reel.id}')">
            <img src="${reel.thumbnail}" alt="Reel" loading="lazy">
            <div class="media-type">
                <i class="fas fa-play"></i>
            </div>
            <div class="media-overlay">
                <div class="media-info">
                    <div class="mb-1">${reel.title}</div>
                    <small>
                        <i class="fas fa-eye me-1"></i>${formatNumber(reel.viewCount)}
                        <i class="fas fa-heart ms-2 me-1"></i>${formatNumber(reel.likeCount)}
                    </small>
                </div>
            </div>
        </div>
    `).join('');
    
    reelsContainer.innerHTML = reelsHTML;
}

// ===== DISPLAY HIGHLIGHTS =====
function displayHighlights(highlights) {
    // Create highlights section if it doesn't exist
    let highlightsSection = document.querySelector('.highlights-section');
    if (!highlightsSection) {
        const reelsSection = document.querySelector('.reels-section');
        highlightsSection = document.createElement('div');
        highlightsSection.className = 'highlights-section mb-4';
        highlightsSection.innerHTML = `
            <h3><i class="fas fa-bookmark me-2"></i>Highlights</h3>
            <div class="highlights-grid" id="highlightsGrid"></div>
        `;
        reelsSection.parentNode.insertBefore(highlightsSection, reelsSection.nextSibling);
    }
    
    const highlightsContainer = document.getElementById('highlightsGrid');
    if (!highlightsContainer) return;
    
    const highlightsHTML = highlights.map(highlight => `
        <div class="highlight-item" onclick="openHighlightModal('${highlight.id}', '${highlight.name}')">
            <img src="${highlight.coverImage}" alt="${highlight.name}" class="highlight-cover">
            <div class="highlight-info">
                <h6>${highlight.name}</h6>
                <small>${highlight.storyCount} stories</small>
            </div>
        </div>
    `).join('');
    
    highlightsContainer.innerHTML = highlightsHTML;
}

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else {
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }
}

// ===== ERROR HANDLING =====
function handleAPIError(error, username) {
    console.error('API Error:', error);
    
    let errorMessage = 'Failed to fetch Instagram data. ';
    
    if (error.message.includes('network')) {
        errorMessage += 'Please check your internet connection.';
    } else if (error.message.includes('timeout')) {
        errorMessage += 'Request timed out. Please try again.';
    } else if (error.message.includes('not found')) {
        errorMessage += `User "${username}" not found.`;
    } else if (error.message.includes('private')) {
        errorMessage += 'This account is private.';
    } else if (error.message.includes('rate limit')) {
        errorMessage += 'Too many requests. Please wait a moment.';
    } else {
        errorMessage += 'Please try again later.';
    }
    
    InStalkgram.showNotification(errorMessage, 'error');
}

// ===== REAL API IMPLEMENTATION (FOR PRODUCTION) =====
async function makeAPIRequest(endpoint, params = {}) {
    const url = new URL(API_CONFIG.BASE_URL + endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'InStalkgram/1.0'
            },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// ===== RETRY MECHANISM =====
async function retryAPICall(apiFunction, maxRetries = API_CONFIG.MAX_RETRIES) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await apiFunction();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) {
                throw error;
            }
            
            // Exponential backoff
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

// ===== EXPORT FUNCTIONS =====
window.fetchInstagramData = fetchInstagramData;
window.displayResults = displayResults;
window.handleAPIError = handleAPIError;

