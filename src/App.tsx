import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { Comment, CommentData } from './types/Comment';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasErrPosts, setHasErrPosts] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasErrComments, setHasErrComments] = useState(false);
  const [hasNewCommentForm, setHasNewCommentForm] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUserID) {
      setHasErrPosts(false);
      setIsLoadingPosts(true);
      client.get<Post[]>(`/posts?userId=${selectedUserID}`)
        .then(setPosts)
        .catch(() => setHasErrPosts(true))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUserID]);

  const MainSection = () => {
    if (!selectedUserID) {
      return (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      );
    }

    if (isLoadingPosts) {
      return (
        <Loader />
      );
    }

    if (hasErrPosts) {
      return (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      );
    }

    if (!posts.length) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        posts={posts}
        selectedPostID={selectedPostID}
        setSelectedPostID={setSelectedPostID}
        setHasNewCommentForm={setHasNewCommentForm}
        setHasErrComments={setHasErrComments}
      />
    );
  };

  useEffect(() => {
    if (selectedPostID) {
      setHasErrComments(false);
      setIsLoadingComments(true);
      client.get<Comment[]>(`/comments?postId=${selectedPostID}`)
        .then(setComments)
        .catch(() => setHasErrComments(true))
        .finally(() => setIsLoadingComments(false));
    }
  }, [selectedPostID]);

  const removeComment = useCallback((commentID: number) => {
    setComments(
      prevComments => prevComments.filter(({ id }) => id !== commentID),
    );
    client.delete(`/comments/${commentID}`);
  }, []);

  const addNewComment = useCallback((data: CommentData) => {
    setIsAddingComment(true);
    setComments(
      prevComments => [
        ...prevComments, { ...data, postId: selectedPostID, id: -1 },
      ],
    );
    client.post<Comment>('/comments', { ...data, postId: selectedPostID })
      .then((res) => {
        if (!res) {
          throw new Error();
        }

        setComments(
          prevComments => [
            ...prevComments.filter(({ id }) => id !== -1),
            res,
          ],
        );
      })
      .catch(() => {
        setComments(
          prevComments => prevComments.filter(({ id }) => id !== -1),
        );
        setHasErrComments(true);
      })
      .finally(() => setIsAddingComment(false));
  }, [selectedPostID]);

  const selectedPost = useMemo(
    () => posts.find(post => post.id === selectedPostID) as Post,
    [posts, selectedPostID],
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
                  selectedUserID={selectedUserID}
                  setSelectedUserID={setSelectedUserID}
                  setSelectedPostID={setSelectedPostID}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <MainSection />
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
              { 'Sidebar--open': !!selectedPostID },
            )}
          >
            <div className="tile is-child box is-success ">
              { !!selectedPostID && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  hasErrComments={hasErrComments}
                  removeComment={removeComment}
                  hasNewCommentForm={hasNewCommentForm}
                  setHasNewCommentForm={setHasNewCommentForm}
                  isAddingComment={isAddingComment}
                  addNewComment={addNewComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
