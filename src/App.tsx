import { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import * as dataService from './services/dataServices';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUserPost, setSelectedUserPost] = useState<Post | null>(null);

  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentErrorMessage, setCommentErrorMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');

  const isNoPost =
    userPosts.length === 0 &&
    !isLoading &&
    !generalErrorMessage &&
    selectedUser;

  useEffect(() => {
    dataService.getUsers().then(setUsers);
  }, []);

  const loadUserPost = (userId: number): Promise<void> => {
    setGeneralErrorMessage('');
    setIsLoading(true);
    setSelectedUserPost(null);

    return dataService
      .getUserPost(userId)
      .then(setUserPosts)
      .catch(() => {
        setGeneralErrorMessage('Something went wrong!');
        setUserPosts([]);
      })
      .finally(() => setIsLoading(false));
  };

  const loadUserComment = (postId: number) => {
    setIsCommentLoading(true);

    return dataService
      .getUserComment(postId)
      .then((comments: Comment[]) => {
        setUserComments(comments);
      })
      .catch(() => {
        setCommentErrorMessage('Something went wrong!');
      })
      .finally(() => setIsCommentLoading(false));
  };

  const createNewComment = (
    postId: number,
    { name, email, body }: CommentData,
  ) => {
    const newComment = { name, email, body, postId };

    return dataService
      .createComment(newComment)
      .then(comment => setUserComments(prev => [...prev, comment]));
  };

  const deleteComment = (commentId: number) => {
    dataService
      .deleteComment(commentId)
      .then(() => {
        setUserComments(currentComment => {
          return currentComment.filter(comment => comment.id !== commentId);
        });
      })
      .catch(() => setCommentErrorMessage('Failed to add comment'));
  };

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
                  onClickSelect={setSelectedUser}
                  loadUserPost={loadUserPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoading && <Loader />}
                {generalErrorMessage && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {generalErrorMessage}
                  </div>
                )}
                {isNoPost && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {userPosts.length > 0 && !isLoading && (
                  <PostsList
                    userPosts={userPosts}
                    selectedUserPost={selectedUserPost}
                    setIsFormOpen={setIsFormOpen}
                    setSelectedUserPost={setSelectedUserPost}
                    loadUserComment={loadUserComment}
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
              { 'Sidebar--open': selectedUserPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedUserPost && (
                <PostDetails
                  userComments={userComments}
                  selectedUserPost={selectedUserPost}
                  commentErrorMessage={commentErrorMessage}
                  isCommentLoading={isCommentLoading}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                  createNewComment={createNewComment}
                  deleteComment={deleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
