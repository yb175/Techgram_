// Mock project data
const projects = [
    {
        id: 1,
        title: 'AI Chat Application',
        description: 'A real-time chat application with AI-powered features like sentiment analysis and auto-responses.',
        author: 'John Doe',
        authorAvatar: 'https://avatars.githubusercontent.com/u/1',
        likes: 156,
        comments: 23,
        technologies: ['React', 'Node.js', 'Socket.io', 'TensorFlow'],
        date: '2024-02-15'
    },
    {
        id: 2,
        title: 'Blockchain Voting System',
        description: 'A secure and transparent voting system built on Ethereum blockchain.',
        author: 'Jane Smith',
        authorAvatar: 'https://avatars.githubusercontent.com/u/2',
        likes: 234,
        comments: 45,
        technologies: ['Solidity', 'Web3.js', 'React', 'Hardhat'],
        date: '2024-02-14'
    },
    {
        id: 3,
        title: 'Machine Learning Image Recognition',
        description: 'Advanced image recognition system using deep learning algorithms.',
        author: 'Mike Johnson',
        authorAvatar: 'https://avatars.githubusercontent.com/u/3',
        likes: 189,
        comments: 34,
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'Keras'],
        date: '2024-02-13'
    }
];

// DOM Elements
const projectGrid = document.getElementById('projectGrid');
const techFilter = document.getElementById('techFilter');
const sortBy = document.getElementById('sortBy');
const projectSearch = document.getElementById('projectSearch');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentPage = 1;
const projectsPerPage = 6;

// Initialize the page
function init() {
    displayProjects(projects);
    setupEventListeners();
}

// Display projects
function displayProjects(projectsToShow, append = false) {
    if (!append) {
        projectGrid.innerHTML = '';
    }

    projectsToShow.forEach(project => {
        const projectCard = createProjectCard(project);
        projectGrid.appendChild(projectCard);
    });
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-header">
            <img src="${project.authorAvatar}" alt="${project.author}" class="avatar">
            <span class="author">${project.author}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
            ${project.technologies.map(tech => `
                <span class="tech-tag">${tech}</span>
            `).join('')}
        </div>
        <div class="project-actions">
            <button class="action-btn" data-action="like">
                <i class="fas fa-heart"></i>
                <span>${project.likes}</span>
            </button>
            <button class="action-btn" data-action="comment">
                <i class="fas fa-comment"></i>
                <span>${project.comments}</span>
            </button>
            <button class="action-btn" data-action="share">
                <i class="fas fa-share"></i>
            </button>
        </div>
    `;

    // Add event listeners to action buttons
    card.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', handleProjectAction);
    });

    return card;
}

// Handle project actions (like, comment, share)
function handleProjectAction(e) {
    const action = e.currentTarget.dataset.action;
    const isLoggedIn = localStorage.getItem('user');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    switch (action) {
        case 'like':
            handleLike(e.currentTarget);
            break;
        case 'comment':
            handleComment(e.currentTarget);
            break;
        case 'share':
            handleShare(e.currentTarget);
            break;
    }
}

// Filter projects
function filterProjects() {
    const searchTerm = projectSearch.value.toLowerCase();
    const technology = techFilter.value.toLowerCase();
    const sortValue = sortBy.value;

    let filtered = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                            project.description.toLowerCase().includes(searchTerm);
        const matchesTech = !technology || project.technologies.some(tech => 
            tech.toLowerCase().includes(technology));
        return matchesSearch && matchesTech;
    });

    // Sort projects
    filtered.sort((a, b) => {
        switch (sortValue) {
            case 'popular':
                return b.likes - a.likes;
            case 'trending':
                return (b.likes + b.comments) - (a.likes + a.comments);
            case 'recent':
            default:
                return new Date(b.date) - new Date(a.date);
        }
    });

    displayProjects(filtered);
}

// Setup event listeners
function setupEventListeners() {
    projectSearch.addEventListener('input', debounce(filterProjects, 300));
    techFilter.addEventListener('change', filterProjects);
    sortBy.addEventListener('change', filterProjects);
    loadMoreBtn.addEventListener('click', loadMoreProjects);
}

// Load more projects
function loadMoreProjects() {
    currentPage++;
    // In a real application, you would fetch more projects from the server
    // For now, we'll just hide the button since we have limited mock data
    loadMoreBtn.style.display = 'none';
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
