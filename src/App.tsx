import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/userAPI';
import { getPosts } from './api/postAPI';
import { Post } from './types/Post';
import { addComment, deleteComment, getComments } from './api/commentAPI';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setIsLoadingUsers(true);
    setUserError(null);

    getUsers()
      .then(setUsers)
      .catch(() => setUserError('Something went wrong with loading users'))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  const loadPostsHandler = async (userId: number) => {
    setIsLoadingPosts(true);
    setPostError(null);
    setSelectedPost(null);

    try {
      const response = await getPosts(userId);

      setPosts(response || []);
    } catch {
      setPostError('Something went wrong with loading posts!');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const loadCommentsHandler = async (postId: number) => {
    setIsLoadingComments(true);
    setCommentsError(null);
    try {
      const response = await getComments(postId);

      setComments(response || []);
    } catch {
      setCommentsError('Something went wrong with loading comments!');
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    setOpenForm(false);
    if (selectedPost === null) {
      // ???
      // setPosts([]);
      setIsLoadingPosts(false);
      setPostError(null);

      return;
    }

    loadCommentsHandler(selectedPost.id);
  }, [selectedPost]);

  const addCommentHandler = async (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    setCommentsError(null);
    setIsLoadingComments(true);
    try {
      const newComment = await addComment({ postId, name, email, body });

      setComments(prevComments => [...prevComments, newComment]);
    } catch {
      setCommentsError('Something went wrong!');
    } finally {
      setIsLoadingComments(false);
    }
  };

  const deleteCommentHandler = async (id: number) => {
    const prevComments = [...comments];

    setIsLoadingComments(true);
    setCommentsError(null);
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== id),
    );
    try {
      await deleteComment(id);
    } catch {
      setComments(prevComments);
      setCommentsError('Something went wrong!');
    } finally {
      setIsLoadingComments(false);
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
                  users={users}
                  loadPosts={loadPostsHandler}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  loading={isLoadingUsers}
                  error={userError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isLoadingUsers && <Loader />}
                {!isLoadingPosts && postError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {!isLoadingPosts &&
                  !isLoadingUsers &&
                  !postError &&
                  selectedUser &&
                  posts.length === 0 && (
                /* eslint-disable */
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {/* eslint-enable */}
                {isLoadingPosts && <Loader />}
                {!isLoadingPosts && !postError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    openedPost={selectedPost}
                    setOpenedPost={setSelectedPost}
                    setOpenForm={setOpenForm}
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
              { 'Sidebar--open': Boolean(selectedPost) },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  comments={comments}
                  openedPost={selectedPost}
                  isLoading={isLoadingComments}
                  errorMessage={commentsError}
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                  addCommentHandler={addCommentHandler}
                  handleDeleteComment={deleteCommentHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
