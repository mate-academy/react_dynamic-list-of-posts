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
import { getPost } from './servises/post';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState('');

  useEffect(() => {
    if (!selectedUser?.id) {
      return;
    }

    setLoading(true);
    setErrorMassage('');

    getPost(selectedUser?.id || 0)
      .then(postsFromServer => {
        setPosts(postsFromServer);
      })
      .catch(() => {
        setErrorMassage('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
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
                  setSelectedUser={setSelectedUser}
                  setOpenPost={setOpenPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && loading && <Loader />}

                {selectedUser && errorMassage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMassage}
                  </div>
                )}

                {selectedUser && posts?.length === 0 && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && Boolean(posts?.length) && !loading && (
                  <PostsList
                    posts={posts}
                    openPost={openPost}
                    setOpenPost={setOpenPost}
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
              { 'Sidebar--open': openPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {openPost && <PostDetails openPost={openPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
