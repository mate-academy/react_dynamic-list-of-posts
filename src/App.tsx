/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getPosts } from './api/post';

import { Post } from './types/Post';
import { User } from './types/User';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoading(true);
    setSelectedPost(null);
    setOpenPostId(null);
    setPosts([]);
    setPostsLoaded(false);
    setErrorMessage('');

    getPosts(selectedUser.id)
      .then(p => setPosts(p))
      .catch(() => setErrorMessage('Unable to load posts'))
      .finally(() => {
        setPostsLoaded(true);
        setIsLoading(false);
      });
  }, [selectedUser]);

  const handleTogglePost = (post: Post) => {
    if (openPostId === post.id) {
      setOpenPostId(null);
      setSelectedPost(null);
    } else {
      setOpenPostId(post.id);
      setSelectedPost(post);
      setIsLoading(true);
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setIsLoading={setIsLoading}
                  setErrorMessage={setErrorMessage}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}
                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {selectedUser &&
                  postsLoaded &&
                  posts.length === 0 &&
                  !errorMessage && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                      No posts yet
                  </div>
                )}
                {selectedUser && postsLoaded && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onTogglePost={handleTogglePost}
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
              selectedPost ? 'Sidebar--open' : '',
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setErrorMessage={setErrorMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
