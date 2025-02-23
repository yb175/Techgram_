// Function to update project links
function updateProjectLinks(projectCard, githubUrl, projectUrl) {
    const githubButton = projectCard.querySelector('[data-github]');
    const projectButton = projectCard.querySelector('[data-project]');

    if (githubButton && githubUrl) {
        githubButton.setAttribute('data-github', githubUrl);
    }

    if (projectButton && projectUrl) {
        projectButton.setAttribute('data-project', projectUrl);
    }
}

// Function to handle project link clicks
function handleProjectLinkClick(event) {
    const url = event.currentTarget.getAttribute('data-github') || event.currentTarget.getAttribute('data-project');
    if (url) {
        window.open(url, '_blank');
    }
}

// Initialize project links
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all project link buttons
    const projectButtons = document.querySelectorAll('[data-github], [data-project]');
    projectButtons.forEach(button => {
        button.addEventListener('click', handleProjectLinkClick);
    });
});
