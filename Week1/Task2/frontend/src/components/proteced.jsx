import { useEffect, useState } from 'react';

const Protected = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch('http://127.0.0.1:5000/api/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data.logged_in_as);
    };
    if (token) {
      fetchProtectedData();
    }
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Protected Route</h2>
      <p>Logged in as: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Protected;
