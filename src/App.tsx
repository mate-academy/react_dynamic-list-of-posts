import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/api';
import { getUserPost, getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [selectUserId, setSelectUserId] = useState(0);
  const [selectedPostId, setselectedPostId] = useState(0);

  const selectPost = (postId: number) => {
    setselectedPostId(postId);
  };

  useEffect(() => {
    async function loader(endpoint: string) {
      const usersFromServer = await getUsers(endpoint);

      setUsers(usersFromServer);
    }

    loader('/users');
  }, []);

  useEffect(() => {
    async function loader(endpoint: string) {
      const postsFromServer = await getUserPosts(endpoint);

      setPosts(postsFromServer);
    }

    if (!selectUserId) {
      loader('/posts');
    } else {
      loader(`/posts?userId=${selectUserId}`);
    }
  }, [selectUserId]);

  useEffect(() => {
    async function loader(endpoint: string) {
      const postFromServer = await getUserPost(endpoint);

      setPost(postFromServer);
    }

    if (selectedPostId) {
      loader(`/posts/${selectedPostId}`);
    } else {
      setPost(null);
    }
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(ev) => setSelectUserId(+ev.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option
                value={`${user.id}`}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {posts
            ? (
              <PostsList
                posts={posts}
                selectPost={selectPost}
                selectedPostId={selectedPostId}
                data-cy="postDetails"
              />
            )
            : (<Loader />)}

        </div>

        <div className="App__content">
          {post && (

            <PostDetails post={post} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
