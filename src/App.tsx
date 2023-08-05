import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as postService from './api/api';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    postService.getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUser) {
      setIsLoading(true);

      postService.getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const getComments = (postId: number) => {
    return postService.getComments(postId)
      .then(setComments);
  };

  const deleteComment = (id: number) => {
    setComments(prevComments => prevComments
      .filter(comment => comment.id !== id));

    return postService.deleteComment(id);
  };

  const addComment = ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    const maxId = Math.max(0, ...comments.map(comment => comment.id));

    const id = maxId + 1;

    return postService.createComment({
      id,
      postId,
      name,
      email,
      body,
    })
      .then(newComment => setComments(prevCmnts => [...prevCmnts, newComment]));
  };

  const validatePosts = selectedUser && !isLoading && !isError;

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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {validatePosts && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {validatePosts && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                    isWriting={isWriting}
                    setIsWriting={setIsWriting}
                  />
                )}

                {isError && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  deleteComment={deleteComment}
                  isWriting={isWriting}
                  setIsWriting={setIsWriting}
                  addComment={addComment}
                  getComments={getComments}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
