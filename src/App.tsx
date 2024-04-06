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
import { Error } from './types/Error';
import { Post } from './types/Post';
import { getPosts } from './api/posts';
import { wait } from './utils/fetchClient';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<Error | string>('');
  // eslint-disable-next-line prettier/prettier
  const [commentErrorMessage, setCommentErrorMessage]
    = useState<Error | string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const isLoadingPosts = isLoading && !isSidebarVisible;
  const noSelectedUsers = !selectedUser && !errorMessage;
  const noSelectedUserPosts = selectedUser && !posts.length && !errorMessage;
  const hasSelectedUserPosts =
    selectedUser && posts.length > 0 && !errorMessage;

  useEffect(() => {
    setIsLoading(true);
    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(postsFromServer => {
          wait(1000);
          setPosts(postsFromServer);
        })
        .catch(() => setErrorMessage(Error.LoadingError))
        .finally(() => setIsLoading(false));
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
                  setIsLoading={setIsLoading}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                  setErrorMessage={setErrorMessage}
                  setIsSidebarVisible={setIsSidebarVisible}
                  setIsCommentFormVisible={setIsCommentFormVisible}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {noSelectedUsers && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts ? (
                  <Loader />
                ) : (
                  <>
                    {errorMessage && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMessage}
                      </div>
                    )}

                    {noSelectedUserPosts && (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    )}

                    {hasSelectedUserPosts && (
                      <PostsList
                        posts={posts}
                        setCommentErrorMessage={setCommentErrorMessage}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        isSidebarVisible={isSidebarVisible}
                        setIsSidebarVisible={setIsSidebarVisible}
                        setLoadingComments={setLoadingComments}
                        setIsCommentFormVisible={setIsCommentFormVisible}
                      />
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
                'Sidebar--open': isSidebarVisible,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                commentErrorMessage={commentErrorMessage}
                setCommentErrorMessage={setCommentErrorMessage}
                loadingComments={loadingComments}
                setLoadingComments={setLoadingComments}
                isCommentFormVisible={isCommentFormVisible}
                setIsCommentFormVisible={setIsCommentFormVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
