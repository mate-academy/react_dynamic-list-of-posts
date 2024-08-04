import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserPost, setSelectedUserPost] = useState<Post | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setError('');
      setLoading(true);
      setSelectedUserPost(null);

      client
        .get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(userPosts => {
          setSelectedUserPosts(userPosts);
        })
        .catch(() => setError('Something went wrong!'))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedUser, date]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {loading && <Loader />}

                    {error && (
                      <div
                        className="notification is-danger columns is-mobile"
                        data-cy="PostsLoadingError"
                      >
                        <span className="column is-11">
                          Something went wrong!
                        </span>
                        <button
                          className="button"
                          onClick={() => setDate(new Date())}
                        >
                          Try again
                        </button>
                      </div>
                    )}

                    {!loading &&
                      !error &&
                      selectedUser &&
                      (selectedUserPosts.length === 0 ? (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      ) : (
                        <PostsList
                          posts={selectedUserPosts}
                          selectPost={setSelectedUserPost}
                          selectedPost={selectedUserPost}
                        />
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedUserPost },
            )}
          >
            {selectedUserPost && (
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedUserPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
