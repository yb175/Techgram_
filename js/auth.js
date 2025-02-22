// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
        // Here you would typically make an API call to your backend
        const response = await mockLoginAPI(email, password);
        
        if (response.success) {
            // Store user data
            if (remember) {
                localStorage.setItem('user', JSON.stringify(response.user));
            } else {
                sessionStorage.setItem('user', JSON.stringify(response.user));
            }
            
            // Redirect to home page
            window.location.href = '../index.html';
        } else {
            showError('Invalid email or password');
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
}

async function handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;

    // Validate form
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    if (!terms) {
        showError('Please accept the terms and conditions');
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        const response = await mockSignupAPI(username, email, password);
        
        if (response.success) {
            // Store user data
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Redirect to home page
            window.location.href = '../index.html';
        } else {
            showError(response.message);
        }
    } catch (error) {
        showError('An error occurred. Please try again.');
    }
}

// Handle social authentication
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', handleSocialAuth);
});

function handleSocialAuth(e) {
    const provider = e.currentTarget.classList.contains('github') ? 'github' : 'google';
    // Implement social authentication
    console.log(`Authenticating with ${provider}`);
}

// Mock API functions (replace these with real API calls)
async function mockLoginAPI(email, password) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate API response
            resolve({
                success: true,
                user: {
                    id: 1,
                    username: 'testuser',
                    email: email
                }
            });
        }, 1000);
    });
}

async function mockSignupAPI(username, email, password) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate API response
            resolve({
                success: true,
                user: {
                    id: 1,
                    username: username,
                    email: email
                }
            });
        }, 1000);
    });
}

// Error handling
function showError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.auth-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'auth-error';
        const form = document.querySelector('.auth-form');
        form.insertBefore(errorElement, form.firstChild);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// Add error styles to auth.css
const style = document.createElement('style');
style.textContent = `
    .auth-error {
        background-color: rgba(220, 38, 38, 0.1);
        color: #ef4444;
        padding: 0.75rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        display: none;
    }
`;
document.head.appendChild(style);
