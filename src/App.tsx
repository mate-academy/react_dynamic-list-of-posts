import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';
import { getUsers } from './utils/Users';
import { getUserPosts } from './utils/UserPosts';
import {
  createComments,
  deleteComments,
  getComments,
} from './utils/PostComments';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [selectedPostId, setSelectedPostId] = useState(-1);
  const [isOpened, setIsOpened] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthEmail(event.target.value);
  };

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleDeleteComment = (commentId: number) => {
    setErrorMessage('');

    deleteComments(commentId)
      .then(() =>
        setComments(currentComments =>
          currentComments.filter(
            currentComment => currentComment.id !== commentId,
          ),
        ),
      )
      .catch(() => setErrorMessage('Unable to delete comment'));
  };

  const handleAddComment = ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => {
    setErrorMessage('');

    return createComments({ name, email, body, postId })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => setErrorMessage('Unable to delete comment'));
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setAuthName('');
    setAuthEmail('');
    setText('');
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);

    handleAddComment({
      name: authName,
      email: authEmail,
      body: text,
      postId: selectedUserId,
    }).finally(() => {
      setIsLoading(false);
      setIsSubmitted(false);
      setText('');
    });
  };

  const selectedUser = users.find(user => user.id === selectedUserId);
  const selectedPost = posts.find(post => post.id === selectedPostId);

  const handleUserSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    event.preventDefault();

    setSelectedUserId(userId);
    setIsOpened(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(() => setErrorMessage('Unable to load users'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsPressed(false);
  }, [selectedPostId]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setPosts([]);

    getUserPosts(selectedUserId)
      .then(userPostsFromServer => {
        setPosts(userPostsFromServer);
      })
      .catch(() => setErrorMessage(`Unable to load user's posts`))
      .finally(() => setIsLoading(false));
  }, [selectedUserId]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setComments([]);

    getComments(selectedPostId)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      })
      .catch(() => setErrorMessage(`Unable to load comments`))
      .finally(() => setIsLoading(false));
  }, [selectedPostId]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  isOpened={isOpened}
                  selectedUser={selectedUser}
                  onOpened={setIsOpened}
                  onUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUserId === -1 && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage !== '' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUserId !== -1 &&
                  !isLoading &&
                  errorMessage === '' &&
                  (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onSelectedPostId={setSelectedPostId}
                    />
                  ))}
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
                'Sidebar--open':
                  selectedPostId !== -1 &&
                  selectedPost?.userId === selectedUserId,
              },
            )}
          >
            {selectedPostId !== -1 && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  name={authName}
                  email={authEmail}
                  text={text}
                  selectedUserId={selectedUserId}
                  selectedPost={selectedPost}
                  comments={comments}
                  errorMessage={errorMessage}
                  isLoading={isLoading}
                  isPressed={isPressed}
                  isSubmitted={isSubmitted}
                  onHandleName={handleName}
                  onHandleEmail={handleEmail}
                  onHandleText={handleText}
                  onHandleReset={handleReset}
                  onHandleForm={handleForm}
                  onDelete={handleDeleteComment}
                  onPressed={setIsPressed}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
