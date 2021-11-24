import React, { useState, useEffect, useCallback } from 'react';
import { getUserPosts, getPostDetails } from './api/posts';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getData } from './api/data';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSeledtedPostId] = useState(0);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function getPosts() {
      if (userId === 0) {
        const [usersFromServer, postsFromServer] = await getData();
        const preparedUsers = usersFromServer.filter((user: User) => postsFromServer
          .find((postSearch: Post) => postSearch.userId === user.id));

        setUsers(preparedUsers);

        setPosts(postsFromServer);
      } else {
        const userPosts = await getUserPosts(userId);

        setPosts(userPosts);
      }
    }

    getPosts();
  }, [userId, selectedPostId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
  };

  const handlePostSelect = useCallback(async (value) => {
    const selectedPost = await getPostDetails(value);

    setSeledtedPostId(value);

    setPost(selectedPost);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userName">
          Select a user: &nbsp;

          <select
            name="userName"
            className="App__user-selector"
            onChange={handleSelectChange}
          >
            <option value="0">All users</option>
            {users.length > 0 && users.map(user => (
              <option key={user.name} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPostId}
            posts={posts}
            selectPost={handlePostSelect}
          />
        </div>

        <div className="App__content">
          {post
            ? (
              <PostDetails
                selectedPostId={selectedPostId}
                post={post}
              />
            )
            : <h1>Select a post</h1> }
        </div>
      </main>
    </div>
  );
};

export default App;
