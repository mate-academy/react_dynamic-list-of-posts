import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    client.get<User[]>('/users')
      .then(setUsers)
      .catch(() => setErrorMessage("Can't load list of users"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      setShowPosts(false);
      setPost(null);
      setErrorMessage('');

      client.get<Post[]>(`/posts?userId=${selectedUserId}`)
        .then((response) => {
          setPosts(response);
          setShowPosts(true);
        })
        .catch(() => setErrorMessage("Can't load posts"))
        .finally(() => setLoading(false));
    }
  }, [selectedUserId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSetUser={setSelectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {loading && (
                  <Loader />
                )}

                {errorMessage ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                ) : !selectedUserId && !loading && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {showPosts && (!posts.length ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    onSetPost={setPost}
                  />
                ))}
              </div>
            </div>
          </div>

          {post && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails post={post} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
