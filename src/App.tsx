import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUserPosts } from './api/users';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [postsErrorMessage, setPostsErrorMessage] = useState<string>('');

  useEffect(() => {
    setPostsErrorMessage('');

    if (selectedUser) {
      setLoadingPosts(true);
      setSelectedPost(null);

      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => {
          setPostsErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setLoadingPosts(false);
        });
    }
  }, [selectedUser]);

  const handleOpenPost = (post: Post) => {
    setSelectedPost(prev => (prev?.id === post.id ? null : post));
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
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingPosts ? (
                  <Loader />
                ) : postsErrorMessage ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsErrorMessage}
                  </div>
                ) : userPosts && userPosts.length === 0 && selectedUser ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : userPosts && userPosts.length > 0 && selectedUser ? (
                  <PostsList
                    userPosts={userPosts || []}
                    selectedPost={selectedPost}
                    onSelect={handleOpenPost}
                  />
                ) : null}
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
            key={selectedPost?.id}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
