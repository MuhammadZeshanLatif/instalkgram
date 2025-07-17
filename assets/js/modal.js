// ===== MODAL FUNCTIONALITY =====

// ===== MEDIA MODAL =====
function openMediaModal(url, type, id) {
    const modal = createMediaModal();
    const modalBody = modal.querySelector('.modal-body');
    
    // Clear previous content
    modalBody.innerHTML = '';
    
    // Create media element
    let mediaElement;
    if (type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
        mediaElement.autoplay = true;
        mediaElement.loop = true;
        mediaElement.muted = true; // Start muted for autoplay
        mediaElement.className = 'w-100 h-auto';
        mediaElement.style.maxHeight = '70vh';
    } else {
        mediaElement = document.createElement('img');
        mediaElement.className = 'w-100 h-auto';
        mediaElement.style.maxHeight = '80vh';
    }
    
    mediaElement.src = url;
    mediaElement.alt = `${type} content`;
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'text-center p-4';
    loadingIndicator.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading ${type}...</p>
    `;
    
    modalBody.appendChild(loadingIndicator);
    
    // Handle media load
    mediaElement.addEventListener('load', () => {
        modalBody.removeChild(loadingIndicator);
        modalBody.appendChild(mediaElement);
        addMediaControls(modalBody, url, type, id);
    });
    
    mediaElement.addEventListener('loadeddata', () => {
        if (loadingIndicator.parentNode) {
            modalBody.removeChild(loadingIndicator);
        }
        modalBody.appendChild(mediaElement);
        addMediaControls(modalBody, url, type, id);
    });
    
    // Handle errors
    mediaElement.addEventListener('error', () => {
        modalBody.innerHTML = `
            <div class="text-center p-4">
                <i class="fas fa-exclamation-triangle text-warning fa-3x mb-3"></i>
                <h5>Failed to load ${type}</h5>
                <p class="text-muted">The ${type} could not be loaded. It may have been removed or is temporarily unavailable.</p>
                <button class="btn btn-primary" onclick="retryMediaLoad('${url}', '${type}', '${id}')">
                    <i class="fas fa-redo me-2"></i>Try Again
                </button>
            </div>
        `;
    });
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Clean up when modal is hidden
    modal.addEventListener('hidden.bs.modal', () => {
        if (mediaElement && mediaElement.pause) {
            mediaElement.pause();
        }
        document.body.removeChild(modal);
    });
}

// ===== CREATE MEDIA MODAL =====
function createMediaModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fab fa-instagram me-2"></i>
                        Media Viewer
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-0">
                    <!-- Media content will be inserted here -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// ===== ADD MEDIA CONTROLS =====
function addMediaControls(container, url, type, id) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'media-controls p-3 bg-light';
    controlsDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div class="media-info">
                <small class="text-muted">
                    <i class="fas fa-${type === 'video' ? 'play' : 'image'} me-1"></i>
                    ${type.charAt(0).toUpperCase() + type.slice(1)}
                </small>
            </div>
            <div class="media-actions">
                <button class="btn btn-outline-primary btn-sm me-2" onclick="downloadMedia('${url}', '${type}', '${id}')">
                    <i class="fas fa-download me-1"></i>Download
                </button>
                <button class="btn btn-outline-secondary btn-sm me-2" onclick="shareMedia('${url}', '${type}')">
                    <i class="fas fa-share me-1"></i>Share
                </button>
                <button class="btn btn-outline-info btn-sm" onclick="copyMediaLink('${url}')">
                    <i class="fas fa-copy me-1"></i>Copy Link
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(controlsDiv);
}

// ===== HIGHLIGHT MODAL =====
function openHighlightModal(highlightId, highlightName) {
    // This would fetch highlight stories in a real implementation
    const modal = createHighlightModal(highlightName);
    const modalBody = modal.querySelector('.modal-body');
    
    // Show loading
    modalBody.innerHTML = `
        <div class="text-center p-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading ${highlightName} stories...</p>
        </div>
    `;
    
    // Show modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Simulate loading highlight stories
    setTimeout(() => {
        const mockStories = generateMockHighlightStories();
        displayHighlightStories(modalBody, mockStories);
    }, 1000);
    
    // Clean up when modal is hidden
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

// ===== CREATE HIGHLIGHT MODAL =====
function createHighlightModal(highlightName) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-bookmark me-2"></i>
                        ${highlightName} Highlight
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <!-- Highlight stories will be inserted here -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// ===== DISPLAY HIGHLIGHT STORIES =====
function displayHighlightStories(container, stories) {
    const storiesHTML = `
        <div class="highlight-stories-grid">
            ${stories.map((story, index) => `
                <div class="highlight-story-item" onclick="openMediaModal('${story.url}', '${story.type}', '${story.id}')">
                    <img src="${story.thumbnail}" alt="Highlight story ${index + 1}" loading="lazy">
                    <div class="story-overlay">
                        <i class="fas fa-${story.type === 'video' ? 'play' : 'image'}"></i>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = storiesHTML;
}

// ===== GENERATE MOCK HIGHLIGHT STORIES =====
function generateMockHighlightStories() {
    const storyCount = Math.floor(Math.random() * 8) + 3; // 3-10 stories
    const stories = [];
    
    for (let i = 0; i < storyCount; i++) {
        const isVideo = Math.random() < 0.3; // 30% chance of video
        stories.push({
            id: `highlight_story_${i}`,
            type: isVideo ? 'video' : 'image',
            url: isVideo 
                ? `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`
                : `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`,
            thumbnail: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`
        });
    }
    
    return stories;
}

