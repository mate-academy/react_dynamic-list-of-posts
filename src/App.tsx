import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import React, { useEffect, useState } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { UsersAPI, PostsAPI, CommentsAPI } from './api/client';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<Post[]>();
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [selectedPostLoading, setSelectedPostLoading] =
    useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>();
  const [newCommentAdding, setNewCommentAdding] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getUsers = () => {
    UsersAPI.getAll()
      .then(setUsers)
      .catch(() => setError('Failed to fetch users'));
  };

  const getPostsByUserId = (userId: number, userName: string) => {
    setPostsLoading(true);
    PostsAPI.getPostsByUserId(userId)
      .then(posts => {
        setUserPosts(posts);

        return posts;
      })
      .catch(() => {
        setError(`Failed to get posts for user '${userName}'`);

        return [];
      })
      .finally(() => setPostsLoading(false));
  };

  const selectUserAndLoadPosts = (id: number) => {
    const user = users.find(u => u.id === id);

    if (!user) {
      setError(`User not found (ID: ${id})`);
      setSelectedUser(undefined);
      setUserPosts(undefined);

      return;
    }

    setSelectedUser(user);
    setUserPosts(undefined);
    setError('');

    // Load posts for selected user only
    getPostsByUserId(user.id, user.name);
  };

  const getComments = (postId: number) => {
    setError('');
    CommentsAPI.getCommentsByPostId(postId)
      .then(setPostComments)
      .catch(() => setError(`Failed to get comments for post ${postId}`));
  };

  const getPostById = (id: number) => {
    setError('');
    setPostComments(undefined);
    setSelectedPost(undefined);
    setSelectedPostLoading(true);
    PostsAPI.getPostById(id)
      .then(post => {
        setSelectedPost(post);
        getComments(post.id);
      })
      .catch(() => setError(`Failed to get post ${id}`))
      .finally(() => setSelectedPostLoading(false));
  };

  const addNewComment = (newComment: CommentData) => {
    setNewCommentAdding(true);
    setError('');

    CommentsAPI.addComment(newComment)
      .then(response => {
        setPostComments(prev => [...(prev ?? []), response]);
      })
      .catch(() => setError(`Failed to add comment`))
      .finally(() => setNewCommentAdding(false));
  };

  const deleteComment = (id: number) => {
    setError('');

    CommentsAPI.deleteComment(id)
      .then(() => {
        setPostComments(prev =>
          prev ? prev.filter(comment => comment.id !== id) : [],
        );
      })
      .catch(() => setError(`Failed to delete comment ${id}`));
  };

  const togglePostSelection = (postId: number) => {
    if (selectedPost?.id === postId) {
      setSelectedPost(undefined);
      setPostComments(undefined);
      // Reset any other states like error/loading if needed
    } else {
      getPostById(postId);
    }
  };

  useEffect(() => {
    getUsers();
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
                  selectedUser={selectedUser}
                  onSelect={selectUserAndLoadPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : error ? (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                ) : postsLoading || userPosts === undefined ? (
                  <Loader />
                ) : userPosts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={userPosts}
                    selectedPostId={selectedPost?.id}
                    onSelect={togglePostSelection}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPost && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  postComments={postComments}
                  error={error}
                  loading={selectedPostLoading}
                  onNewComment={addNewComment}
                  onDeleteComment={deleteComment}
                  commentAdding={newCommentAdding}
                  onClearError={() => setError('')}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
