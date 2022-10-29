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
import { Post } from './types/Post';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [error, setError] = useState('error');
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    client.get<User[]>('/users').then(response => {
      setUsers(response);
    });
  }, []);

  const showPost = async (user: User) => {
    try {
      setIsLoading(true);
      setSelectedUser(user);
      const getPost = await client.get<Post[]>(`/posts?userId=${user.id}`);

      setUserPosts(getPost);
    } catch {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  showPosts={showPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>

                )}
                {isLoading && (
                  <Loader />
                )}

                {/* <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div> */}
                {selectedUser && userPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {selectedUser && userPosts.length !== 0 && !isLoading && (
                  <PostsList
                    posts={userPosts}
                    postId={post}
                    setPost={setPost}
                  />
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
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={post}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
