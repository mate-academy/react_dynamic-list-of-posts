import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import {
  createComment,
  deleteComment,
  getPostComments,
  getUserPosts,
  getUsers,
} from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { Comment, CommentData } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [commentAdditionError, setCommentAdditionError] = useState(false);
  const [commentAdditionLoading, setCommentAdditionLoading] = useState(false);

  useEffect(() => {
    getUsers()
      .then(userList => setUsers(userList));
  }, []);

  const shouldShowNoPostsMessage = !isLoading
    && !hasError && posts && !posts.length;

  const showUserPosts = useCallback(async (userId: number) => {
    setPost(null);
    setPosts([]);
    setIsLoading(true);
    try {
      const userPosts = await getUserPosts(userId);

      setPosts(userPosts);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showPostComments = useCallback(async (userPost: Post | null) => {
    if (!userPost) {
      setPost(null);

      return;
    }

    setPost(userPost);
    setComments(null);
    setHasCommentsError(false);
    try {
      const postComments = await getPostComments(userPost.id);

      setComments(postComments);
    } catch {
      setHasCommentsError(true);
    }
  }, []);

  const addComment = useCallback(async (comment: CommentData) => {
    setCommentAdditionLoading(true);

    try {
      const createdComment = await createComment(comment);

      setComments(currComments => ([
        ...(currComments || []),
        createdComment,
      ]) as Comment[]);
    } catch {
      setCommentAdditionError(true);
    } finally {
      setCommentAdditionLoading(false);
    }
  }, []);

  const removeComment = useCallback(async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(currComments => (
        (currComments || []).filter(comment => comment.id !== commentId)
      ));
    } catch {
      setHasCommentsError(true);
    }
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
                  onUserClick={showUserPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {posts === null && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && (
                  <Loader />
                )}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPostsMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(posts && posts.length > 0) && (
                  <PostsList
                    posts={posts}
                    onPostDetails={showPostComments}
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
              { 'Sidebar--open': post },
            )}
          >
            {post && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={post}
                  comments={comments}
                  hasCommentsError={hasCommentsError}
                  removeComment={removeComment}
                  addComment={addComment}
                  commentAdditionError={commentAdditionError}
                  commentAdditionLoading={commentAdditionLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
