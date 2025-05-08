import { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { getAllUsers } from '../api/users';
import { getAllPosts } from '../api/posts';

import { User, Post } from '../types/index';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchUsers();
    fetchPosts();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: User) => 
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Posts',
      key: 'posts',
      render: (text: string, record: User) => {
        const userPosts = posts.filter(post => post.userId === record.id);
        return userPosts.length;
      },
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button color="danger" variant='text'>Delete</Button>
      ),
    }
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey="id"
      expandable={{
        rowExpandable: (record: User) => record.posts?.length > 0,
        expandedRowRender: (record: User) => (
          <div>
            {posts.filter(post => post.userId === record.id).map(post => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        ),
      }}
    />
  );
};
