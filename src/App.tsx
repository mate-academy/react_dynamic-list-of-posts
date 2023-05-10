import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  addComment, deleteComment, getComments, getPosts, getUsers,
} from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  async function fetchUsers() {
    const usersList = await getUsers();

    setUsers(usersList);
  }

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const postsList = await getPosts();

      setPosts(postsList);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchComments() {
    setIsLoading(true);
    try {
      const commentsList = await getComments();

      setComments(commentsList);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  const selectPost = (post: Post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedUser]);

  useEffect(() => {
    fetchComments();
  }, [selectedPost]);

  const filteredPosts = posts
    .filter(post => selectedUser?.id === post.userId);
  const filteredComments = comments
    .filter(comment => selectedPost?.id === comment.postId);

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    let newComment;

    if (selectedPost) {
      newComment = await addComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      setComments([...filteredComments, newComment]);
    }
  };

  const handleRemoveComment = async (selectedCommentId: number) => {
    await deleteComment(selectedCommentId);
    setComments(
      state => state.filter(stateItem => stateItem.id !== selectedCommentId),
    );
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
                  selectUser={selectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(selectedUser && !filteredPosts.length && !isLoading) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(selectedUser && filteredPosts.length > 0 && !isLoading) && (
                  <PostsList
                    filteredPosts={filteredPosts}
                    selectedPost={selectedPost}
                    setIsSelected={setIsSelected}
                    isSelected={isSelected}
                    selectPost={selectPost}
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
              { 'Sidebar--open': isSelected },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                selectedPost={selectedPost}
                filteredComments={filteredComments}
                isLoading={isLoading}
                isError={isError}
                handleAddComment={handleAddComment}
                handleRemoveComment={handleRemoveComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
