import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../services/Store';
import * as todoService from '../api';
import { UserSelector } from './UserSelector';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { LoaderType } from '../types/LoaderType';
import { ErrorType } from '../types/ErrorType';

export const PostsApp: React.FC = () => {
  const {
    setUsers,
    showUsers,
    setShowUsers,
    selectedUserId,
    setPosts,
    setLoading,
    loading,
    selectedPostId,
    setSelectedPostId,
    setComments,
    setSelectedCommentId,
    setErrorTypeMessage,
    errorTypeMessage,
    setShowNewCommentForm,
    setFormSubmition,
  } = useContext(PostsContext);

  const [showNoUsersMessage, setShowNoUsersMessage] = useState(true);
  const [showNoPostsMessage, setShowNoPostsMessage] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showWritteCommentButton, setShowWritteCommentButton] = useState(true);
  const [showNoCommentsMessage, setShowNoCommentsMessage] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersFromServer = await todoService.getUsers(`/users`);

        setUsers(usersFromServer);
      } catch {
        setShowUsers(false);
        setShowNoUsersMessage(false);
        setErrorTypeMessage(ErrorType.UsersError);
      }
    };

    loadUsers();
  }, [setUsers, setShowNoUsersMessage, setErrorTypeMessage, setShowUsers]);

  useEffect(() => {
    const loadPosts = async () => {
      setErrorTypeMessage(null);
      try {
        if (selectedUserId) {
          setLoading(LoaderType.PostsLoader);
          setShowNoPostsMessage(false);
          setShowPosts(false);
          const postsFromServer = await todoService.getPosts(
            `/posts?userId=${selectedUserId}`,
          );

          if (postsFromServer.length) {
            setShowPosts(true);
          } else {
            setShowNoPostsMessage(true);
          }

          setPosts(postsFromServer);
        }
      } catch {
        setErrorTypeMessage(ErrorType.PostsError);
      } finally {
        setLoading(null);
      }
    };

    loadPosts();
  }, [
    selectedUserId,
    setSelectedPostId,
    setShowPosts,
    setShowNoPostsMessage,
    setErrorTypeMessage,
    setLoading,
    setPosts,
  ]);

  useEffect(() => {
    setShowNewCommentForm(false);

    setShowWritteCommentButton(false);

    const loadCommentsForPost = async () => {
      setErrorTypeMessage(null);
      try {
        setErrorTypeMessage(null);
        if (selectedPostId) {
          setLoading(LoaderType.CommentsLoader);
          const commentsForPost = await todoService.getComments(
            `/comments?postId=${selectedPostId}`,
          );

          setShowWritteCommentButton(true);
          setShowNewCommentForm(true);

          setComments(commentsForPost);
        }
      } catch {
        setErrorTypeMessage(ErrorType.CommentsError);
        setShowNoCommentsMessage(false);
      } finally {
        setLoading(null);
      }
    };

    loadCommentsForPost();
  }, [
    selectedPostId,
    setErrorTypeMessage,
    setShowNewCommentForm,
    setComments,
    setFormSubmition,
    setLoading,
  ]);

  useEffect(() => {
    setErrorTypeMessage(null);

    if (errorTypeMessage) {
      setErrorTypeMessage(errorTypeMessage);
    }

    const timeout = setTimeout(() => {
      setShowNoUsersMessage(true);
      setSelectedCommentId(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errorTypeMessage, setErrorTypeMessage, setSelectedCommentId]);

  return (
    <main
      className="section"
      onClick={() => {
        if (showUsers) {
          setShowUsers(false);
        }
      }}
    >
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              {!selectedUserId && showNoUsersMessage && (
                <p data-cy="NoSelectedUser">No user selected</p>
              )}

              {(errorTypeMessage === ErrorType.UsersError ||
                errorTypeMessage === ErrorType.PostsError) && (
                <div
                  className={classNames('notification is-danger')}
                  data-cy="PostsLoadingError"
                >
                  {'Something went wrong!'}
                </div>
              )}

              {showNoPostsMessage && (
                <div className="notification is-warning" data-cy="NoPostsYet">
                  No posts yet{' '}
                </div>
              )}

              <div className="block" data-cy="MainContent">
                {showPosts && <PostsList />}

                {loading === LoaderType.PostsLoader && <Loader />}
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
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && (
                <PostDetails
                  showWritteCommentButton={showWritteCommentButton}
                  showNoCommentsMessage={showNoCommentsMessage}
                  setShowWritteCommentButton={() =>
                    setShowWritteCommentButton(false)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
