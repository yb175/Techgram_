// Handle like, comment, and share actions
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function() {
        // If not logged in, redirect to login page
        if (!isLoggedIn()) {
            window.location.href = 'pages/login.html';
            return;
        }

        const action = this.querySelector('i').className;
        if (action.includes('heart')) {
            handleLike(this);
        } else if (action.includes('comment')) {
            handleComment(this);
        } else if (action.includes('share')) {
            handleShare(this);
        }
    });
});

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Handle like action
function handleLike(button) {
    button.classList.toggle('liked');
    const likesCount = button.querySelector('span');
    const currentLikes = parseInt(likesCount.textContent);
    
    if (button.classList.contains('liked')) {
        likesCount.textContent = currentLikes + 1;
        button.style.color = '#6366f1';
    } else {
        likesCount.textContent = currentLikes - 1;
        button.style.color = 'var(--text-secondary)';
    }
}

// Handle comment action
function handleComment(button) {
    // Implement comment functionality
    console.log('Comment clicked');
}

// Handle share action
function handleShare(button) {
    // Implement share functionality
    if (navigator.share) {
        navigator.share({
            title: 'Check out this project on TechGram',
            text: 'Found an interesting project on TechGram',
            url: window.location.href,
        })
        .catch(console.error);
    }
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle responsive navigation
const navLinks = document.querySelector('.nav-links');
if (window.innerWidth <= 768) {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// DOM Elements
const projectFeed = document.getElementById('projectFeed');
const scrollTrigger = document.getElementById('scrollTrigger');
const createProjectBtn = document.getElementById('createProjectBtn');
const createProjectModal = document.getElementById('createProjectModal');
const userMenu = document.getElementById('userMenu');
const globalSearch = document.getElementById('globalSearch');

// Mock data for demonstration
const mockProjects = [
    {
        id: 1,
        author: {
            name: 'John Doe',
            avatar: 'https://avatars.githubusercontent.com/u/1'
        },
        title: 'AI Chat Application',
        description: 'A real-time chat application with AI-powered features for smart conversations and automated responses.',
        preview: 'https://picsum.photos/seed/1/600/400',
        githubUrl: 'https://github.com/johndoe/ai-chat',
        technologies: ['React', 'Node.js', 'Socket.io', 'OpenAI'],
        upvotes: 156,
        comments: 23,
        timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 2,
        author: {
            name: 'Jane Smith',
            avatar: 'https://avatars.githubusercontent.com/u/2'
        },
        title: 'Blockchain Voting System',
        description: 'Secure and transparent voting system built on blockchain technology.',
        preview: 'https://picsum.photos/seed/2/600/400',
        githubUrl: 'https://github.com/janesmith/blockchain-voting',
        technologies: ['Solidity', 'Web3.js', 'React'],
        upvotes: 234,
        comments: 45,
        timestamp: new Date(Date.now() - 7200000).toISOString()
    }
];

// State management
let currentFilter = 'trending';
let isLoading = false;
let page = 1;

// Initialize all interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeVoteButtons();
    initializeComments();
    initializeFollowButtons();
    initializeShareButtons();
    initializeSaveButtons();
    initializeInfiniteScroll();
    initializeApp();
    setupEventListeners();
    initializeProjectCards();
    initializeComments();
    initializeFilters();
    initializeSearch();
});

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// Vote System
function initializeVoteButtons() {
    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', handleVoteClick);
    });
}

function handleVoteClick() {
    const isUpvote = this.classList.contains('upvote');
    const voteCount = this.querySelector('span');
    const currentCount = parseInt(voteCount?.textContent || '0');
    
    if (this.classList.contains('active')) {
        this.classList.remove('active');
        if (isUpvote) {
            voteCount.textContent = currentCount - 1;
        }
    } else {
        this.classList.add('active');
        const siblingButton = isUpvote ? 
            this.nextElementSibling : 
            this.previousElementSibling;
        
        if (siblingButton?.classList.contains('active')) {
            siblingButton.classList.remove('active');
        }
        
        if (isUpvote) {
            voteCount.textContent = currentCount + 1;
        }
    }
}

