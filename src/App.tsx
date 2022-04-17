import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post, User } from './types';
import { getUserPosts } from './api/posts';
import { UserSelect } from './components/UserSelect/UserSelect';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const changeUser = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));
  }, []);

  const selectPost = useCallback((postId: number) => {
    setSelectedPostId(postId);
  }, []);

  useEffect(() => {
    getUsers()
      .then((usersFromServer) => setUsers(usersFromServer));

    getUserPosts(selectedUserId)
      .then((postsFromServer) => setPosts(postsFromServer));
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          selectedUserId={selectedUserId}
          changeUser={changeUser}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            selectPost={selectPost}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};
