// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    } else if (user && window.location.href.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }

    // Update username in dashboard if available
    if (user && document.getElementById('userName')) {
        const userData = JSON.parse(user);
        document.getElementById('userName').textContent = userData.firstName;
    }
}

// Handle login form submission
if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.querySelector('input[placeholder="First Name"]').value;
        const lastName = document.querySelector('input[placeholder="Last Name"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const phone = document.querySelector('input[placeholder="Phone Number"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must contain minimum 8 chars, 1 uppercase, 1 number and 1 special char');
            return;
        }

        // Store user data
        const userData = {
            firstName,
            lastName,
            email,
            phone
        };

        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'dashboard.html';
    });
}

// Handle logout
if (document.getElementById('logout')) {
    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
}

// Check authentication status when page loads
checkAuth(); 