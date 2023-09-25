import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { Post } from './types/Post';
import { deleteComment, getComments } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [loadingCommentsError, setLoadingCommentsError]
    = useState<boolean>(false);
  const [deletingCommentError, setDeletingCommentError]
    = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleSelectedUser = (id: number) => {
    const findSelectedUser = users.find(user => user.id === id) || null;

    setSelectedUser(findSelectedUser);
    setLoadingPosts(true);

    getPosts(id)
      .then(setPosts)
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  };

  const handleSelectedPost = (id: number) => {
    const findSelectedPost = posts.find(post => post.id === id) || null;

    if (selectedPost?.id !== id) {
      setSelectedPost(findSelectedPost);
      setLoadingComments(true);

      getComments(id)
        .then(setComments)
        .catch(() => {
          setLoadingCommentsError(true);
        })
        .finally(() => setLoadingComments(false));
    } else {
      setSelectedPost(null);
    }
  };

  const handleAddComment = (response: Comment) => {
    setComments([...comments, response]);
  };

  const handleDeleteComment = (id: number) => {
    const filteredComments = comments.filter(comment => comment.id !== id);

    setComments(filteredComments);
    setDeletingCommentError(false);

    deleteComment(id)
      .catch(() => setDeletingCommentError(true));
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
                  handleSelectedUser={handleSelectedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loadingPosts && <Loader />}

                {loadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && selectedUser && !loadingPosts
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {posts.length > 0 && selectedUser && !loadingPosts
                  && (
                    <PostsList
                      posts={posts}
                      handleSelectedPost={handleSelectedPost}
                      selectedPost={selectedPost}
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
              {selectedPost
              && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  loadingComments={loadingComments}
                  loadingCommentsError={loadingCommentsError}
                  handleResponse={handleAddComment}
                  handleDelete={handleDeleteComment}
                  deletingCommentError={deletingCommentError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
