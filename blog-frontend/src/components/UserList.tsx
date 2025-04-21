import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  };

  if (loading) return <div className='p-4 text-gray-500'>Loading users...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedUser(null);
        }}
        className='relative z-10'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel
              transition
              className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'
            >
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
                    <ExclamationTriangleIcon
                      aria-hidden='true'
                      className='size-6 text-red-600'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <DialogTitle
                      as='h3'
                      className='text-base font-semibold text-gray-900'
                    >
                      Delete user
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Are you sure you want to permanently delete{' '}
                        <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong> from the system? This
                        action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={() => {
                    if (selectedUser) {
                      handleDelete(selectedUser.id);
                      setIsOpen(false);
                    }
                  }}
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto'
                >
                  Delete
                </button>
                <button
                  type='button'
                  data-autofocus
                  onClick={() => setIsOpen(false)}
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white text-white px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto'
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className='w-100'>
        {users.map((user) => (
          <div
            key={user.id}
            className='w-100 mb-3 p-3 flex justify-between items-center gap-2 text-start text-sm border-1 rounded border-solid border-blue-400'
          >
            <div className='flex gap-1 text-bold'>
              <p className='text-gray-500'>{user.id}</p>
              <p>{user.firstName}</p> <p>{user.lastName}</p>
            </div>
            <button
              className='text-red-500 rounded-full'
              onClick={() => {
                setIsOpen(true);
                setSelectedUser(user);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