// Comments System
function initializeComments() {
    // Toggle comments section
    document.querySelectorAll('.comments-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card');
            const commentsSection = card.querySelector('.comments-section');
            commentsSection?.classList.toggle('hidden');
        });
    });

    // Comment posting
    document.querySelectorAll('.comment-input').forEach(input => {
        const postButton = input.querySelector('.post-comment-btn');
        const textInput = input.querySelector('input');

        postButton?.addEventListener('click', () => {
            if (!textInput?.value.trim()) return;

            const commentsList = input.closest('.comments-section')
                .querySelector('.comments-list');
            
            const comment = createCommentElement(
                'https://avatars.githubusercontent.com/u/1',
                'You',
                textInput.value,
                'Just now'
            );
            
            commentsList.insertBefore(comment, commentsList.firstChild);
            textInput.value = '';
        });

        textInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                postButton?.click();
            }
        });
    });
}

// Follow System
function initializeFollowButtons() {
    document.querySelectorAll('.follow-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('following');
            this.textContent = this.classList.contains('following') ? 
                'Following' : 'Follow';
        });
    });
}

// Share System
function initializeShareButtons() {
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', handleShare);
    });
}

async function handleShare() {
    const card = this.closest('.project-card');
    const projectTitle = card.querySelector('.project-info h3').textContent;
    const projectUrl = card.querySelector('.project-preview').href;

    try {
        await navigator.share({
            title: projectTitle,
            url: projectUrl
        });
    } catch (err) {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(projectUrl);
        showToast('Link copied to clipboard!');
    }
}

// Save/Bookmark System
function initializeSaveButtons() {
    document.querySelectorAll('.save-btn').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            
            const saved = icon.classList.contains('fas');
            showToast(saved ? 'Project saved!' : 'Project unsaved');
        });
    });
}

// Infinite Scroll
function initializeInfiniteScroll() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    document.querySelector('.project-grid').appendChild(loadingSpinner);

    let loading = false;
    
    window.addEventListener('scroll', () => {
        if (loading) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            loading = true;
            loadingSpinner.classList.add('show');
            
            loadMoreProjects().then(() => {
                loading = false;
                loadingSpinner.classList.remove('show');
            });
        }
    });
}

function initializeApp() {
    loadInitialProjects();
    setupInfiniteScroll();
    loadSuggestedUsers();
}

function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            projectFeed.innerHTML = '';
            page = 1;
            loadInitialProjects();
        });
    });

    // Create project modal
    createProjectBtn.addEventListener('click', () => {
        createProjectModal.style.display = 'flex';
    });

    document.querySelector('.close-btn').addEventListener('click', () => {
        createProjectModal.style.display = 'none';
    });

    // User menu dropdown
    userMenu.addEventListener('click', (e) => {
        userMenu.querySelector('.user-dropdown').classList.toggle('show');
        e.stopPropagation();
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.user-dropdown.show').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });

    // Global search
    let searchTimeout;
    globalSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchProjects(e.target.value);
        }, 300);
    });
}

function loadInitialProjects() {
    mockProjects.forEach(project => {
        const card = createProjectCard(project);
        projectFeed.appendChild(card);
    });
}

function createProjectCard(project) {
    const template = document.getElementById('projectCardTemplate');
    const card = template.content.cloneNode(true);

    // Fill in the project data
    card.querySelector('.author-name').textContent = project.author.name;
    card.querySelector('.author-name').href = `#/user/${project.author.name}`;
    card.querySelector('.project-header .avatar').src = project.author.avatar;
    card.querySelector('.project-title').textContent = project.title;
    card.querySelector('.project-description').textContent = project.description;
    card.querySelector('.project-preview img').src = project.preview;
    card.querySelector('.github-badge').href = project.githubUrl;
    card.querySelector('.vote-count').textContent = project.upvotes;
    card.querySelector('.comment-count').textContent = project.comments;
    card.querySelector('.post-time').textContent = formatTimestamp(project.timestamp);

    // Add tech stack
    const techStack = card.querySelector('.tech-stack');
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techStack.appendChild(tag);
    });

    // Setup interaction handlers
    setupCardInteractions(card.querySelector('.project-card'));

    return card;
}

