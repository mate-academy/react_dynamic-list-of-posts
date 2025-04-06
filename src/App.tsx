import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import * as userServices from './api/users';
import * as postServices from './api/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Post } from './types/Post';

import { Loader } from './components/Loader';

export const App = () => {
  const [users, setUsers] = useState<User[]>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [singlePost, setSinglePost] = useState<Post | null>();
  const [selectedUser, setSelected] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    userServices.getUsers().then(setUsers);
  }, []);

  const handleUserId = (id: number) => {
    setLoader(true);
    setSelected(true);
    setError('');
    setSinglePost(null);
    postServices
      .getPosts(id)
      .then(setPosts)
      .catch(() => {
        setError('Something went wrong!');
        setPosts([]);
      })
      .finally(() => setLoader(false));
  };

  const handlePostId = (id: number) => {
    setSinglePost(posts.find(post => post.id === id));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} onUserId={handleUserId} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loader && <Loader />}
                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {posts.length === 0 && selectedUser && !loader && !error && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !loader && !error && (
                  <PostsList posts={posts} onPostId={handlePostId} />
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
              singlePost ? 'Sidebar--open' : '',
            )}
          >
            <div className="tile is-child box is-success ">
              {singlePost && <PostDetails post={singlePost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
