import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import * as service from './api/service';

import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';
import { User } from './types/User';

export const App: React.FC = () => {
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const loadUserPosts = (userId: number) => {
    setUserPosts(null);
    setIsLoadingPosts(true);
    setIsPostsError(false);
    service.getUserPosts(userId)
      .then(posts => setUserPosts(posts))
      .catch(() => setIsPostsError(true))
      .finally(() => setIsLoadingPosts(false));
  };

  const loadPostComments = (postId: number) => {
    setPostComments(null);
    setIsCommentsError(false);
    setIsLoadingComments(true);
    service.getPostComments(postId)
      .then(comments => setPostComments(comments))
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsLoadingComments(false));
  };

  const deleteComment = (commentId: number) => {
    service.deleteComment(commentId)
      .catch(() => new Error());
    setPostComments(prevComments => (
      prevComments?.filter(comment => comment.id !== commentId) || null
    ));
  };

  const addComment = (commentData: CommentData) => {
    const { name, email, body } = commentData;

    const newComment = {
      postId: selectedPost?.id,
      name,
      email,
      body,
    };

    setIsAddingComment(true);
    service.addComment(newComment)
      .then(response => (
        setPostComments(prevComments => (
          prevComments ? [...prevComments, response] : null
        ))
      ))
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsAddingComment(false));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  onSelectUser={loadUserPosts}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoadingPosts && (
                  <Loader />
                )}

                {isPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(!userPosts?.length && userPosts) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {!!userPosts?.length && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    onSelectPost={loadPostComments}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar', {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails
                  comments={postComments}
                  post={selectedPost}
                  isCommentsError={isCommentsError}
                  isLoadingComments={isLoadingComments}
                  onDeleteComment={deleteComment}
                  onAddComment={addComment}
                  isAddingComment={isAddingComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
