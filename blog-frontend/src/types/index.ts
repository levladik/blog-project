export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  posts: Post[];
}
