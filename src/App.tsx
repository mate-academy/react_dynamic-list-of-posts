/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import * as postService from './utils/postService';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isPostError, setIsPostError] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect(() => {
    setCurrentPost(null);
  }, [currentUser]);

  useEffect(() => {
    postService.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsPostLoading(true);
      setIsPostError(false);

      postService
        .getUserPosts(currentUser.id)
        .then(setPosts)
        .catch(() => {
          setIsPostError(true);
          setCurrentPost(null);
        })
        .finally(() => setIsPostLoading(false));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentPost) {
      setIsCommentLoading(true);
      setIsCommentError(false);

      postService
        .getPostComments(currentPost.id)
        .then(setComments)
        .catch(() => setIsCommentError(true))
        .finally(() => setIsCommentLoading(false));
    }
  }, [currentPost]);

  const deleteComment = async (comment: Comment) => {
    setComments(prev => prev.filter(com => com.id !== comment.id));
    try {
      await postService.deleteComment(comment.id);
    } catch (error) {}
  };

  const addComment = async ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    setButtonLoader(true);

    try {
      const newComment = await postService.addComment({
        postId,
        name,
        email,
        body,
      });

      setComments(prev => [...prev, newComment]);
    } catch (error) {
      setIsCommentError(true);
    } finally {
      setButtonLoader(false);
    }
  };

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
  };

  const handleSetCurrentPost = (post: Post | null) => {
    setCurrentPost(post);
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
                  currentUser={currentUser}
                  onSetCurrentUser={handleSetCurrentUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostLoading && <Loader />}

                {currentUser && isPostError && !isPostLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser &&
                  posts.length === 0 &&
                  !isPostLoading &&
                  !isPostError && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {currentUser &&
                  !isPostError &&
                  !isPostLoading &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      currentPost={currentPost}
                      onSetCurrentPost={handleSetCurrentPost}
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
              { 'Sidebar--open': currentPost },
            )}
          >
            {currentPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  currentPost={currentPost}
                  comments={comments}
                  isError={isCommentError}
                  isLoading={isCommentLoading}
                  onDelete={deleteComment}
                  onAdd={addComment}
                  buttonLoader={buttonLoader}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
