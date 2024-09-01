export const fetchProtectedData = async () => {
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }
  
    try {
      const response = await axios.get('https://your-api.com/protected-endpoint', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Protected data:', response.data);
    } catch (error) {
      console.error('Failed to fetch protected data:', error);
    }
  };
  