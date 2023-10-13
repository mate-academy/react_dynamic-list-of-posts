import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/User';
import { User } from './types/User';
import { Post } from './types/Post';
import { getPosts } from './api/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isNoPost, setIsNoPost] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setIsNoPost(false);
    setPost(null);
    if (user) {
      setIsLoadingPost(true);
      getPosts(user.id)
        .then((fetchedPosts) => {
          setPosts(fetchedPosts);
          if (fetchedPosts.length === 0) {
            setIsNoPost(true);
          }
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setIsLoadingPost(false);
        });
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  chooseUser={user}
                  setUser={setUser}
                  setPosts={setPosts}
                  setIsNoPost={setIsNoPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {user === null && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPost && (
                  <Loader />
                )}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isNoPost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {posts.length !== 0 && (
                  <PostsList posts={posts} openPost={post} setPost={setPost} />
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
              'Sidebar', {
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails post={post} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
