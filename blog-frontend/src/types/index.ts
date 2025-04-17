export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}
