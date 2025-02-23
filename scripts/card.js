document.addEventListener('DOMContentLoaded', function() {
    const projectForm = document.getElementById('projectForm');

    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const projectData = {
            projectName: document.getElementById('projectName').value,
            projectDescription: document.getElementById('projectDescription').value,
            imageUrl: document.getElementById('imageUrl').value,
            technologies: document.getElementById('technologies').value,
            projectLink: document.getElementById('projectLink').value,
            githubLink: document.getElementById('githubLink').value
        };

        // Store the project data in localStorage
        let projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.unshift(projectData); // Add new project at the beginning
        localStorage.setItem('projects', JSON.stringify(projects));

        // Redirect back to index.html
        window.location.href = 'index.html';
    });
});
