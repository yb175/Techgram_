// Get project ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Mock project data (replace with actual data fetching)
const project = {
    id: projectId,
    title: "AI-Powered Task Manager",
    description: "An intelligent task management system that uses machine learning to prioritize tasks and suggest optimal scheduling. Built with Python and TensorFlow, featuring a modern React-based UI.",
    image: "path/to/project-image.jpg",
    author: {
        name: "John Doe",
        avatar: "path/to/avatar.jpg"
    },
    technologies: ["Python", "TensorFlow", "React", "Node.js"],
    likes: 156,
    comments: 23,
    timestamp: "2024-02-22T10:30:00Z"
};

// Load project details
function loadProjectDetails() {
    // Set page title
    document.title = `${project.title} - TechGram`;

    // Update project information
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').textContent = project.description;
    document.getElementById('projectImage').src = project.image;
    document.getElementById('authorName').textContent = project.author.name;
    document.getElementById('authorAvatar').src = project.author.avatar;
    document.getElementById('likeCount').textContent = project.likes;
    document.getElementById('commentCount').textContent = project.comments;
    document.getElementById('postTime').textContent = formatTimestamp(project.timestamp);

    // Add tech stack tags
    const techStack = document.getElementById('techStack');
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techStack.appendChild(tag);
    });
}

// Format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadProjectDetails);