function setupCardInteractions(card) {
    // Voting
    const upvoteBtn = card.querySelector('.upvote');
    const downvoteBtn = card.querySelector('.downvote');
    const voteCount = card.querySelector('.vote-count');

    upvoteBtn.addEventListener('click', () => {
        if (!upvoteBtn.classList.contains('active')) {
            upvoteBtn.classList.add('active');
            downvoteBtn.classList.remove('active');
            voteCount.textContent = parseInt(voteCount.textContent) + 1;
        } else {
            upvoteBtn.classList.remove('active');
            voteCount.textContent = parseInt(voteCount.textContent) - 1;
        }
    });

    downvoteBtn.addEventListener('click', () => {
        if (!downvoteBtn.classList.contains('active')) {
            downvoteBtn.classList.add('active');
            upvoteBtn.classList.remove('active');
            voteCount.textContent = parseInt(voteCount.textContent) - 1;
        } else {
            downvoteBtn.classList.remove('active');
            voteCount.textContent = parseInt(voteCount.textContent) + 1;
        }
    });

    // Comments
    const commentBtn = card.querySelector('.comment-section');
    const commentInput = card.querySelector('.comment-input textarea');
    const postCommentBtn = card.querySelector('.comment-input button');

    commentBtn.addEventListener('click', () => {
        commentInput.focus();
    });

    postCommentBtn.addEventListener('click', () => {
        if (commentInput.value.trim()) {
            addComment(card, {
                author: {
                    name: 'Current User',
                    avatar: 'https://avatars.githubusercontent.com/u/1'
                },
                content: commentInput.value,
                timestamp: new Date().toISOString()
            });
            commentInput.value = '';
        }
    });
}

