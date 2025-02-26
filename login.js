// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    
    // If on dashboard page and no user is logged in, redirect to login
    if (!user && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }

    // Update username in dashboard if available
    if (user && document.getElementById('userName')) {
        const userData = JSON.parse(user);
        document.getElementById('userName').textContent = userData.firstName;
    }
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username && password) {
        // Store user data on successful login
        const userData = {
            username: username,
            firstName: username
        };
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter both username and password');
    }
});

// Enhanced logout handling
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Add logout event listener to any element with logout-btn class or logout id
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('.logout-btn, #logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', logout);
    });
});

// Check authentication status when page loads
checkAuth(); 