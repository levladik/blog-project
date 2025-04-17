import { Post } from '../types';

const handleRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`http://localhost:3000/posts${url}`, {
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

export const getAllPosts = (): Promise<Post[]> => handleRequest('/');
export const getPostById = (id: number): Promise<Post> => handleRequest(`/${id}`);
export const createPost = (postData: Omit<Post, 'id'>): Promise<Post> =>
  handleRequest('/', {
    method: 'POST',
    body: JSON.stringify(postData)
  });

export const updatePost = (id: number, postData: Partial<Post>): Promise<Post> =>
  handleRequest(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData)
  });

export const deletePost = (id: number): Promise<void> =>
  handleRequest(`/${id}`, { method: 'DELETE' });
