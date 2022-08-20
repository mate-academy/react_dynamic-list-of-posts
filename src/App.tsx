import React, { useCallback, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { client } from './utils/fetchClient';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const getPosts = useCallback((userId: number) => {
    setIsLoading(true);
    setIsNoPosts(false);
    setIsUserSelected(true);
    client.get<Post[]>(`/posts?userId=${userId}`)
      .then(postsFromServer => {
        setPosts(postsFromServer);
        setIsNoPosts(!postsFromServer.length);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isPostVisible = isUserSelected && !hasError && !isNoPosts;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  getPosts={getPosts}
                  onUserChange={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!isUserSelected && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isPostVisible && (isLoading
                  ? (<Loader />)
                  : (
                    <PostsList
                      posts={posts}
                      onOpen={setSelectedPost}
                      selectedPost={selectedPost}
                    />
                  ))}

                {isNoPosts && !hasError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (<PostDetails post={selectedPost} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
