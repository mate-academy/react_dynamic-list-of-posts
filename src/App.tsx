import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostList/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

import { getUsers } from './api/users';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const [postsError, setPostsError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    setPosts([]);

    const loadPosts = async () => {
      setIsLoadingPosts(true);
      setPostsError('');

      try {
        const { getPostsByUser } = await import('./api/posts');

        const postsFromServer = await getPostsByUser(selectedUser.id);

        setPosts(postsFromServer);
      } catch {
        setPostsError('Something went wrong!');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    setComments([]);

    const loadComments = async () => {
      setIsLoadingComments(true);
      setCommentsError('');

      try {
        const { getCommentsByPost } = await import('./api/comments');

        const commentsFromServer = await getCommentsByPost(selectedPost.id);

        setComments(commentsFromServer);
      } catch {
        setCommentsError('Something went wrong');
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [selectedPost]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setComments([]);
  };

  const handlePostSelect = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
    setIsCommentFormVisible(false);
  };

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    if (!selectedPost) {
      return;
    }

    try {
      const { addComment } = await import('./api/comments');
      const newComment = await addComment(selectedPost.id, {
        name,
        email,
        body,
      });

      setComments(current => [...current, newComment]);
    } catch {
      throw new Error('Unable to add a comment');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const oldComments = [...comments];

    setComments(current => current.filter(comment => comment.id !== commentId));

    try {
      const { deleteComment } = await import('./api/comments');

      await deleteComment(commentId);
    } catch {
      setComments(oldComments);
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
                  selectedUser={selectedUser}
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {!!postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {!postsError && !posts.length && (
                  <p className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </p>
                )}

                {!!selectedUser && !!posts.length && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelect={handlePostSelect}
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
              {
                'Sidebar--open': !!selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  commentsError={commentsError}
                  onDeleteComment={handleDeleteComment}
                  isCommentFormVisible={isCommentFormVisible}
                  showCommentForm={() => setIsCommentFormVisible(true)}
                  onAddComment={handleAddComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
