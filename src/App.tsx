import classNames from 'classnames';

import 'bulma/css/bulma.css';
import * as bulmaToast from 'bulma-toast';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { errorsSetter } from './helpers/errorsSetter';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [postsFromServer, setPostsFromServer] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsFromServer, setCommentsFromServer] = useState<
    Comment[] | null
  >(null);
  const [newComment, setNewComment] = useState<Comment | null>(null);

  const [isLoading, setIsLoading] = useState({
    users: false,
    posts: false,
    comments: false,
    newComment: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [loadingError, setLoadingError] = useState({
    users: false,
    posts: false,
    comments: false,
    newComment: false,
    delete: false,
  });

  const [toastMessage, setToastMessage] = useState('');

  /* Fetch users from the server */
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(prev => ({ ...prev, users: true }));
      setLoadingError(prev => ({ ...prev, users: false }));
      try {
        const users = await client.get<User[]>('/users');

        setUsersFromServer(users);
      } catch (error) {
        setLoadingError(prev => ({ ...prev, users: true }));
      } finally {
        setIsLoading(prev => ({ ...prev, users: false }));
      }
    };

    fetchUsers();
  }, []);

  /* Fetch posts for the selected user */
  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoading(prev => ({ ...prev, posts: true }));
    setLoadingError(prev => ({ ...prev, posts: false }));
    setSelectedPost(null);
    setPostsFromServer(null);

    const fetchPosts = async () => {
      setNewComment(null);

      try {
        const posts = await client.get<Post[]>(
          `/posts?userId=${selectedUser.id}`
        );

        setPostsFromServer(posts);
      } catch (error) {
        setLoadingError(prev => ({ ...prev, posts: true }));
      } finally {
        setIsLoading(prev => ({ ...prev, posts: false }));
      }
    };

    fetchPosts();
  }, [selectedUser]);

  /* Fetch comments for the selected post */
  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const fetchComments = async () => {
      setIsLoading(prev => ({ ...prev, comments: true }));
      setLoadingError(prev => ({ ...prev, comments: false }));
      setNewComment(null);

      try {
        const comments = await client.get<Comment[]>(
          `/comments?postId=${selectedPost.id}`
        );

        setCommentsFromServer(comments);
      } catch (error) {
        setLoadingError(prev => ({ ...prev, comments: true }));
      } finally {
        setIsLoading(prev => ({ ...prev, comments: false }));
      }
    };

    fetchComments();
  }, [selectedPost]);

  /* For displaying toast messages */
  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    {
      bulmaToast.toast({
        message: toastMessage,
        type: 'is-danger',
        duration: 5000,
        position: 'top-right',
        dismissible: true,
        pauseOnHover: true,
      });
    }
  }, [toastMessage]);

  const handleNewCommentSubmit = async (userComment: Comment) => {
    setToastMessage('');
    setIsLoading(prev => ({ ...prev, newComment: true }));
    setLoadingError(prev => ({ ...prev, newComment: false }));

    errorsSetter(userComment, 'name', true, setFormErrors);
    errorsSetter(userComment, 'email', true, setFormErrors);
    errorsSetter(userComment, 'body', true, setFormErrors);

    if (
      !userComment.name.trim() ||
      !userComment.email.trim() ||
      !userComment.body.trim()
    ) {
      setIsLoading(prev => ({ ...prev, newComment: false }));

      return;
    }

    try {
      const createdComment = await client.post<Comment>(
        `/comments`,
        userComment
      );

      setCommentsFromServer(prev =>
        prev ? [...prev, createdComment] : [createdComment]
      );
      setNewComment(prev => prev && { ...prev, body: '' });
      setFormErrors({ name: false, email: false, body: false });
    } catch (error) {
      setLoadingError(prev => ({ ...prev, newComment: true }));
      setToastMessage('Failed to add comment.');
    } finally {
      setIsLoading(prev => ({ ...prev, newComment: false }));
    }
  };

  const handleClearButtonClick = () => {
    setNewComment({
      id: 0,
      postId: selectedPost?.id || 0,
      name: '',
      email: '',
      body: '',
    });
    setFormErrors({ name: false, email: false, body: false });
  };

  const handleDeleteComment = async (commentId: number) => {
    setToastMessage('');
    setCommentsFromServer(prev =>
      prev ? prev.filter(comment => comment.id !== commentId) : null
    );

    try {
      await client.delete(`/comments/${commentId}`);
    } catch (error) {
      setLoadingError(prev => ({ ...prev, delete: true }));
      setToastMessage('Failed to delete comment.');
    } finally {
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersFromServer}
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingError.users ||
                  (loadingError.posts && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  ))}

                {selectedUser &&
                  postsFromServer &&
                  postsFromServer.length > 0 && (
                    <PostsList
                      posts={postsFromServer}
                      selectedPost={selectedPost}
                      onPostClick={setSelectedPost}
                    />
                  )}

                {selectedUser &&
                  postsFromServer?.length === 0 &&
                  !isLoading.posts && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser && isLoading.posts && <Loader />}
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
              { 'Sidebar--open': selectedPost !== null }
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  comments={commentsFromServer}
                  loadingError={loadingError.comments}
                  isLoading={isLoading}
                  newComment={newComment}
                  onAddComment={setNewComment}
                  formErrors={formErrors}
                  onFormErrorsChange={(field, value) =>
                    setFormErrors(prev => ({ ...prev, [field]: value }))
                  }
                  onNewCommentSubmit={handleNewCommentSubmit}
                  onClearForm={handleClearButtonClick}
                  onDeleteComment={handleDeleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
