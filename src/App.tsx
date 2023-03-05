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
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [postSelected, setPostSelected] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isPostsVisible, setIsPostsVisible] = useState(false);
  const [isPostDetailsVisible, setIsPostDetailsVisible] = useState(false);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [isPostErrorVisible, setIsPostErrorVisible] = useState(false);
  const [isEmptyPostMessageVisible,
    setIsEmptyPostMessageVisible] = useState(false);

  const loadPosts = async () => {
    setIsLoaderVisible(true);
    setIsEmptyPostMessageVisible(false);
    setIsPostsVisible(false);

    try {
      const postsFromServer = await getPosts(selectedUserId);

      setPosts(postsFromServer);
      setIsPostErrorVisible(false);
      if (postsFromServer.length === 0) {
        setIsEmptyPostMessageVisible(true);
      } else {
        setIsPostsVisible(true);
      }
    } catch {
      setIsPostErrorVisible(true);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      loadPosts();
    }
  }, [selectedUserId]);

  const handleSelectPost = (post: Post) => {
    if (postSelected?.id === post.id) {
      setIsSideBarVisible(false);
      setIsPostDetailsVisible(false);
      setPostSelected(null);
    } else {
      setPostSelected(post);
      setIsSideBarVisible(true);
      setIsPostDetailsVisible(true);
    }
  };

  const handleSelectUser = (newUserId: number) => {
    setSelectedUserId(newUserId);
    setPostSelected(null);
    setIsPostDetailsVisible(false);
    setIsSideBarVisible(false);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  handleSelectUser={handleSelectUser}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isPostErrorVisible && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isLoaderVisible && <Loader />}

                {isEmptyPostMessageVisible && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostsVisible && (
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
              { 'Sidebar--open': isSideBarVisible },
            )}
          >

            {isPostDetailsVisible && (
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
