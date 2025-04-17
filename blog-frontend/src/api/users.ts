import { User, Post } from '../types';

const handleRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`http://localhost:3000/users${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getAllUsers = (): Promise<User[]> => handleRequest('/');

export const getUserById = (id: number): Promise<User> => handleRequest(`/${id}`);

export const createUser = (userData: { firstName: string; lastName: string }): Promise<User> =>
  handleRequest('/', {
    method: 'POST',
    body: JSON.stringify(userData)
  });

export const updateUser = (
  id: number,
  userData: { firstName: string; lastName: string }
): Promise<User> =>
  handleRequest(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });

export const deleteUser = (id: number): Promise<void> =>
  handleRequest(`/${id}`, { method: 'DELETE' });

export const createUserPost = (
  userId: number,
  postData: { title: string; content: string }
): Promise<Post> =>
  handleRequest(`/${userId}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData)
  });
