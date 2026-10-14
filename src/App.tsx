import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useState } from 'react';
import { User } from './types/User';
import { useUsers } from './Hooks/useUsers';
import { usePosts } from './Hooks/usePosts';
import { useComments } from './Hooks/useComments';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

import { deleteComment } from './api/deleteComments';

export const App = () => {
  const { users } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const { posts, errorText, isLoading } = usePosts(
    selectedUser ? selectedUser.id : 0,
  );
  const { comments, stillLoading, hasErrorText, setComments } = useComments(
    selectedPost ? selectedPost.id : 0,
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setDeleteError('');
  };

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
    setDeleteError('');
  };

  const handleCommentAdd = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  const handleCommentDelete = (commentId: number) => {
    const deletedComment = comments.find(comment => comment.id === commentId);

    setDeleteError('');

    setComments(prev => prev.filter(item => item.id !== commentId));

    deleteComment(commentId).catch(() => {
      if (deletedComment) {
        setComments(prev => [...prev, deletedComment]);
      }

      setDeleteError('Fail to delete');
    });
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
                  onSelect={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {selectedUser && isLoading && <Loader />}

                {selectedUser && !isLoading && errorText && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 &&
                  selectedUser &&
                  !isLoading &&
                  !errorText && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {posts.length !== 0 &&
                  selectedUser &&
                  !isLoading &&
                  !errorText && (
                    <PostsList
                      selectedPost={selectedPost}
                      onSelect={handlePostSelect}
                      posts={posts}
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
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  key={selectedPost.id}
                  selectedPost={selectedPost}
                  comments={comments}
                  stillLoading={stillLoading}
                  hasErrorText={hasErrorText}
                  handleCommentAdd={handleCommentAdd}
                  handleCommentDelete={handleCommentDelete}
                  deleteError={deleteError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
