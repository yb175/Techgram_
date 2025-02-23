// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const modal = document.getElementById('shareProjectModal');
    const shareBtn = document.querySelector('.share-project');
    const closeBtn = document.querySelector('.close');
    const projectForm = document.getElementById('projectForm');
    const feedContainer = document.querySelector('.feed-container');

    // Open modal
    shareBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission
    projectForm.onsubmit = function(e) {
        e.preventDefault();

        // Get form values
        const projectName = document.getElementById('projectName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const technologies = document.getElementById('technologies').value.split(',').map(tech => tech.trim());
        const projectLink = document.getElementById('projectLink').value;
        const githubLink = document.getElementById('githubLink').value;

        // Create new project card
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-header">
                <img src="assets/avatar.png" alt="User Avatar" class="user-avatar">
                <div class="user-info">
                    <h3>${projectName}</h3>
                    <span class="username">@user</span>
                </div>
            </div>
            <div class="project-content">
                <p>${projectDescription}</p>
                <div class="tech-stack">
                    ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${projectLink}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> View Project
                    </a>
                    <a href="${githubLink}" target="_blank" class="github-link">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;

        // Add card to feed container after the first child (share button)
        const firstCard = feedContainer.querySelector('.project-card');
        if (firstCard) {
            feedContainer.insertBefore(card, firstCard);
        } else {
            feedContainer.appendChild(card);
        }

        // Reset form and close modal
        projectForm.reset();
        modal.style.display = "none";
    }
});
