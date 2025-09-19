import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';

import * as postsService from './api/api';

import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Errors } from './types/Errors';
import { Post } from './types/Post';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { Comment } from './types/Comment';
import { MainContent } from './components/MainContent';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [postsIsLoading, setPostsIsLoading] = useState(false);
  const [commentsIsLoading, setCommentsIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [displayNewCommentForm, setDisplayNewCommentForm] = useState(false);
  const [displayCommentButton, setDisplayCommentButton] = useState(false);

  const [usersError, setUsersError] = useState<Errors>(Errors.Empty);
  const [postsError, setPostsError] = useState<Errors>(Errors.Empty);
  const [commentsError, setCommentsError] = useState<Errors>(Errors.Empty);
  const [addCommentError, setAddCommentError] = useState<Errors>(Errors.Empty);

  //#region loads
  function loadUsers() {
    setUsersError(Errors.Empty);

    postsService
      .getUsers()
      .then(resolve => setUsers(resolve))
      .catch(() => {
        setUsersError(Errors.Users);
      });
  }

  function loadUsersPosts(userId: number) {
    setPostsIsLoading(true);
    setPostsError(Errors.Empty);

    postsService
      .getUserPosts(userId)
      .then(resolve => setUserPosts(resolve))
      .catch(() => {
        setPostsError(Errors.Posts);
      })
      .finally(() => setPostsIsLoading(false));
  }

  function loadPostComments(postId: number) {
    setCommentsIsLoading(true);
    setCommentsError(Errors.Empty);

    postsService
      .getPostComments(postId)
      .then(resolve => setPostComments(resolve))
      .catch(() => {
        setCommentsError(Errors.Comments);
        setDisplayCommentButton(false);
      })
      .finally(() => setCommentsIsLoading(false));
  }
  //#endregion

  function addComment(comment: Omit<Comment, 'id'>) {
    setIsSubmitting(true);
    setAddCommentError(Errors.Empty);

    return postsService
      .addComment(comment)
      .then(response => {
        setPostComments(prev => [...prev, response]);
      })
      .catch(error => {
        setAddCommentError(Errors.addComment);

        throw error;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function deleteComment(commentId: number) {
    setPostComments(currentComments =>
      currentComments.filter(comm => comm.id !== commentId),
    );

    postsService.deleteComment(commentId);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setUserPosts([]);
      loadUsersPosts(selectedUser?.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setPostComments([]);
      loadPostComments(selectedPost?.id);
    }
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              {!usersError && (
                <div className="block">
                  <UserSelector
                    users={users}
                    onSelectUser={setSelectedUser}
                    selectedUser={selectedUser}
                    onSelectPost={setSelectedPost}
                  />
                </div>
              )}
              <MainContent
                selectedUser={selectedUser}
                isLoading={postsIsLoading}
                postsError={postsError}
                userPosts={userPosts}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
                setDisplayNewCommentForm={setDisplayNewCommentForm}
                setDisplayCommentButton={setDisplayCommentButton}
              />
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
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  isLoading={commentsIsLoading}
                  commentsError={commentsError}
                  addCommentError={addCommentError}
                  comments={postComments}
                  displayNewCommentForm={displayNewCommentForm}
                  setDisplayNewCommentForm={setDisplayNewCommentForm}
                  isSubmitting={isSubmitting}
                  onSubmit={addComment}
                  onDelete={deleteComment}
                  displayCommentButton={displayCommentButton}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
