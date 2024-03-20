import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { UserSelector } from './UserSelector';
import { Loader } from './Loader';
import { User } from '../types/User';
import { getPosts, getUsers } from '../api/api';
import { Post } from '../types/Post';

export const AppList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setErrorMessage('');

    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setSelectedPost(null);

    if (selectedUser) {
      setloading(true);

      getPosts(selectedUser.id)
        .then(data => {
          setPosts(data);
        })
        .catch(() => {
          setErrorMessage('Something went wrong');
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [selectedUser]);

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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {selectedUser && (
                  <>
                    {loading && <Loader />}

                    {errorMessage && !loading && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMessage}
                      </div>
                    )}
                    {!errorMessage && !loading && (
                      <>
                        {posts.length === 0 && (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}
                        {!!posts.length && (
                          <PostsList
                            posts={posts}
                            selectedPost={selectedPost}
                            setSelectedPost={setSelectedPost}
                          />
                        )}
                      </>
                    )}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails selectedPost={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
