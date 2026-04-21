import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useRef, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getComments, getPosts, getUsers } from './api/getData';
import { deleteComment } from './api/deleteData';
import { createComment } from './api/createData';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
  const [postsError, setPostsError] = useState<string>('');

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsError, setCommentsError] = useState('');

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  useEffect(() => {
    getUsers().then(userFromServer => {
      setUsers(userFromServer);
    });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsPostLoading(true);

    getPosts(selectedUser.id)
      .then(postsFromServer => {
        setPosts(postsFromServer);
      })
      .catch(() => {
        setPostsError('Something went wrong!');
      })
      .finally(() => {
        setIsPostLoading(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    setCommentsError('');

    if (!selectedPost) {
      return;
    }

    setIsCommentsLoading(true);

    getComments(selectedPost.id)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      })
      .catch(() => {
        setCommentsError('Something went wrong');
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [selectedPost]);

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);

    setSelectedPost(null);
    setComments([]);
    setCommentsError('');
    setIsCommentFormOpen(false);
  };

  const handleSelectedPost = (post: Post) => {
    setSelectedPost(prev => (prev?.id === post.id ? null : post));

    setIsCommentFormOpen(false);

    setNameError('');
    setEmailError('');
    setBodyError('');
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId).then(() => {
      setComments(currentComments => {
        return currentComments.filter(comment => comment.id !== commentId);
      });
    });
  };

  const handleCommentFormOpen = (isWriteCommentOpen: boolean) => {
    setIsCommentFormOpen(!isWriteCommentOpen);
  };

  const handleSubmitForm = ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    const trimmedName = name.trim();
    const trimmedBody = body.trim();
    const trimmedEmail = email.trim();

    setNameError('');
    setEmailError('');
    setBodyError('');
    let hasError = false;

    if (!trimmedName) {
      setNameError('Name is required');

      hasError = true;
    }

    if (!trimmedEmail) {
      setEmailError('Email is required');

      hasError = true;
    } else {
      // простая проверка email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedEmail)) {
        setEmailError('Invalid email format');

        hasError = true;
      }
    }

    if (!trimmedBody) {
      setBodyError('Enter some text');

      hasError = true;
    }

    if (hasError) {
      return Promise.resolve(false);
    }

    setIsNewCommentLoading(true);

    return createComment({ postId, name, email, body })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
        setNameError('');
        setEmailError('');
        setBodyError('');

        return true;
      })
      .catch(() => {
        setNameError('Name is required');

        return false;
      })
      .finally(() => {
        setIsNewCommentLoading(false);
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
                  dropDownRef={dropDownRef}
                  users={users}
                  selectedUser={selectedUser}
                  handleSelectedUser={handleSelectedUser}
                  isOpen={isOpen}
                  handleIsOpen={setIsOpen}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isPostLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {!postsError &&
                  selectedUser &&
                  !isPostLoading &&
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
                      selectedPost={selectedPost}
                      handleSelectedPost={handleSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails
                post={selectedPost}
                isCommentsLoading={isCommentsLoading}
                comments={comments}
                commentsError={commentsError}
                handleDeleteComment={handleDeleteComment}
                handleCommentFormOpen={handleCommentFormOpen}
                isCommentFormOpen={isCommentFormOpen}
                handleSubmitForm={handleSubmitForm}
                isNewCommentLoading={isNewCommentLoading}
                nameError={nameError}
                emailError={emailError}
                bodyError={bodyError}
                handleNameError={setNameError}
                handleEmailError={setEmailError}
                handleBodyError={setBodyError}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
