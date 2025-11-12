import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import React, { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [errorUsers, setErrorUsers] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[] | []>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState(false);

  const [hiddenButtonWriteComment, setHiddenButtonWriteComment] =
    useState(false);

  const noPostSelector =
    selectedUser && !isLoadingPosts && !errorPosts && posts.length === 0;

  //users all
  useEffect(() => {
    async function fetchUsers() {
      setErrorPosts(false);

      try {
        const usersFromServer = await client.get<User[]>('/users');

        setUsers(usersFromServer);
      } catch {
        setErrorPosts(true);
      } finally {
        setIsLoadingPosts(false);
      }
    }

    fetchUsers();
  }, []);
  // user select
  useEffect(() => {
    setPosts([]);
    setSelectedPost(null);
    setErrorPosts(false);

    if (!selectedUser) {
      return;
    }

    async function fetchPosts(userId: number | null) {
      try {
        setIsLoadingPosts(true);
        setErrorPosts(false);

        const urlForFetch = '/posts?userId=' + userId;
        const postsFromServer = await client.get<Post[]>(urlForFetch);

        setPosts(postsFromServer);
      } catch {
        setErrorPosts(true);
      } finally {
        setIsLoadingPosts(false);
      }
    }

    fetchPosts(selectedUser.id);
  }, [selectedUser]);

  useEffect(() => {
    setComments([]);
    setHiddenButtonWriteComment(false);

    if (selectedPost === null) {
      return;
    }

    async function fetchComments(postId: number | null) {
      try {
        setIsLoadingComments(true);
        setErrorComments(false);

        const urlForFetch = '/comments?postId=' + postId;
        const commentsFromServer = await client.get<Comment[]>(urlForFetch);

        setComments(commentsFromServer);
      } catch {
        setErrorComments(true);
      } finally {
        setIsLoadingComments(false);
      }
    }

    fetchComments(selectedPost.id);
  }, [selectedPost]);

  const addNewComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const deleteComment = (commentId: number) => {
    const tempComments = [...comments];

    setComments(prev => prev.filter(comment => comment.id !== commentId));
    async function fetchDeleting() {
      try {
        const urlForDeleting = '/comments/' + commentId;

        await client.delete(urlForDeleting);
      } catch (error) {
        setComments(tempComments);
        throw error;
      }
    }

    fetchDeleting();
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
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {selectedUser === null && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {errorPosts && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostSelector && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  hasError={errorComments}
                  isLoading={isLoadingComments}
                  hiddenButton={hiddenButtonWriteComment}
                  setHiddenButton={setHiddenButtonWriteComment}
                  addComment={addNewComment}
                  deleteComment={deleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
