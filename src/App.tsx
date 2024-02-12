import React, { useContext, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { SelectedUserContext } from './providers/UserProvider';
import { SelectedPostContext } from './providers/PostProvider';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnPostsLoad, setIsErrorOnPostsLoad] = useState(false);

  const { selectedUser } = useContext(SelectedUserContext);
  const { selectedPost } = useContext(SelectedPostContext);

  const isSomethingWrong = !!selectedUser
  && isErrorOnPostsLoad
  && !isLoading;

  const isNoPosts = !!selectedUser
  && !isErrorOnPostsLoad
  && !posts.length
  && !isLoading;

  const isPostsShow = !!selectedUser
  && !isErrorOnPostsLoad
  && !!posts.length
  && !isLoading;

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);

      getPosts(selectedUser.id)
        .then((loadedPosts) => {
          setPosts(loadedPosts);
        })
        .catch(() => {
          setIsErrorOnPostsLoad(true);
        })
        .finally(() => {
          setIsLoading(false);
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
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {!!selectedUser && isLoading && (<Loader />)}

                {isSomethingWrong && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostsShow && (
                  <PostsList posts={posts} />
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {!!selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
