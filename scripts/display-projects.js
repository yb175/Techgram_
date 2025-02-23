// Function to delete a project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        let projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        location.reload(); // Refresh the page to update the display
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const feedContainer = document.querySelector('.feed-container');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Load likes from localStorage
    let likes = JSON.parse(localStorage.getItem('projectLikes') || '{}');

    // Function to display projects
    function displayProjects() {
        feedContainer.innerHTML = '';
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';

            const techTags = project.technologies
                .split(',')
                .map(tech => tech.trim())
                .filter(tech => tech !== '')
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');

            let cardImage = '';
            if (project.imageUrl) {
                cardImage = `
                    <div class="card-image">
                        <img src="${project.imageUrl}" alt="${project.projectName}" class="project-image">
                    </div>
                `;
            }
console.log(projects);

            card.innerHTML = `
                <div class="card-header">
                    <div class="user-info">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACUCAMAAAC6AgsRAAAAMFBMVEX///+8vLz09PS5ubn39/e2trb8/Pzb29vm5ubCwsLPz8/MzMzh4eHe3t7Y2Njs7Ox9f7vaAAAEm0lEQVR4nO2byZqsIAxGm1EQLd7/bS9oDZYDSZmgd8G/6EV9rR4DCUnAv7+mpqampqampqampqampv9H1moZoxuGwcUotbV3Ay0k3dgHYZYSoR+cvBssS3bBqyTxrfyTD929iDZ2wqzJviiN7+JtQz0EUYJ7Ioow3AGnx+2gHhAqNeqL6ezocXBPRD9eOsruJ7qZ0F1GJ3vzI12W6S9y5gHhFbsmFFc4igxnjPc0YahuwvjzzPsyoY918QYC3ExYdYzH82P7khnr4T0oY/u24KMaHt16WaYSYMdhvSzV1cBjsl5WDQs6PrwEyL7YRUa6LOY4qElheSvleTOuwIuXAAMn3siNlwAZ47Rmp8viG2HmyTdLeS481tDyEVeQ0R5tklnYf2fyYaRzpHq8f2T1HlvY8bgI7lmpEJdSaq3T39ghZywHXoeYfSq4CewlrR0mYhqGRMHCsy8VPl90MyGmjPL0qngAn6KCXNNNhBI2IT3bt+BDVL+LlwF78NpANaCE8fbpJkIQ0FALTqjkUOEYLwFC1icXI5B3+FjAS5EGvJ6GBw2vGkrmSwaE3EvRBhhYO1KaWcRLgIABaWsI5L0qQnwyAncgebAE3t5DdEngLQh80Ms/QPNJDUQARamUoMzPIfhc+RakLBB4d8zwQgNMioCAe4Dei+GjFHLFOwtRXDveAxyAuxD4ytOvtPQu+IBF2JzHs5fwnQ+A+hK+81WSBMILyj+g+UdIsSLEh8ADFxBzPkBDfKKcXM2COnMV+aDsahpeKMOqydcj7Afl+AQ+yD+EQPBBtyD4BxBfMAkMlL6Q4gsQn7PABBW8AyE+A+ubQIRosMKkrG+I1pDqivUlZk+HwAelHqJcgmgg/56up+RXqA3BwyQaSp1nvp7Ah+vsHgCi8Gj5PWJ8sh47HSItO9S1pPoIWttfz/Bu1QDUEnsEhVRfwt21J6D4aqDm9inykAexwzaiHpJlVBhdzHJDUOgdCWKPHGz/LR9lhE/KnfwfLiI2ABHdZ+V3p1r+GdGBpuHB/UkTBilHvzoGqIwfpRxC8XSgYOhPAgOsgsuxRcsYspe8949CnH+GvJg6vGUPTnRWv302jo++D33/GOPbl7UtboTQ++OF/QVluu+4PG8eaf29VSO740Fm2OE63J9RAW5OzoTx0IQM+zNH+1uH2x47gEdZIMf+1lESOGLpJsKDtZgDb7dHjqksvwD3pjHT/upeC/5HvAy4vQnXGZNNFqgQfd0NoFtbkO8Q0SrIlmuOQ8BVLcJ3PmJ1vuQc3haQ8QTR0kXKO4JFwGUc5Dyfs2yUK1xTbV+ficJ7vml5PuyEb7wN6D5vyXwi/9XFM4gtowLg+5Aj+znjZ5DBbXkcA3rm0PLR9Oq/rhsbvmkdqXNCNoUHVEOyrL7W+dhsQYVpOJcNGFWt88UJMFiy/XSohvdnaZPvCVgNLxOS8Sp/50M1YfXPkGgWvOIrqfOEF33DdXKM9XWfmJ0AvJDuDOHVHxD+RnjPJ6KbQ50Hprvedi8hPOXiebeDWNifuRtulrVbyIT2X32DnmVfuhukqampqampqampqampqWmlf5RiPYhF+spCAAAAAElFTkSuQmCC" alt="User Avatar" class="user-avatar">
                        <div class="user-details">
                            <h3 class="project-title">${project.projectName}</h3>
                            <span class="username">@user</span>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteProject(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                ${project.imageUrl ? `
                <div class="card-image">
                    <img src="${project.imageUrl}" alt="${project.projectName}" class="project-image">
                </div>
                ` :  `<div class="card-image">
                <img src="data:image/jpeg;base64,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}" class="project-image">
                </div>`}
                <p class="project-description">${project.projectDescription}</p>
                <div class="tech-container">
                    ${techTags}
                </div>
                <div class="card-stats">
                    <button class="stat-btn comment-btn">
                        <i class="far fa-comment"></i>
                        <span>comments</span>
                    </button>
                    <button class="stat-btn retweet-btn">
                        <i class="fas fa-retweet"></i>
                        <span>retweets</span>
                    </button>
                    <button class="stat-btn like-btn" onclick="toggleLike(this, ${index})">
                        <i class="far fa-heart"></i>
                        <span>likes</span>
                    </button>
                    <button class="stat-btn view-stats-btn">
                        <i class="far fa-chart-bar"></i>
                        <span>views</span>
                    </button>
                </div>
                <div class="card-buttons">
             
                  <a href="${project.projectLink}" target="_blank" class="card-btn view-btn">
                     <button>
                        <i class="fas fa-external-link-alt"></i> View Project</button>
                    </a>
                  
                    <a href="${project.githubLink}" target="_blank" class="card-btn github-btn">
                     <button>   <i class="fab fa-github"></i> GitHub   </button>
                    </a>
                 
                </div>
            `;

            feedContainer.appendChild(card);

            // Add like button functionality
            const likeBtn = card.querySelector('.like-btn');
            likeBtn.addEventListener('click', function() {
                const projectIndex = this.dataset.index;
                likes[projectIndex] = (likes[projectIndex] || 0) + 1;
                localStorage.setItem('projectLikes', JSON.stringify(likes));
                
                // Update UI
                this.classList.add('liked');
                this.querySelector('i').className = 'fas fa-heart';
                this.querySelector('span').textContent = likes[projectIndex];
            });
        });
    }

    displayProjects();
});