// ===== MEDIA ACTIONS =====
function downloadMedia(url, type, id) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `instalkgram_${type}_${id}_${Date.now()}`;
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success notification
    InStalkgram.showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} download started!`, 'success');
    
    // Track download (analytics)
    trackEvent('media_download', {
        type: type,
        id: id
    });
}

function shareMedia(url, type) {
    if (navigator.share) {
        // Use native sharing if available
        navigator.share({
            title: `Check out this ${type} from InStalkgram`,
            text: `Found this amazing ${type} using InStalkgram!`,
            url: url
        }).then(() => {
            InStalkgram.showNotification('Shared successfully!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(url, type);
        });
    } else {
        fallbackShare(url, type);
    }
}

function fallbackShare(url, type) {
    // Create share modal
    const shareModal = createShareModal(url, type);
    const bootstrapModal = new bootstrap.Modal(shareModal);
    bootstrapModal.show();
    
    // Clean up when modal is hidden
    shareModal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(shareModal);
    });
}

function createShareModal(url, type) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-share me-2"></i>
                        Share ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="share-options">
                        <div class="row g-3">
                            <div class="col-4">
                                <button class="btn btn-outline-primary w-100" onclick="shareToSocial('twitter', '${url}', '${type}')">
                                    <i class="fab fa-twitter fa-2x mb-2"></i>
                                    <div>Twitter</div>
                                </button>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-outline-primary w-100" onclick="shareToSocial('facebook', '${url}', '${type}')">
                                    <i class="fab fa-facebook fa-2x mb-2"></i>
                                    <div>Facebook</div>
                                </button>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-outline-primary w-100" onclick="shareToSocial('whatsapp', '${url}', '${type}')">
                                    <i class="fab fa-whatsapp fa-2x mb-2"></i>
                                    <div>WhatsApp</div>
                                </button>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-outline-primary w-100" onclick="shareToSocial('telegram', '${url}', '${type}')">
                                    <i class="fab fa-telegram fa-2x mb-2"></i>
                                    <div>Telegram</div>
                                </button>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-outline-primary w-100" onclick="shareToSocial('reddit', '${url}', '${type}')">
                                    <i class="fab fa-reddit fa-2x mb-2"></i>
                                    <div>Reddit</div>
                                </button>
                            </div>
                            <div class="col-4">
                                <button class="btn btn-outline-primary w-100" onclick="copyMediaLink('${url}')">
                                    <i class="fas fa-copy fa-2x mb-2"></i>
                                    <div>Copy Link</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function shareToSocial(platform, url, type) {
    const text = `Check out this amazing ${type} I found using InStalkgram!`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    
    let shareUrl;
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'reddit':
            shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    InStalkgram.showNotification(`Opened ${platform} sharing window`, 'info');
}

function copyMediaLink(url) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            InStalkgram.showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(url);
        });
    } else {
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        InStalkgram.showNotification('Link copied to clipboard!', 'success');
    } catch (err) {
        InStalkgram.showNotification('Failed to copy link. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ===== RETRY MEDIA LOAD =====
function retryMediaLoad(url, type, id) {
    // Close current modal and reopen
    const currentModal = document.querySelector('.modal.show');
    if (currentModal) {
        const modal = bootstrap.Modal.getInstance(currentModal);
        modal.hide();
        
        setTimeout(() => {
            openMediaModal(url, type, id);
        }, 300);
    }
}

// ===== ANALYTICS TRACKING =====
function trackEvent(eventName, properties = {}) {
    // This would send analytics data to your tracking service
    console.log('Analytics Event:', eventName, properties);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Example: Custom analytics
    if (window.analytics) {
        window.analytics.track(eventName, properties);
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    const activeModal = document.querySelector('.modal.show');
    if (!activeModal) return;
    
    switch (e.key) {
        case 'ArrowLeft':
            // Previous media (if in a gallery)
            e.preventDefault();
            // Implementation would depend on gallery structure
            break;
        case 'ArrowRight':
            // Next media (if in a gallery)
            e.preventDefault();
            // Implementation would depend on gallery structure
            break;
        case 'd':
        case 'D':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                // Trigger download of current media
                const downloadBtn = activeModal.querySelector('[onclick*="downloadMedia"]');
                if (downloadBtn) {
                    downloadBtn.click();
                }
            }
            break;
        case 's':
        case 'S':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                // Trigger share of current media
                const shareBtn = activeModal.querySelector('[onclick*="shareMedia"]');
                if (shareBtn) {
                    shareBtn.click();
                }
            }
            break;
    }
});

// ===== EXPORT FUNCTIONS =====
window.openMediaModal = openMediaModal;
window.openHighlightModal = openHighlightModal;
window.downloadMedia = downloadMedia;
window.shareMedia = shareMedia;
window.copyMediaLink = copyMediaLink;
window.shareToSocial = shareToSocial;
window.retryMediaLoad = retryMediaLoad;

