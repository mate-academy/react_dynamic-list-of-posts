import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState, useCallback } from 'react';
import { getUsers } from './services/user.service';
import { getPosts } from './services/post.service';
import * as CommentService from './services/comment.service';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  // State variables
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Selected user and post
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  // Loading and error states
  const [usersLoading, setUsersLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Error states
  const [postsError, setPostsError] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    setUsersLoading(true);
    getUsers()
      .then(setUsers)
      .finally(() => setUsersLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      setPostsLoading(true);
      setPostsError(false);
      setPosts([]);
      setPost(null);

      getPosts(user.id)
        .then(setPosts)
        .catch(() => setPostsError(true))
        .finally(() => setPostsLoading(false));
    } else {
      setPosts([]);
      setPost(null);
    }
  }, [user]);

  useEffect(() => {
    if (post) {
      setCommentsLoading(true);
      setCommentsError(false);
      setComments([]);

      CommentService.getComments(post.id)
        .then(setComments)
        .catch(() => setCommentsError(true))
        .finally(() => setCommentsLoading(false));
    } else {
      setComments([]);
    }
  }, [post]);

  const handleUserSelect = useCallback((activeUser: User) => {
    setUser(activeUser);
  }, []);

  const handleOpenPost = useCallback((activePost: Post | null) => {
    setPost(activePost);
  }, []);

  const handleDeleteComment = useCallback(
    (id: number) => {
      setComments(comments.filter(comment => comment.id !== id));

      CommentService.deleteCommentById(id).catch(() => {
        if (post) {
          CommentService.getComments(post.id).then(setComments);
        }
      });
    },
    [comments, post],
  );

  const handleAddComment = useCallback(
    async (commentData: CommentData) => {
      if (!post) {
        throw new Error('No post selected');
      }

      const newComment = { ...commentData, postId: post.id };

      try {
        const addedComment = await CommentService.addComment(newComment);

        setComments(prev => [...prev, addedComment]);

        return addedComment;
      } catch (error) {
        throw error;
      }
    },
    [post],
  );

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={handleUserSelect}
                  activeUser={user}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {user === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {usersLoading && <Loader />}

                {user && postsLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {user && !postsLoading && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {user && !postsLoading && !postsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onChangeActivePost={handleOpenPost}
                    activePost={post}
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
              { 'Sidebar--open': post !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                comments={comments}
                post={post}
                error={commentsError}
                loading={commentsLoading}
                deleteCommentById={handleDeleteComment}
                addComment={handleAddComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
