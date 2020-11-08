import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { getAllPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { AsideSelect } from './components/AsideSelect';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(0);
  const [posts, setPosts] = useState([]);
  const [detailsPostId, setDetailsPostId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const selectUser = async(event) => {
    const { value } = event.target;

    setUserID(Number(value));
    const receivedPosts = await getUserPosts(Number(value));

    const preparedPosts = receivedPosts.map(post => ({
      id: post.id,
      userId: post.userId,
      title: post.title,
    }
    ));

    setPosts(preparedPosts);
  };

  const setRecievedUsers = async() => {
    const receivedUsers = await getUsers();

    setUsers(receivedUsers);
  };

  const setRecievedPosts = async() => {
    const receivedPosts = await getAllPosts();

    setIsLoading(false);

    const preparedPosts = receivedPosts.map(post => ({
      id: post.id,
      userId: post.userId,
      title: post.title,
    }
    ));

    setPosts(preparedPosts);
  };

  useEffect(() => {
    setRecievedUsers();
    setRecievedPosts();
  }, []);

  const toggletPost = (postId) => {
    if (postId === detailsPostId) {
      setDetailsPostId(0);

      return;
    }

    setDetailsPostId(postId);
  };

  return (
    <div className="App">
      <AsideSelect
        userID={userID}
        selectUser={selectUser}
        users={users}
      />

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            toggletPost={toggletPost}
            postId={detailsPostId}
            users={users}
            isLoading={isLoading}
          />
        </div>

        <div className="App__content">
          <PostDetails
            postId={detailsPostId}
            users={users}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
