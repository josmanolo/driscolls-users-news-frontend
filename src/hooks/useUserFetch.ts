import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types';

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users');
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return { users, error, setUsers };
};

export default useFetchUsers;
