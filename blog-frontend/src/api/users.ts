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
    const errorData = await response.text();
    throw new Error(errorData || `HTTP error! status: ${response.status}`);
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};

export const getAllUsers = (): Promise<User[]> => handleRequest<User[]>('/');

export const getUserById = (id: number): Promise<User> => handleRequest<User>(`/${id}`);

export const createUser = (userData: { firstName: string; lastName: string }): Promise<User> =>
  handleRequest<User>('/', {
    method: 'POST',
    body: JSON.stringify(userData)
  });

export const updateUser = (
  id: number,
  userData: { firstName: string; lastName: string }
): Promise<User> =>
  handleRequest<User>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });

export const deleteUser = (id: number): Promise<void> =>
  handleRequest<void>(`/${id}`, { method: 'DELETE' }).then(() => {});

export const createUserPost = (
  userId: number,
  postData: { title: string; content: string }
): Promise<Post> =>
  handleRequest<Post>(`/${userId}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData)
  });
