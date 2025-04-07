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
import { getUser } from './api/Metods';
import { getUserPosts } from './api/Metods';
import { getCommentsPosts } from './api/Metods';
import { Post } from './types/Post';
import { ErrorNotification } from './components/ErrorNotification';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [activeDrop, setActiveDrop] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [selectPost, setSelectPost] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [writeComment, setWriteComment] = useState<boolean>(false);
  const handleError = (type: string) => {
    setErrorType(type);
  };

  useEffect(() => {
    getUser()
      .then(data => {
        setUsers(data);
      })
      .catch(() => handleError('Something went wrong!'));
  }, []);

  const oneUserSelected = (id: number) => {
    setSelectPost(null);
    setPosts([]);
    setSelectedUserId(id);
    setLoading(true);
    getUserPosts(id)
      .then(data => {
        if (data.length === 0) {
          handleError('No posts yet');
        } else {
          setPosts(data);
        }
      })

      .catch(() => {
        handleError('Something went wrong!');
      })
      .finally(() => setLoading(false), setErrorType(null));
  };

  const handleSelect = id => {
    if (selectPost === id) {
      setWriteComment(false);
      setSelectPost(null);
      setComments([]);

      return;
    }

    setSelectPost(id);
    setComments([]);
    setWriteComment(false);
    setLoading(true);
    getCommentsPosts(id)
      .then(data => {
        if (data.length === 0) {
          setErrorType('no-comments');
        } else {
          setComments(data);
          setErrorType(null);
        }
      })
      .catch(() => {
        setErrorType('error-comments');
      })
      .finally(() => setLoading(false));
  };

  const handleWriteComment = () => {
    setWriteComment(true);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {selectedUserId && isLoading ? (
                  <Loader />
                ) : (
                  <UserSelector
                    users={users}
                    activeDrop={activeDrop}
                    setActiveDrop={setActiveDrop}
                    oneUserSelected={oneUserSelected}
                    selectedUserId={selectedUserId}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUserId && isLoading && <Loader />}

                <ErrorNotification
                  selectPost={selectPost}
                  errorType={errorType}
                  setErrorType={setErrorType}
                />

                {selectedUserId && posts.length > 0 && !isLoading && (
                  <PostsList
                    posts={posts}
                    handleSelect={handleSelect}
                    selectPost={selectPost}
                  />
                )}
              </div>
            </div>
          </div>

          {
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': selectPost !== null },
              )}
            >
              {
                <div className="tile is-child box is-success ">
                  {selectPost !== null && (
                    <PostDetails
                      post={posts.find(post => post.id === selectPost)}
                      selectPost={selectPost}
                      isLoading={isLoading}
                      errorType={errorType}
                      setErrorType={setErrorType}
                      comments={comments}
                      setComments={setComments}
                      writeComment={writeComment}
                      handleWriteComment={handleWriteComment}
                    />
                  )}
                </div>
              }
            </div>
          }
        </div>
      </div>
    </main>
  );
};
