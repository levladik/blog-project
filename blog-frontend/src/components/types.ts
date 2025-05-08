export interface User {
  id: string;
  firstName: string;
  lastName: string;
  posts: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
}
