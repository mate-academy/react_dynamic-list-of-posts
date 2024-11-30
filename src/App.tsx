import { useState, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsIsLoading, setPostsIsLoading] = useState(false);
  const [hasPostsError, setHasPostsError] = useState('');

  const [chosenPost, setChosenPost] = useState<Post | null>(null);

  const hasNoPosts =
    selectedUser && !postsIsLoading && !hasPostsError && !posts.length;

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setPostsIsLoading(true);
    setHasPostsError('');
    setPosts([]);
    setChosenPost(null);

    getUserPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setHasPostsError('Something went wrong!'))
      .finally(() => setPostsIsLoading(false));
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={selectedUser}
                  onSelect={setSelectedUser}
                  onPost={setChosenPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {postsIsLoading && <Loader />}

                {!postsIsLoading && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {hasPostsError}
                  </div>
                )}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!postsIsLoading && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    chosenPost={chosenPost}
                    onSelect={setChosenPost}
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
                'Sidebar--open': chosenPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {chosenPost && <PostDetails post={chosenPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
