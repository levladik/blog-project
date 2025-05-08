import { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { getAllUsers } from '../api/users';

import { User, Post } from '../types/index';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
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

    fetchUsers();
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
      dataIndex: 'posts',
      key: 'posts',
      render: (posts?: Post[]) => (posts || []).map(post => (
        <p key={post.id}>{post.title}</p>
      )),
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
            {(record.posts || []).map(post => (
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
