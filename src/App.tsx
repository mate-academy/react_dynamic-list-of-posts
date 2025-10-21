/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { client } from './utils/fetchClient';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App = () => {
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[] | null>(
    null,
  );
  const [selectedPostComments, setSelectedPostComments] = useState<
    Comment[] | null
  >(null);

  const [formOpened, setFormOpened] = useState<boolean>(false);

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isLoaderComment, setIsLoaderComment] = useState<boolean>(false);
  const [isLoaderForm, setIsLoaderForm] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);
  const [isErrorComment, setIsErrorComment] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{}>({
    name: false,
    email: false,
    text: false,
  });

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formText, setFormText] = useState('');

  useEffect(() => {
    client.get('/users').then(res => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      setSelectedUserPosts(null);
      setIsLoader(true);
      client
        .get(`/posts?userId=${selectedUserId}`)
        .then(res => {
          setSelectedUserPosts(res);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoader(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId !== null) {
      setSelectedPostComments(null);
      setIsLoaderComment(true);
      client
        .get(`/comments?postId=${selectedPostId}`)
        .then(res => {
          setSelectedPostComments(res);
        })
        .catch(() => setIsErrorComment(true))
        .finally(() => setIsLoaderComment(false));
    }
  }, [selectedPostId]);

  const handleSubmit = (
    nameSurname: string,
    email: string,
    text: string,
    postId: number,
  ) => {
    const newComment = {
      postId: postId,
      name: nameSurname,
      email: email,
      body: text,
    };

    const newErrors = {
      name: nameSurname === '',
      email: email === '',
      text: text === '',
    };

    setFormErrors(newErrors);

    const hasError = Object.values(newErrors).some(error => error === true);

    if (hasError) {
      return;
    }

    setIsLoaderForm(true);

    client
      .post(`/comments`, newComment)
      .then(res => {
        if (selectedPostComments !== null) {
          setSelectedPostComments(prev => [...prev, res]);
          setFormText('');
        }
      })
      .finally(() => {
        setIsLoaderForm(false);
      });
  };

  const handleDelete = (commentId: number | null) => {
    client.delete(`/comments/${commentId}`);
    setSelectedPostComments(prev => {
      const newComments = prev.filter(comment => comment.id !== commentId);

      return newComments;
    });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setOpenSideBar={setOpenSideBar}
                  toggleButton={toggleButton}
                  setToggleButton={setToggleButton}
                  users={users}
                  setSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoader && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isLoader &&
                  selectedUserPosts?.length === 0 &&
                  selectedUserId && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!isLoader && selectedUserPosts?.length > 0 && (
                  <PostsList
                    selectedUserPosts={selectedUserPosts}
                    setOpenSideBar={setOpenSideBar}
                    openSideBar={openSideBar}
                    setSelectedPostId={setSelectedPostId}
                    selectedPostId={selectedPostId}
                    setFormOpened={setFormOpened}
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
              { 'Sidebar--open': openSideBar },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && (
                <PostDetails
                  selectedUserPosts={selectedUserPosts}
                  selectedPostComments={selectedPostComments}
                  isLoaderComment={isLoaderComment}
                  isErrorComment={isErrorComment}
                  selectedPostId={selectedPostId}
                  formOpened={formOpened}
                  setFormOpened={setFormOpened}
                  formName={formName}
                  setFormName={setFormName}
                  formEmail={formEmail}
                  setFormEmail={setFormEmail}
                  setFormText={setFormText}
                  formText={formText}
                  handleSubmit={handleSubmit}
                  isLoaderForm={isLoaderForm}
                  formErrors={formErrors}
                  setFormErrors={setFormErrors}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
