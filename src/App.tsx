import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

import * as PostService from './api/usersPosts';
import * as UserService from './api/users';
import * as CommentService from './api/postComments';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentError, setIsCommentError] = useState<boolean>(false);
  const [isAddCommentError, setIsAddCommentError] = useState<boolean>(false);
  const [isCommentFormVisible, setIsCommentFormVisible] =
    useState<boolean>(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchUsers = async () => {
    try {
      const usersFromServer = await UserService.getUsers();

      setUsers(usersFromServer);
    } catch {
      setErrorMessage('cant fetch users');
    }
  };

  const fetchPosts = async (userId: number) => {
    try {
      setIsLoadingPosts(true);
      setErrorMessage(null);

      const postsFromServer = await PostService.getPosts(userId);

      setPosts(postsFromServer);
    } catch {
      setErrorMessage('Something went wrong!');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      setIsLoadingComments(true);
      setIsCommentError(false);
      const commentsFromServer = await CommentService.getComments(postId);

      setComments(commentsFromServer);
    } catch {
      setIsCommentError(true);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setComments([]);
    setIsCommentError(false);
    setIsAddCommentError(false);
    setIsCommentFormVisible(false);
  };

  const selectPost = (post: Post | null) => {
    setSelectedPost(post);
    setIsAddCommentError(false);
    setIsCommentFormVisible(false);
  };

  const openCommentForm = () => {
    setIsCommentFormVisible(true);
  };

  const clearAddCommentError = () => {
    setIsAddCommentError(false);
  };

  const onSubmit = async (data: CommentData) => {
    if (!selectedPost) {
      return;
    }

    try {
      setIsAddCommentError(false);

      const newComment = await CommentService.createComment({
        postId: selectedPost.id,
        ...data,
      });

      setComments(prev => [...prev, newComment]);
    } catch {
      setIsAddCommentError(true);
    }
  };

  const deleteComment = async (id: number) => {
    const originalComments = [...comments];

    setComments(comments.filter(comment => comment.id !== id));

    try {
      await CommentService.deleteComment(id);
    } catch {
      setComments(originalComments);
      setIsCommentError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchPosts(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      setComments([]);
      setIsCommentError(false);
      setIsLoadingComments(false);

      return;
    }

    fetchComments(selectedPost.id);
  }, [selectedPost]);

  const NoPostsYet =
    selectedUser && posts.length === 0 && !isLoadingPosts && !errorMessage;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {NoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isLoadingPosts && posts.length > 0 && !errorMessage && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={selectPost}
                  />
                )}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost !== null && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  isCommentError={isCommentError}
                  isAddCommentError={isAddCommentError}
                  isCommentFormVisible={isCommentFormVisible}
                  openCommentForm={openCommentForm}
                  clearAddCommentError={clearAddCommentError}
                  onSubmit={onSubmit}
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
