import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import * as userService from './api/users';
import * as postService from './api/posts';
import * as commentsService from './api/comments';
import { User } from './types/User';
import { ErrorMessage } from './types/ErrorMessage';
import { Post } from './types/Post';
import { PostComment } from './types/PostComment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSideBarLoading, setIsSideBarLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [commentsErrorMessage, setCommentsErrorMessage] =
    useState<ErrorMessage>(ErrorMessage.None);
  const [isSideBarShown, setIsSideBarShown] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    userService
      .getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage(ErrorMessage.LoadingUsers))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsLoading(true);
    setIsSideBarShown(false);
    setSelectedPost(null);
    setErrorMessage(ErrorMessage.None);

    postService
      .getPosts(selectedUser.id)
      .then(setPosts)
      .catch(() => setErrorMessage(ErrorMessage.LoadingPosts))
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      setComments([]);

      return;
    }

    setIsSideBarLoading(true);
    setCommentsErrorMessage(ErrorMessage.None);

    commentsService
      .getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setCommentsErrorMessage(ErrorMessage.LoadingComments))
      .finally(() => setIsSideBarLoading(false));
  }, [selectedPost]);

  const addNewComment = useCallback(
    (comment: Omit<PostComment, 'id'>): Promise<void> => {
      return commentsService
        .addComment(comment)
        .then(created => {
          setComments(prev => [...prev, created]);
        })
        .catch(() => {
          setCommentsErrorMessage(ErrorMessage.AddComment);

          return Promise.reject();
        });
    },
    [],
  );

  const deleteComment = useCallback((commentId: number) => {
    setComments(prev => {
      const deletedComment = prev.find(comment => comment.id === commentId);

      if (!deletedComment) {
        setCommentsErrorMessage(ErrorMessage.DeleteComment);

        return prev;
      }

      const updatedComments = prev.filter(comment => comment.id !== commentId);

      commentsService.deleteComment(commentId).catch(() => {
        setComments(curr => [...curr, deletedComment]);
        setCommentsErrorMessage(ErrorMessage.DeleteComment);
      });

      return updatedComments;
    });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser &&
                  !isLoading &&
                  !errorMessage &&
                  (!posts.length ? (
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
                      setSelectedPost={setSelectedPost}
                      setIsSideBarShown={setIsSideBarShown}
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
              selectedPost && 'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              {isSideBarShown && selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoading={isSideBarLoading}
                  addNewComment={addNewComment}
                  deleteComment={deleteComment}
                  errorMessage={commentsErrorMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
