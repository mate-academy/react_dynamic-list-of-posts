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
import { getPosts } from './api/posts';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (activeUser?.id) {
      setIsLoading(true);
      setSelectedPost(null);

      getPosts(activeUser.id)
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
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
                  onChange={setActiveUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && !isError && <Loader />}

                {isError && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!posts.length && activeUser && !isError && !isLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!posts.length && !isLoading && !isError && (
                  <PostsList
                    onPostSelected={setSelectedPost}
                    selectedPostId={selectedPost?.id}
                    posts={posts}
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
