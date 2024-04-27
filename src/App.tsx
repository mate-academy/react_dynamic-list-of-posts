import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

//import classNames from 'classnames';
import { PostsList } from './components/PostList/PostsList';
//import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { User } from './types/User';
import { getUsers } from './api/users';
import { postsContext } from './Store';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { ErrorText } from './types/ErrorText';
import { PostsError } from './components/PostsError/PostsError';
import { Sidebar } from './components/Sidebar/Sidebar';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<'' | ErrorText>('');
  const [loading, setLoading] = useState(false);
  const { state, setters } = useContext(postsContext);
  const { selectedUser } = state;
  const { setSelectedPost } = setters;

  useEffect(() => {
    getUsers().then(newUsers => setUsers(newUsers));
  }, []);

  useEffect(() => {
    setError('');

    if (selectedUser) {
      setLoading(true);
      setSelectedPost(null);
      getPosts(selectedUser.id)
        .then(newPosts => {
          if (newPosts.length === 0) {
            setError(ErrorText.noPosts);
          }

          setPosts(newPosts);
        })
        .catch(() => {
          setError(ErrorText.failLoad);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedUser, setSelectedPost]);
  const displayError = error && !loading;
  const displayPostList = selectedUser && !error && !loading;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {displayError && <PostsError errorMessage={error} />}
                {displayPostList && <PostsList posts={posts} />}
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </main>
  );
};
