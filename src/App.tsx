import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { Comment as CommentType } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | []>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserPosts, setSelectedUserPost] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [showAddComment, setShowAddComment] = useState(false);
  const [commentAuthorName, setCommentAuthorName] = useState('');
  const [commentAuthorEmail, setCommentAuthorEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [hasCommentError, setHasCommentError] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [hasFormError, setHasFormError] = useState(false);

  const loadUsers = async () => {
    const usersFromServer = await client.get<User[]>('/users');

    setUsers(usersFromServer);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadPosts = async (user: User | null) => {
    if (user) {
      try {
        setIsLoading(true);
        const posts = await client.get<Post[]>(`/posts?userId=${user.id}`);

        setSelectedUserPost(posts);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
        setSelectedPost(null);
      }
    }
  };

  const handleSelectUser = useCallback((user: User | null) => {
    setIsDropdownActive(false);
    setSelectedUser(null);
    setSelectedPost(null);
    setHasCommentError(false);
    setHasError(false);
    setSelectedUser(user);
    loadPosts(user);
  }, []);

  const loadComments = async (post: Post | null) => {
    if (post) {
      setAreCommentsLoading(true);
      try {
        const loadedComments = await client.get<CommentType[]>(`/comments?postId=${post.id}`);

        setComments(loadedComments);
      } catch (error) {
        setHasCommentError(true);
      } finally {
        setAreCommentsLoading(false);
      }
    }
  };

  const handleSelectPost = useCallback((post: Post | null) => {
    if (selectedPost?.id === post?.id) {
      setSelectedPost(null);

      return;
    }

    setHasCommentError(false);
    setComments([]);
    setShowAddComment(false);
    setSelectedPost(post);
    loadComments(post);
  }, [loadComments, selectedPost]);

  const handleShowAddComment = useCallback(() => {
    setShowAddComment(true);
  }, []);

  const handleChangeCommentAuthorName
  = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentAuthorName(event.target.value);
  }, []);

  const handleChangeCommentAuthorEmail
  = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentAuthorEmail(event.target.value);
  }, []);

  const handleChangeCommentContent
  = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(event.target.value);
  }, []);

  const handleClearCommentForm = useCallback(() => {
    setHasFormError(false);
    setCommentAuthorName('');
    setCommentAuthorEmail('');
    setCommentContent('');
  }, []);

  const handleCommentSubmit
  = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentAuthorEmail || !commentAuthorName || !commentContent) {
      setHasFormError(true);

      return;
    }

    setIsAddingComment(true);

    try {
      const newComment = await client.post<CommentType>('/comments', {
        id: 0,
        postId: selectedPost?.id,
        name: commentAuthorName,
        email: commentAuthorEmail,
        body: commentContent,
      });

      setComments(prevComments => [...prevComments, newComment]);
      setCommentContent('');
      setHasFormError(false);
    } catch (error) {
      setHasFormError(true);
    } finally {
      setIsAddingComment(false);
    }
  }, [commentAuthorEmail, commentAuthorName, commentContent, selectedPost]);

  const handleRemoveComment = useCallback(async (id: number) => {
    const foundComment = comments.find(comment => comment.id === id);

    if (foundComment) {
      setComments(prevComments => prevComments
        .filter(comment => comment.id !== id));
      try {
        await client.delete(`/comments/${id}`);
      } catch (error) {
        setHasError(true);
      }
    }
  }, [comments]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isDropdownActive={isDropdownActive}
                  setIsDropdownActive={setIsDropdownActive}
                  users={users}
                  onSelectUser={handleSelectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {selectedUser && (
                  <>
                    {isLoading && <Loader />}

                    {hasError ? (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        Something went wrong!
                      </div>
                    )
                      : (
                        <>
                          {!isLoading && selectedUserPosts.length === 0
                      && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )}
                          {!isLoading && selectedUserPosts.length > 0
                     && (
                       <PostsList
                         selectedUserPosts={selectedUserPosts}
                         onSelecPost={handleSelectPost}
                         selectedPost={selectedPost}
                       />
                     )}
                        </>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>

          {!hasError && (
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
              {selectedPost
              && (
                <div className="tile is-child box is-success ">
                  <PostDetails
                    selectedPost={selectedPost}
                    areCommentsLoading={areCommentsLoading}
                    comments={comments}
                    hasError={hasError}
                    onShowAddComment={handleShowAddComment}
                    showAddComment={showAddComment}
                    onChangeCommentAuthorName={handleChangeCommentAuthorName}
                    onChangeCommentAuthorEmail={handleChangeCommentAuthorEmail}
                    onChangeCommentContent={handleChangeCommentContent}
                    commentAuthorName={commentAuthorName}
                    commentAuthorEmail={commentAuthorEmail}
                    commentContent={commentContent}
                    onClearCommentForm={handleClearCommentForm}
                    onCommentSubmit={handleCommentSubmit}
                    hasFormError={hasFormError}
                    isAddingComment={isAddingComment}
                    onRemoveComment={handleRemoveComment}
                    hasCommentError={hasCommentError}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
