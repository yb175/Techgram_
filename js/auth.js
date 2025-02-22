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

// API endpoints
const API_URL = '/api';

// Utility functions
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const form = document.getElementById('loginForm');
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    form.insertBefore(errorDiv, form.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success';
    successDiv.textContent = message;

    const form = document.querySelector('.auth-form');
    form.insertBefore(successDiv, form.firstChild);

    // Remove success message after 3 seconds
    setTimeout(() => successDiv.remove(), 3000);
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store token in localStorage (session persistence)
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to main page
            window.location.href = '../index.html';
        } else {
            // Handle login error
            showError(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        showError('An error occurred. Please try again later.');
        console.error('Login error:', error);
    }
});

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname,
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to main page
                window.location.href = '../index.html';
            } else {
                showError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Signup error:', error);
        }
    });
}

// Handle social authentication
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', handleSocialAuth);
});

function handleSocialAuth(e) {
    e.preventDefault();
    const provider = e.currentTarget.classList.contains('github') ? 'github' : 'google';
    showError(`${provider} authentication coming soon!`);
}

// Add styles for error and success messages
const style = document.createElement('style');
style.textContent = `
    .auth-error,
    .auth-success {
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 0.9rem;
        animation: slideDown 0.3s ease-out;
    }

    .auth-error {
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .auth-success {
        background-color: rgba(34, 197, 94, 0.1);
        color: #22c55e;
        border: 1px solid rgba(34, 197, 94, 0.2);
    }

    .error-message {
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 0.9rem;
        background-color: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.2);
    }

    @keyframes slideDown {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
