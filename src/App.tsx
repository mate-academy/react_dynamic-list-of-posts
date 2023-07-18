import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { User } from './types/User';
import {
  addComment,
  deleteComment,
  getComments,
  getUserPosts,
  getUsers,
} from './api/api';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

import './App.scss';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [canWriteComment, setCanWriteComment] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const getUserPostsFromServer = (userId: number) => {
    setIsLoading(true);

    getUserPosts(userId)
      .then((data) => {
        setUserPosts(data);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const getCommentsFromServer = (postId: number) => {
    getComments(postId)
      .then((data) => {
        setComments(data);
        setIsCommentError(false);
      })
      .catch(() => setIsCommentError(true))
      .finally(() => setIsLoading(false));
  };

  const handleUserSelect = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();

    getUserPostsFromServer(user.id);
    setSelectedUser(user);
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost((currentPost) => {
      if (currentPost?.id === post.id) {
        return null;
      }

      return post;
    });

    getCommentsFromServer(post.id);
    setCanWriteComment(false);
  };

  const handleAddNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    const newComment = await addComment(postId, name, email, body);

    const filteredComments
      = comments.filter(comment => selectedPost?.id === comment.postId);

    setComments([...filteredComments, newComment]);
  };

  const handleDeleteComment = (commentId: number) => {
    const filteredComments
      = comments.filter(comment => comment.id !== commentId);

    setComments(filteredComments);
    deleteComment(commentId);
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
                  handleUserSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!userPosts.length
                  && selectedUser
                  && !isLoading
                  && !isError
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {userPosts.length > 0 && (
                  <PostsList
                    userPosts={userPosts}
                    handleSelectPost={handleSelectPost}
                    selectedPost={selectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isCommentError={isCommentError}
                  canWriteComment={canWriteComment}
                  setCanWriteComment={setCanWriteComment}
                  handleAddNewComment={handleAddNewComment}
                  handleDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
