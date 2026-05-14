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
import * as FunctionCalls from './api/functionServerRequests';
import { Post } from './types/Post';

export const App = () => {
  // тут зберігаються обраний юсер і всі юсери з серверу
  const [chooseUser, setChooseUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);

  // тут зберігаються всі пости певного користувача і обраний пост
  const [choosePost, setChoosePost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);

  // показувати при успіху або поилці
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    FunctionCalls.getUsers().then(users => {
      setAllUsers(users);
    });
  }, []);

  useEffect(() => {
    setShowError(false);
    if (chooseUser) {
      setShowLoading(true);
      FunctionCalls.getPosts(chooseUser.id)
        .then(posts => {
          setAllPosts(posts);
        })
        .catch(() => {
          setShowError(true);
        })
        .finally(() => {
          setShowLoading(false);
        });
    }
  }, [chooseUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setChooseUser={prev => setChooseUser(prev)}
                  chooseUser={chooseUser}
                  allUsers={allUsers}
                  setAllPosts={setAllPosts}
                  setChoosePost={setChoosePost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!chooseUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showLoading && <Loader />}

                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {allPosts && allPosts.length > 0 && !showLoading && (
                  <PostsList
                    setChoosePost={setChoosePost}
                    choosePost={choosePost}
                    allPosts={allPosts}
                  />
                )}

                {allPosts && allPosts.length === 0 && !showLoading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
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
                'Sidebar--open': choosePost,
              },
            )}
          >
            {choosePost && (
              <div className="tile is-child box is-success ">
                <PostDetails choosePost={choosePost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
