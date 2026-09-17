import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import * as postServise from './components/api/postsApi';
import { ErrorType } from './types/Errors';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType | ''>('');
  const [selectedUserId, setSelectedUserId] = useState<User['id'] | null>(null);
  const [postsId, setPostsId] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadUsers = useCallback(() => {
    setPostsId([]);
    setErrorMessage('');
    setIsLoading(true);

    postServise
      .getUser()
      .then(setUsers)
      .catch(() => setErrorMessage(ErrorType.LoadUser))
      .finally(() => setIsLoading(false));
  }, [setUsers, setErrorMessage, setIsLoading]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (selectedUserId === null) {
      return;
    }

    const loadPosts = async () => {
      try {
        setErrorMessage('');
        setSelectedPostId(null);
        setIsLoading(true);

        const post = await postServise.getPosts(selectedUserId);

        setPostsId(post as Post[]);
      } catch {
        setErrorMessage(ErrorType.DownloadError);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [selectedUserId]);

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const openPost = async (postId: number | null) => {
    if (postId === null) {
      setSelectedPostId(null);
      setComments([]);

      return;
    }

    setIsLoading(true);
    setSelectedPostId(postId);
    setErrorMessage('');
    try {
      const data = await postServise.getComments(postId);

      setComments(data as Comment[]);
    } catch (error) {
      setErrorMessage(ErrorType.DownloadError);
    } finally {
      setIsLoading(false);
    }
  };

  async function addNewComment(comment: CommentData, postId: number) {
    try {
      const newComment = await postServise.addComment(comment, postId);

      setComments(currentComment => [...currentComment, newComment as Comment]);
    } catch (error) {
      setErrorMessage(ErrorType.Add);
    }
  }

  async function handleDeleteComment(commentId: number) {
    setErrorMessage('');
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    try {
      await postServise.deleteComments(commentId);
    } catch (error) {
      setErrorMessage(ErrorType.Delete);
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {!errorMessage && (
                  <UserSelector
                    users={users}
                    onLoadUsers={loadUsers}
                    onSelectUser={handleSelectUser}
                    selectedUserId={selectedUserId}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!errorMessage && !selectedUserId && (
                  <p data-cy="NoSelectedUser">{ErrorType.LoadUser}</p>
                )}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {isLoading && <Loader />}

                {!isLoading && !errorMessage && selectedUserId !== null && (
                  <>
                    {postsId.length > 0 ? (
                      <PostsList
                        postApi={postsId}
                        onOpenPost={openPost}
                        selectedPostId={selectedPostId}
                      />
                    ) : (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        {ErrorType.NoPosts}
                      </div>
                    )}
                  </>
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && postsId.length > 0 && (
                <PostDetails
                  postsApi={postsId}
                  comments={comments}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  selectedPostId={selectedPostId}
                  onSubmitComment={comment =>
                    addNewComment(comment, selectedPostId!)
                  }
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
