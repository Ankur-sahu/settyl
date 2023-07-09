export function getUserData() {
    // Get user data from localStorage or state
    const userData = localStorage.getItem('login');
    return userData;
  }