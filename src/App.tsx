import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { getAllPosts, getUserName, getUserPosts } from './api/api';
import { Loader } from './components/Loader';
import { User } from './types/User';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [checkedPost, setCheckedPost] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setLoading(true);
  };

  const postIdHandler = (postIdChoose: number | undefined) => {
    setSelectedPostId(postIdChoose);
    setCheckedPost(prevState => !prevState);
  };

  useEffect(() => {
    const retrievePosts = async () => {
      let result;
      const usersNameFromServer = await getUserName();

      if (userId === 0) {
        result = await getAllPosts();
      } else {
        result = await getUserPosts(userId);
      }

      setLoading(false);
      setPosts(result);
      setUsers(usersNameFromServer);
    };

    retrievePosts();
  }, [posts]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={handleUserChange}>
            <option value="0">All users</option>
            {users.map((user, index) => {
              return <option value={index + 1}>{user.name}</option>;
            })}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {loading && <Loader />}
          <PostsList
            posts={posts}
            postIdHandler={postIdHandler}
            choosePost={selectedPostId}
          />
        </div>
        {checkedPost && (
          <div className="App__content">
            <PostDetails postId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
