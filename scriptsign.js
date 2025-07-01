        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleBtn = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = 'Show';
            }
        }

        // Fungsi untuk menampilkan pesan
        function showMessage(message, type = 'error') {
            const errorDiv = document.getElementById('errorMessage');
            const successDiv = document.getElementById('successMessage');
            
            // Hide both messages first
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';
            
            if (type === 'error') {
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            } else {
                successDiv.textContent = message;
                successDiv.style.display = 'block';
            }
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                errorDiv.style.display = 'none';
                successDiv.style.display = 'none';
            }, 5000);
        }

        // Sign in dengan Google
        function signInWithGoogle() {
            showMessage('Redirecting to Google...', 'success');
            
            // Simulasi redirect ke Google OAuth
            setTimeout(() => {
                // Dalam implementasi nyata, redirect ke:
                // window.location.href = 'https://accounts.google.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email%20profile&response_type=code';
                showMessage('Google sign-in simulation - In real implementation, this would redirect to Google OAuth', 'success');
            }, 1000);
        }

        // Sign in dengan GitHub
        function signInWithGitHub() {
            showMessage('Redirecting to GitHub...', 'success');
            
            // Simulasi redirect ke GitHub OAuth
            setTimeout(() => {
                // Dalam implementasi nyata, redirect ke:
                // window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email';
                showMessage('GitHub sign-in simulation - In real implementation, this would redirect to GitHub OAuth', 'success');
            }, 1000);
        }

        // Sign in dengan email
        function signInWithEmail(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validasi sederhana
            if (!email || !password) {
                showMessage('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long');
                return;
            }
            
            // Simulasi proses sign in
            showMessage('Signing in...', 'success');
            
            // Simulasi API call
            setTimeout(() => {
                // Dalam implementasi nyata, kirim data ke server
                // fetch('/api/auth/signin', { method: 'POST', body: JSON.stringify({email, password}) })
                
                // Demo: berhasil jika email = "demo@example.com" dan password = "demo123"
                if (email === 'demo@example.com' && password === 'demo123') {
                    showMessage('Sign in successful! Welcome back!', 'success');
                    // Redirect ke dashboard
                    setTimeout(() => {
                        alert('Redirecting to dashboard...');
                    }, 1500);
                } else {
                    showMessage('Invalid email or password. Try demo@example.com / demo123');
                }
            }, 1500);
        }

        // Validasi email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Forgot password
        function forgotPassword() {
            const email = prompt('Enter your email address to reset password:');
            if (email && isValidEmail(email)) {
                showMessage('Password reset link sent to your email!', 'success');
            } else if (email) {
                showMessage('Please enter a valid email address');
            }
        }

        // Show sign up
        function showSignUp() {
            alert('Sign up page would be loaded here. This is a demo page.');
        }

        // Auto-focus pada email input
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('email').focus();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Enter key untuk submit form
            if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
                const form = document.getElementById('emailForm');
                form.dispatchEvent(new Event('submit'));
            }
        });