function addComment(card, comment) {
    const commentsList = card.querySelector('.comments-list');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
        <img src="${comment.author.avatar}" alt="" class="avatar">
        <div class="comment-content">
            <a href="#" class="author-name">${comment.author.name}</a>
            <p>${comment.content}</p>
            <span class="comment-time">${formatTimestamp(comment.timestamp)}</span>
        </div>
    `;
    commentsList.appendChild(commentElement);

    // Update comment count
    const commentCount = card.querySelector('.comment-count');
    commentCount.textContent = parseInt(commentCount.textContent) + 1;
}

function setupInfiniteScroll() {
    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                loadMoreProjects();
            }
        });
    }, options);

    observer.observe(scrollTrigger);
}

function loadMoreProjects() {
    isLoading = true;
    // Simulate API call
    setTimeout(() => {
        // Clone and modify some existing projects for demonstration
        const newProjects = mockProjects.map(project => ({
            ...project,
            id: project.id + (page * 2),
            title: `${project.title} ${page + 1}`,
            upvotes: Math.floor(Math.random() * 200),
            comments: Math.floor(Math.random() * 50)
        }));

        newProjects.forEach(project => {
            const card = createProjectCard(project);
            projectFeed.appendChild(card);
        });

        page++;
        isLoading = false;
    }, 1000);
}

function searchProjects(query) {
    if (query.length < 2) {
        loadInitialProjects();
        return;
    }

    const filteredProjects = mockProjects.filter(project => {
        const searchString = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
    });

    projectFeed.innerHTML = '';
    if (filteredProjects.length > 0) {
        filteredProjects.forEach(project => {
            const card = createProjectCard(project);
            projectFeed.appendChild(card);
        });
    } else {
        projectFeed.innerHTML = '<div class="no-results">No projects found matching your search.</div>';
    }
}

function loadSuggestedUsers() {
    const mockUsers = [
        { name: 'Alice Johnson', avatar: 'https://avatars.githubusercontent.com/u/3', tech: ['Python', 'React'] },
        { name: 'Bob Wilson', avatar: 'https://avatars.githubusercontent.com/u/4', tech: ['Java', 'Spring'] },
        { name: 'Carol Brown', avatar: 'https://avatars.githubusercontent.com/u/5', tech: ['Vue.js', 'Node.js'] }
    ];

    const suggestedUsers = document.querySelector('.suggested-users');
    mockUsers.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'suggested-user';
        userElement.innerHTML = `
            <img src="${user.avatar}" alt="" class="avatar">
            <div class="user-info">
                <a href="#" class="user-name">${user.name}</a>
                <div class="user-tech">${user.tech.join(' • ')}</div>
            </div>
            <button class="btn-secondary follow-btn">Follow</button>
        `;
        suggestedUsers.appendChild(userElement);
    });
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
}

// Project Card Functionality
function initializeProjectCards() {
    // Like/Vote System
    document.querySelectorAll('.vote-btn').forEach(button => {
        button.addEventListener('click', handleVote);
    });

    // Comment System
    document.querySelectorAll('.comments-btn').forEach(button => {
        button.addEventListener('click', toggleComments);
    });

    // Share System
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', handleShare);
    });

    // Save/Bookmark System
    document.querySelectorAll('.save-btn').forEach(button => {
        button.addEventListener('click', handleSave);
    });

    // Project Stats Hover
    document.querySelectorAll('.project-preview').forEach(preview => {
        preview.addEventListener('mouseenter', showProjectStats);
        preview.addEventListener('mouseleave', hideProjectStats);
    });

    // Tech Tag Filtering
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('click', handleTechFilter);
    });
}

// Vote Handling
function handleVote(e) {
    const button = e.currentTarget;
    const isUpvote = button.classList.contains('upvote');
    const voteCount = button.querySelector('.vote-count');
    const currentCount = parseInt(voteCount?.textContent.replace(/[^0-9]/g, '') || '0');
    
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        voteCount.textContent = formatNumber(isUpvote ? currentCount - 1 : currentCount);
    } else {
        // Remove active from sibling
        const sibling = isUpvote ? 
            button.nextElementSibling : 
            button.previousElementSibling;
        sibling?.classList.remove('active');
        
        // Add active to current
        button.classList.add('active');
        voteCount.textContent = formatNumber(isUpvote ? currentCount + 1 : currentCount);
    }
    
    // Add animation
    button.style.animation = 'none';
    button.offsetHeight; // Trigger reflow
    button.style.animation = 'bounce 0.3s';
}

// Comment System
function toggleComments(e) {
    const card = e.currentTarget.closest('.project-card');
    const commentsSection = card.querySelector('.comments-section');
    const isHidden = commentsSection.classList.contains('hidden');
    
    if (isHidden) {
        // Load comments when opening
        loadComments(card);
    }
    
    commentsSection.classList.toggle('hidden');
}

async function loadComments(card) {
    const commentsList = card.querySelector('.comments-list');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    commentsList.appendChild(loadingSpinner);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add some sample comments
        const comments = generateSampleComments();
        commentsList.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
        
        // Initialize comment interactions
        initializeCommentActions(card);
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsList.innerHTML = '<p class="error">Error loading comments. Please try again.</p>';
    }
}

function initializeCommentActions(card) {
    // Like buttons
    card.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const icon = button.querySelector('i');
            const count = button.querySelector('span');
            const currentCount = parseInt(count.textContent);
            
            button.classList.toggle('active');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            count.textContent = button.classList.contains('active') ? 
                currentCount + 1 : currentCount - 1;
        });
    });
    
    // Reply buttons
    card.querySelectorAll('.reply-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const comment = button.closest('.comment');
            const replyForm = comment.querySelector('.reply-form');
            
            if (replyForm) {
                replyForm.remove();
            } else {
                const form = createReplyForm();
                comment.appendChild(form);
            }
        });
    });
}

// Share System
async function handleShare(e) {
    const card = e.currentTarget.closest('.project-card');
    const title = card.querySelector('.project-info h3').textContent;
    const url = card.querySelector('.project-preview').href;
    
    try {
        if (navigator.share) {
            await navigator.share({
                title: title,
                url: url
            });
        } else {
            // Fallback to copy to clipboard
            await navigator.clipboard.writeText(url);
            showToast('Link copied to clipboard!');
        }
    } catch (error) {
        console.error('Error sharing:', error);
        showToast('Error sharing project');
    }
}

// Save/Bookmark System
function handleSave(e) {
    const button = e.currentTarget;
    const icon = button.querySelector('i');
    const isSaved = icon.classList.contains('fas');
    
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    
    showToast(isSaved ? 'Project removed from bookmarks' : 'Project saved to bookmarks');
}

// Project Stats
function showProjectStats(e) {
    const stats = e.currentTarget.querySelector('.project-stats');
    stats.style.opacity = '1';
    stats.style.transform = 'translateY(0)';
}

function hideProjectStats(e) {
    const stats = e.currentTarget.querySelector('.project-stats');
    stats.style.opacity = '0';
    stats.style.transform = 'translateY(20px)';
}

// Tech Filter
function handleTechFilter(e) {
    const tech = e.currentTarget.dataset.tech;
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const hasTech = card.querySelector(`.tech-tag[data-tech="${tech}"]`);
        card.style.opacity = hasTech ? '1' : '0.5';
        card.style.transform = hasTech ? 'scale(1)' : 'scale(0.95)';
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-container input');
    let debounceTimeout;
    
    searchInput?.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            searchProjects(query);
        }, 300);
    });
}

function searchProjects(query) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const techs = Array.from(card.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(query) || 
            description.includes(query) ||
            techs.some(tech => tech.includes(query));
        
        card.style.display = matches ? 'block' : 'none';
    });
}

// Filter System
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            button.classList.add('active');
            
            // Apply filter
            const filter = button.textContent.toLowerCase().trim();
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        switch(filter) {
            case 'trending':
                card.style.order = card.querySelector('.badge.trending') ? '-1' : '0';
                break;
            case 'latest':
                // Sort by date
                const date = card.querySelector('.time').textContent;
                card.style.order = getTimeOrder(date);
                break;
            case 'following':
                // Show only from followed users
                const author = card.querySelector('.author-info h4').textContent;
                card.style.display = isFollowing(author) ? 'block' : 'none';
                break;
        }
    });
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getTimeOrder(timeString) {
    // Convert relative time to order value
    const hours = timeString.includes('h') ? 
        parseInt(timeString) : 
        timeString.includes('d') ? parseInt(timeString) * 24 : 0;
    return hours;
}

function isFollowing(author) {
    // Simulate following status
    const followedUsers = ['Sarah Chen', 'Alex Morgan'];
    return followedUsers.includes(author);
}

function createReplyForm() {
    const form = document.createElement('div');
    form.className = 'reply-form';
    form.innerHTML = `
        <div class="input-wrapper">
            <input type="text" placeholder="Write a reply..." />
            <div class="input-actions">
                <button class="emoji-btn">
                    <i class="far fa-smile"></i>
                </button>
                <button class="post-comment-btn">Reply</button>
            </div>
        </div>
    `;
    return form;
}

function generateSampleComments() {
    return [
        {
            author: 'Alex Morgan',
            avatar: 'https://avatars.githubusercontent.com/u/3',
            content: 'This is amazing! Love the real-time features.',
            time: '1h ago',
            likes: 24,
            isContributor: true
        },
        {
            author: 'Emma Wilson',
            avatar: 'https://avatars.githubusercontent.com/u/4',
            content: 'Great work! The UI is so clean and intuitive.',
            time: '2h ago',
            likes: 18,
            isContributor: false
        }
    ];
}

function createCommentHTML(comment) {
    return `
        <div class="comment">
            <img src="${comment.avatar}" alt="${comment.author}" class="avatar">
            <div class="comment-content">
                <div class="comment-header">
                    <div class="comment-meta">
                        <h4>${comment.author}</h4>
                        ${comment.isContributor ? '<span class="badge contributor">Contributor</span>' : ''}
                    </div>
                    <span class="time">${comment.time}</span>
                </div>
                <p>${comment.content}</p>
                <div class="comment-actions">
                    <button class="like-btn">
                        <i class="far fa-heart"></i>
                        <span>${comment.likes}</span>
                    </button>
                    <button class="reply-btn">Reply</button>
                    <button class="share-btn">Share</button>
                </div>
            </div>
        </div>
    `;
}
