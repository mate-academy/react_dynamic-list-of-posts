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

  // Separate error states
  const [usersError, setUsersError] = useState('');
  const [postsError, setPostsError] = useState('');
  const [commentsError, setCommentsError] = useState('');
  const [createCommentError, setCreateCommentError] = useState('');
  const [deleteCommentError, setDeleteCommentError] = useState('');

  // Separate loading states
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);

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
    // Clear validation error when user starts typing
    if (isSubmitted && event.target.value.trim() !== '') {
      setIsSubmitted(false);
    }
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthEmail(event.target.value);
    // Clear validation error when user starts typing
    if (isSubmitted && event.target.value.trim() !== '') {
      setIsSubmitted(false);
    }
  };

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    // Clear validation error when user starts typing
    if (isSubmitted && event.target.value.trim() !== '') {
      setIsSubmitted(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setDeleteCommentError('');

    // Optimistic update - remove comment immediately
    const previousComments = [...comments];

    setComments(currentComments =>
      currentComments.filter(currentComment => currentComment.id !== commentId),
    );

    deleteComments(commentId)
      .then(() => {
        // Success - comment already removed
      })
      .catch(() => {
        // Restore comment on failure
        setComments(previousComments);
        setDeleteCommentError('Unable to delete comment');
      });
  };

  const handleAddComment = ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => {
    setCreateCommentError('');

    return createComments({ name, email, body, postId })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        // Keep name and email, clear only text
        setText('');
        setIsSubmitted(false);
      })
      .catch(() => setCreateCommentError('Unable to create comment'));
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setAuthName('');
    setAuthEmail('');
    setText('');
    setCreateCommentError('');
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = authName.trim();
    const trimmedEmail = authEmail.trim();
    const trimmedText = text.trim();

    // Validate all fields
    if (trimmedName === '' || trimmedEmail === '' || trimmedText === '') {
      setIsSubmitted(true);

      return;
    }

    setIsCreatingComment(true);

    handleAddComment({
      name: trimmedName,
      email: trimmedEmail,
      body: trimmedText,
      postId: selectedPostId, // Fix: use selectedPostId instead of selectedUserId
    }).finally(() => {
      setIsCreatingComment(false);
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
    setIsLoadingUsers(true);
    setUsersError('');

    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(() => setUsersError('Unable to load users'))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  useEffect(() => {
    setIsPressed(false);
  }, [selectedPostId]);

  useEffect(() => {
    setIsLoadingPosts(true);
    setPostsError('');
    setPosts([]);

    getUserPosts(selectedUserId)
      .then(userPostsFromServer => {
        setPosts(userPostsFromServer);
      })
      .catch(() => setPostsError(`Unable to load user's posts`))
      .finally(() => setIsLoadingPosts(false));
  }, [selectedUserId]);

  useEffect(() => {
    setIsLoadingComments(true);
    setCommentsError('');
    setComments([]);

    getComments(selectedPostId)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      })
      .catch(() => setCommentsError(`Unable to load comments`))
      .finally(() => setIsLoadingComments(false));
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

                {isLoadingUsers && <Loader />}

                {usersError !== '' && (
                  <div
                    className="notification is-danger"
                    data-cy="UsersLoadingError"
                  >
                    {usersError}
                  </div>
                )}

                {isLoadingPosts && <Loader />}

                {postsError !== '' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {selectedUserId !== -1 &&
                  !isLoadingUsers &&
                  !isLoadingPosts &&
                  usersError === '' &&
                  postsError === '' &&
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
                  errorMessage={commentsError}
                  isLoading={isLoadingComments}
                  isPressed={isPressed}
                  isSubmitted={isSubmitted}
                  isCreatingComment={isCreatingComment}
                  createCommentError={createCommentError}
                  deleteCommentError={deleteCommentError}
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
