import { useEffect, useState } from 'react';
import { getUsers, getUserPosts } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [currPost, setCurrPost] = useState<Post | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchUserPosts = (userId: number) => {
    getUserPosts(userId)
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (currUser) {
      setLoading(true);
      searchUserPosts(currUser.id);
      setCurrPost(null);
      setOpenModal(false);
    }
  }, [currUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  currUser={currUser}
                  setCurrUser={setCurrUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currUser && <p data-cy="NoSelectedUser">No user selected</p>}

                {!loading &&
                  !error &&
                  currUser &&
                  (posts.length > 0 ? (
                    <PostsList
                      posts={posts}
                      currPost={currPost}
                      setOpenModal={setOpenModal}
                      setCurrPost={setCurrPost}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': currPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {currPost && (
                <PostDetails
                  currPost={currPost}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
