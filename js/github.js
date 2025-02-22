// DOM Elements
const connectGithubBtn = document.getElementById('connectGithub');
const repoSection = document.getElementById('repoSection');
const repoGrid = document.getElementById('repoGrid');
const repoSearch = document.getElementById('repoSearch');
const repoFilter = document.getElementById('repoFilter');

// Mock GitHub repositories data
const mockRepos = [
    {
        name: 'ai-chat-app',
        description: 'A real-time chat application with AI-powered features',
        isPrivate: false,
        stars: 156,
        forks: 23,
        language: 'JavaScript',
        updatedAt: '2024-02-15'
    },
    {
        name: 'blockchain-voting',
        description: 'Secure and transparent voting system using Ethereum',
        isPrivate: true,
        stars: 89,
        forks: 12,
        language: 'Solidity',
        updatedAt: '2024-02-14'
    },
    {
        name: 'ml-image-recognition',
        description: 'Machine learning-based image recognition system',
        isPrivate: false,
        stars: 234,
        forks: 45,
        language: 'Python',
        updatedAt: '2024-02-13'
    }
];

// Initialize the page
function init() {
    setupEventListeners();
    checkGithubConnection();
}

// Setup event listeners
function setupEventListeners() {
    connectGithubBtn.addEventListener('click', handleGithubConnect);
    repoSearch.addEventListener('input', debounce(filterRepos, 300));
    repoFilter.addEventListener('change', filterRepos);
}

// Check if user is connected to GitHub
function checkGithubConnection() {
    const isConnected = localStorage.getItem('githubConnected');
    if (isConnected) {
        showRepos();
    }
}

// Handle GitHub connection
function handleGithubConnect() {
    // In a real application, this would redirect to GitHub OAuth
    // For demo purposes, we'll just simulate the connection
    localStorage.setItem('githubConnected', 'true');
    showRepos();
}

// Show repositories section
function showRepos() {
    connectGithubBtn.style.display = 'none';
    repoSection.classList.remove('hidden');
    displayRepos(mockRepos);
}

// Display repositories
function displayRepos(repos) {
    repoGrid.innerHTML = '';
    repos.forEach(repo => {
        const repoCard = createRepoCard(repo);
        repoGrid.appendChild(repoCard);
    });
}

// Create repository card
function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.innerHTML = `
        <h3>
            <i class="fas fa-book"></i>
            ${repo.name}
        </h3>
        <p>${repo.description || 'No description available'}</p>
        <div class="repo-stats">
            <span>
                <i class="fas fa-code"></i>
                ${repo.language}
            </span>
            <span>
                <i class="fas fa-star"></i>
                ${repo.stars}
            </span>
            <span>
                <i class="fas fa-code-branch"></i>
                ${repo.forks}
            </span>
        </div>
        <div class="repo-actions">
            <span class="repo-visibility ${repo.isPrivate ? 'private' : 'public'}">
                ${repo.isPrivate ? 'Private' : 'Public'}
            </span>
            <button class="import-btn" data-repo="${repo.name}">
                Import to TechGram
            </button>
        </div>
    `;

    // Add event listener to import button
    card.querySelector('.import-btn').addEventListener('click', handleRepoImport);

    return card;
}

// Handle repository import
function handleRepoImport(e) {
    const repoName = e.currentTarget.dataset.repo;
    const button = e.currentTarget;

    // Simulate import process
    button.textContent = 'Importing...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Imported ✓';
        button.style.backgroundColor = '#2ea44f';
    }, 1500);
}

// Filter repositories
function filterRepos() {
    const searchTerm = repoSearch.value.toLowerCase();
    const visibility = repoFilter.value;

    const filtered = mockRepos.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchTerm) ||
                            (repo.description && repo.description.toLowerCase().includes(searchTerm));
        const matchesVisibility = visibility === 'all' ||
                                (visibility === 'public' && !repo.isPrivate) ||
                                (visibility === 'private' && repo.isPrivate);
        return matchesSearch && matchesVisibility;
    });

    displayRepos(filtered);
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

// Initialize the page
init();
