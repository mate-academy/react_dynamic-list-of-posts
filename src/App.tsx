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
import { getUsers } from './services/user';
import { Post } from './types/Post';
import { getPostByUserId } from './services/post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selUser, setSelUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selUser) {
      setLoading(true);

      getPostByUserId(selUser?.id)
        .then(setPosts)
        .catch(() => setErrMsg('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [selUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selUser={selUser}
                  setSelUser={setSelUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!loading && !selUser && (
                  <p data-cy="NoselUser">No user selected</p>
                )}

                {loading && <Loader />}

                {errMsg && !loading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errMsg}
                  </div>
                )}

                {selUser?.id && posts.length === 0 && !errMsg && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selUser && posts.length > 0 && !loading && !errMsg && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
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
              { 'Sidebar--open': !!selectedPost },
            )}
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
