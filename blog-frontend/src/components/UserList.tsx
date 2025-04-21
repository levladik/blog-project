import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../api/users';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface UserListProps {
  refreshTrigger: boolean;
}

export const UserList = ({ refreshTrigger }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshTrigger]);

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error: unknown) {
        console.error('Deletion error:', error);
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('Failed to delete user');
        }
      }
    }
  };

  if (loading) return <div className='p-4 text-gray-500'>Loading users...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;

  return (
    <div className='w-100'>
      {users.map((user) => (
        <div key={user.id} className='w-100 mb-3 p-3 flex justify-between items-center gap-2 text-start text-sm border-1 rounded border-solid border-blue-400'>
          <div className='flex gap-1 text-bold'>
            <p className='text-gray-500'>{user.id}</p>
            <p>{user.firstName}</p> <p>{user.lastName}</p>
          </div>
          <button
            className='text-red-500 rounded-full'
            onClick={() => handleDelete(user.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};
