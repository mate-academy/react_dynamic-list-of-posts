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
import { getPosts } from './utils/serverHelper';

export const App: React.FC = () => {
  const [userSelectedId, setUserSelectedId] = useState(0);
  const [postSelected, setPostSelected] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisiblePosts, setIsVisiblePosts] = useState(false);
  const [isVisiblePostDetails, setIsVisiblePostDetails] = useState(false);
  const [isVisibleSideBar, setIsVisibleSideBar] = useState(false);
  const [isVisiblePostError, setIsVisiblePostError] = useState(false);
  const [isVisibleEmptyPostMessage,
    setIsVisibleEmptyPostMessage] = useState(false);
  // let skipAllErrors = true;

  const loadPosts = async () => {
    setIsVisibleLoader(true);
    setIsVisibleEmptyPostMessage(false);
    setIsVisiblePosts(false);

    try {
      const postsFromServer = await getPosts(userSelectedId);

      setPosts(postsFromServer);
      setIsVisiblePostError(false);
      if (postsFromServer.length === 0) {
        setIsVisibleEmptyPostMessage(true);
      } else {
        setIsVisiblePosts(true);
      }
    } catch {
      setIsVisiblePostError(true);
    } finally {
      setIsVisibleLoader(false);
    }
  };

  useEffect(() => {
    if (userSelectedId) {
      loadPosts();
    }
  }, [userSelectedId]);

  const handleSelectPost = (post: Post) => {
    if (postSelected?.id === post.id) {
      setIsVisibleSideBar(false);
      setIsVisiblePostDetails(false);
      setPostSelected(null);
    } else {
      setPostSelected(post);
      // skipAllErrors = true;
      setIsVisibleSideBar(true);
      setIsVisiblePostDetails(true);
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
                  setUserSelectedId={setUserSelectedId}
                  userSelectedId={userSelectedId}
                  setPostSelected={setPostSelected}
                  setIsVisiblePostDetails={setIsVisiblePostDetails}
                  setIsVisibleSideBar={setIsVisibleSideBar}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {userSelectedId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isVisiblePostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isVisibleLoader && <Loader />}

                {isVisibleEmptyPostMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isVisiblePosts && (
                  <PostsList
                    posts={posts}
                    postSelected={postSelected}
                    handleSelectPost={handleSelectPost}
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
              { 'Sidebar--open': isVisibleSideBar },
            )}
          >

            {isVisiblePostDetails && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={postSelected}
                  postSelected={postSelected}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};
