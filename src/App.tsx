import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import {
  getUsers,
  getPosts,
  getComments,
  postComments,
  deletePost,
} from './api/clientRequest';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isErrorLoadPosts, setIsErrorLoadPosts] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadComments, setIsLoadComments] = useState<boolean>(false);
  const [isErrorLoadComments, setIsErrorLoadComments] = useState(false);
  const [isPostNewComment, setIsPostNewComment] = useState(false);
  const [isErrorPostComments, setErrorPostComments] = useState(false);
  const [safeBodyComments, setSafeBodyComments] = useState(false);
  const [isErrorDelete, setIsErrorDelete] = useState(false);
  const loadPostsYet = !posts.length
    && selectedUser
    && !isLoad
    && !isErrorLoadPosts;
  const loadPostsError = isErrorLoadPosts && !isLoad;
  const showNoSelectedUser = !isLoad && !isErrorLoadPosts && !selectedUser;

  const getDataUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      throw new Error();
    }
  };

  const getDataPosts = async (idUser: number) => {
    try {
      setIsLoad(true);
      const postsFromServer = await getPosts(idUser);

      setPosts(postsFromServer);
      setIsErrorLoadPosts(false);
    } catch {
      setIsErrorLoadPosts(true);
    } finally {
      setIsLoad(false);
    }
  };

  const getDataComments = async (idPost: number) => {
    try {
      setIsLoadComments(false);
      const commentsFromServer = await getComments(idPost);

      setComments(commentsFromServer);
      setIsErrorLoadComments(false);
    } catch {
      setIsErrorLoadComments(true);
    } finally {
      setIsLoadComments(true);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);

  const findSelectedUserPost = useCallback((user): void => {
    setSelectedUser(user);

    getDataPosts(user?.id);
  }, []);

  const findCommentsSelectedPost = useCallback((
    idSelectedPost: number,
  ): void => {
    if (selectedPost?.id === idSelectedPost) {
      setSelectedPost(null);

      return;
    }

    const currentPost = posts.find(({ id }) => id === idSelectedPost);

    setSelectedPost(currentPost || null);

    if (currentPost) {
      getDataComments(currentPost.id);
    }
  }, [posts, selectedPost]);

  const onAddComment = async (name: string, email: string, body: string) => {
    setErrorPostComments(false);
    setIsPostNewComment(true);
    setSafeBodyComments(false);

    try {
      if (!selectedPost) {
        throw new Error('no post');
      }

      const request = await postComments({
        postId: selectedPost.id,
        name,
        email,
        body,
      });

      setComments([...comments, request]);
      setSafeBodyComments(true);
    } catch (err) {
      setErrorPostComments(true);
    } finally {
      setIsPostNewComment(false);
    }
  };

  const deleteCommentFromList = async (commentId: number) => {
    const cloneComments = [...comments];

    try {
      setIsErrorDelete(false);
      setComments(comments.filter(({ id }) => id !== commentId));

      const remove = await deletePost(commentId);

      if (remove === 1) {
        return;
      }

      setComments(cloneComments);
      throw new Error('error');
    } catch {
      setComments(cloneComments);
      setIsErrorDelete(true);
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
                  setSelectedUser={findSelectedUserPost}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isLoad && <Loader />}

                {showNoSelectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {!!posts.length && !isLoad && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    setSelectedPost={findCommentsSelectedPost}
                    setErrorPostComments={setErrorPostComments}
                  />
                )}

                {loadPostsYet && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {loadPostsError && (
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
                  comments={comments}
                  isLoadComments={isLoadComments}
                  isErrorLoadComments={isErrorLoadComments}
                  onAddComment={onAddComment}
                  isPostNewComment={isPostNewComment}
                  isErrorPostComments={isErrorPostComments}
                  setErrorPostComments={setErrorPostComments}
                  safeBodyComments={safeBodyComments}
                  deletePost={deleteCommentFromList}
                  isErrorDelete={isErrorDelete}
                  setIsErrorDelete={setIsErrorDelete}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
