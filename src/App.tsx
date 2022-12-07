import React, { useState, useEffect } from 'react';
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
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPosts = async (userID: number) => {
    setIsLoad(false);
    try {
      await getPosts(userID)
        .then(data => setPosts(data));
    } catch (e) {
      setIsError(true);
    }

    setIsLoad(true);
  };

  useEffect(() => {
    setActivePost(null);

    if (activeUser) {
      loadPosts(activeUser.id);
    } else {
      setPosts([]);
    }
  }, [activeUser?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  activeUser={activeUser}
                  setActiceUser={setActiveUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { activeUser && !isLoad && (<Loader />) }

                { activeUser && isLoad && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {activeUser && isLoad && !isError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) }

                {activeUser && isLoad && !isError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    activePostID={activePost?.id}
                    setActivePost={setActivePost}
                  />
                ) }
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
              { 'Sidebar--open': activePost },
            )}
          >
            <div className="tile is-child box is-success ">

              {activePost && (
                <PostDetails post={activePost} />
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
