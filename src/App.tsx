import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { User } from './types/User';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setPosts([]);
    setError(false);
    setLoadingPosts(true);

    if (selectedUser) {
      setSelectedPost(null);

      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setError(true))
        .finally(() => setLoadingPosts(false));
    }
  }, [selectedUser]);

  const noPosts = selectedUser && !loadingPosts && !loader && !error;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setLoader={setLoader}
                  setLoadingPosts={setLoadingPosts}
                  setPosts={setPosts}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && loader && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPosts &&
                  (!posts.length ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPost={selectedPost}
                      setSelectedPost={setSelectedPost}
                    />
                  ))}
              </div>
            </div>
          </div>

          {selectedUser && selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': selectedPost },
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails post={selectedPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
