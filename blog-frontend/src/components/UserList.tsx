import { Table } from 'antd';

const dataSource = [
  {
    id: '1',
    firstName: 'Mike',
    lastName: 'Smith',
    posts: [{ id: '1', title: 'Post 1', content: 'Content 1' }],
  },
];

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
    render: (_: unknown, record: { firstName: string; lastName: string }) =>
      `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Posts',
    dataIndex: 'posts',
    key: 'posts',
    render: (posts) => posts.map((post) => <p key={post.id}>{post.title}</p>),
  },
];

export const UserList = () => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            {record.posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        ),
        rowExpandable: (record) => record.posts.length > 0,
      }}
    />
  );
};
