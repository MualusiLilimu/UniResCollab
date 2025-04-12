document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.auth-form');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // prevent default form submission
  
      const username = document.querySelector('#username').value.trim();
      const password = document.querySelector('#password').value;
  
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
  
      if (result.success) {
        // redirect if login is successful
        window.location.href = '/dashboard'; // or wherever your user lands
      } else {
        alert(result.message || 'Login failed. Check your credentials.');
      }
    });
  });
  