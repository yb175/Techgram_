// Check authentication state
function checkAuth() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        window.location.href = 'pages/login.html';
        return;
    }

    // Get user data
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (user) {
        updateUIWithUserData(user);
    }
}

// Update UI with user data
function updateUIWithUserData(user) {
    // Add user profile to sidebar
    const sidebar = document.querySelector('.sidebar');
    const userProfile = document.createElement('div');
    userProfile.className = 'user-profile';
    userProfile.innerHTML = `
        <div class="profile-info">
            <div class="avatar">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=random" alt="${user.username}">
            </div>
            <div class="user-details">
                <h4>${user.fullname}</h4>
                <p>@${user.username}</p>
            </div>
        </div>
        <button id="logoutBtn" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            Logout
        </button>
    `;
    sidebar.appendChild(userProfile);

    // Add logout functionality
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

// Logout function
function logout() {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Redirect to login
    window.location.href = 'pages/login.html';
}

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', checkAuth);
