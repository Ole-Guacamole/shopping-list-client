import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { User } from '../../types';

const ProfilePage: React.FC = () => {
    const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { user: authUser, isLoading: authLoading } = authContext;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser) return;

    const fetchUserData = async (): Promise<void> => {
      try {
        const response = await axios.get<User>(`${import.meta.env.VITE_SERVER_URL}/users/${authUser.id}`);
        setUser(response.data);
        console.log('User data:', response.data);
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      }
    };

    fetchUserData();
    setLoading(false);
  }, [authUser]);

  if (loading || authLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user?.name}'s Profile</h1>
        <p>Email: {user?.email}</p>
        <p>Id: {user?.id}</p>
        <p>Created at: {user?.createdAt}</p>
    </div>
  );
};

export default ProfilePage;