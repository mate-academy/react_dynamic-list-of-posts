import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { Post, User } from './types';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsList(await getAllPosts());
      setVisiblePosts(await getAllPosts());
    };

    const fetchUsers = async () => {
      setUsers(await getUsers());
    };

    try {
      fetchPosts();
      fetchUsers();
    } catch (error) {
      throw new Error();
    }
  }, []);

  useEffect(() => {
    setSelectedPost(visiblePosts
      .find(post => post.id === selectedPostId));
  }, [selectedPostId]);

  const onPostSelect = (postId: number) => {
    if (postId !== selectedPostId) {
      setSelectedPostId(postId);
    } else {
      setSelectedPostId(0);
    }
  };

  const fetchUser = async (id: number) => {
    if (id === 0) {
      setVisiblePosts(postsList);

      return;
    }

    setVisiblePosts(await getUserPosts(id));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={({ target }) => fetchUser(+target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            postsList={visiblePosts}
            onPostSelect={onPostSelect}
            selectedPost={selectedPost}
          />
        </div>
        {selectedPost && (
          <div className="App__content">
            <PostDetails post={selectedPost || null} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
