import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { createUser } from '../api/users';
import { createPost } from '../api/posts';

export const UserForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [createdUserId, setCreatedUserId] = useState<number | null>(null);

  const addUser = async (userData: {
    firstName: string;
    secondName: string;
  }) => {
    try {
      const createdUser = await createUser({
        firstName: userData.firstName,
        lastName: userData.secondName,
      });
      setFirstName('');
      setSecondName('');
      setCreatedUserId(createdUser.id);
    } catch (error: unknown) {
      console.error('Error creating user:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to create user');
      }
    }
  };

  const addPosts = async (userId: number) => {
    try {
      await Promise.all(posts.map(post => 
        createPost({
          title: post.title,
          content: post.content,
          userId: userId
        })
      ));
      setPosts([]);
      setNewPost({title: '', content: ''});
    } catch (error: unknown) {
      console.error('Error creating post:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to create post');
      }
    }
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add user</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
                <DialogTitle
                  className='text-base font-semibold text-gray-900'
                >
                  Add user
                </DialogTitle>
              </div>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <form>
                  <label
                    htmlFor='firstname'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    Firstname
                  </label>
                  <div className='mt-2 mb-4'>
                    <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
                      <input
                        id='firstname'
                        name='firstname'
                        type='text'
                        placeholder='John'
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
                      />
                    </div>
                  </div>

                  <label
                    htmlFor='Secondname'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    Secondname
                  </label>
                  <div className='mt-2 mb-4'>
                    <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
                      <input
                        id='secondname'
                        name='secondname'
                        type='text'
                        placeholder='Doe'
                        required
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
                      />
                    </div>
                  </div>
                  {posts.map((post, index) => (
                    <>
                      <h2 className='text-gray-800 text-bold mb-3'>
                        Post {++index}
                      </h2>
                      <label
                        htmlFor='Title'
                        className='block text-sm/6 font-medium text-gray-900'
                      >
                        Title
                      </label>
                      <div
                        key={index}
                        className='mt-2 mb-4'
                      >
                        <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
                          <input
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Title'
                            required
                            value={post.title}
                            onChange={(e) => {
                              const updatedPosts = [...posts];
                              updatedPosts[index] = {
                                ...post,
                                title: e.target.value
                              };
                              setPosts(updatedPosts);
                            }}
                            className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'
                          />
                        </div>
                      </div>

                      <label
                        htmlFor='Content'
                        className='block text-sm/6 font-medium text-gray-900'
                      >
                        Content
                      </label>
                      <div
                        key={index}
                        className='mt-2 mb-4'
                      >
                        <div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
                          <input
                            id='content'
                            name='content'
                            type='text'
                            placeholder='Content'
                            required
                            value={post.content}
                            onChange={(e) => {
                              const updatedPosts = [...posts];
                              updatedPosts[index] = {
                                ...post,
                                content: e.target.value
                              };
                              setPosts(updatedPosts);
                            }}
                            className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm'
                          />
                        </div>
                      </div>
                    </>
                  ))}
                  <button onClick={() => setPosts([...posts, newPost])}>
                    Add post
                  </button>
                </form>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto'
                  onClick={() => {
                    setIsOpen(false);
                    addUser({ firstName, secondName });
                    if (posts.length > 0 && createdUserId) {
                      addPosts(createdUserId);
                    }
                  }}
                >
                  Save
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
    </>
  );
};
