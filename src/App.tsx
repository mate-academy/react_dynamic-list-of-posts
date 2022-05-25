import React, { useState, useEffect, useCallback } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [loadPost, setLoadPost] = useState(true);
  const [toggleDetails, setToggleDetails] = useState(false);

  const toggleShowDetailsHandler = (value: boolean) => {
    setToggleDetails(value);
  };

  const fetchUsers = useCallback(async () => {
    const allUsers = await getUsers();

    setUsers(allUsers);
    setLoadPost(false);
  }, []);

  const fetchUserPosts = useCallback(async () => {
    const userPosts = await getUserPosts(selectedUserId);

    setPosts(userPosts);
    setLoadPost(false);
  }, [selectedUserId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUserPosts();
  }, [selectedUserId]);

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const changePostId = (post: Post, id: number) => {
    setSelectedPostId(selectedPostId === post.id ? 0 : id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          selectedUserId={selectedUserId}
          changeUser={changeUser}
          setLoadPost={setLoadPost}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            changePostId={changePostId}
            loadPost={loadPost}
            toggleShowDetailsHandler={toggleShowDetailsHandler}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0
            && (
              <PostDetails
                selectedPostId={selectedPostId}
                toggleDetails={toggleDetails}
                toggleShowDetailsHandler={toggleShowDetailsHandler}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
