import React, { useState, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUsers } from './api/Users';
import { getPosts } from './api/Posts';
import { Post } from './types/Post';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';
import { addComment, deleteComment, getComments } from './api/Comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoader, setLoader] = useState(false);
  // const [selectedPost, setSelectedPost] = useState<Post>();
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [comments, setComments] = useState<Comment []>([]);
  const [postLoadingError, setPostLoadingError] = useState(false);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [commentAddError, setCommentAddError] = useState(false);
  const [commentDeleteError, setCommentDeleteError] = useState(false);
  const [isCommentsLoader, setCommentsLoader] = useState(false);
  const [isFormVisible, setFormVisability] = useState(false);
  const [isCommentAdding, setCommentAdding] = useState(false);

  const isPostListVisible = Boolean(!isLoader
    && posts.length && selectedUserId);

  const hasNoPosts = Boolean(!isLoader && selectedUserId && !posts.length);

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSelectedUser = async (userId: number) => {
    setSelectedUserId(userId);
    setLoader(true);
    setSelectedPostId(0);

    try {
      const postsFromServer = await getPosts(userId);

      setPosts(postsFromServer);
    } catch {
      setPostLoadingError(true);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectedPost = async (postId: number) => {
    setFormVisability(false);
    setCommentsLoader(true);
    setSelectedPostId(postId);
    try {
      const commentsFromServer = await getComments(postId);

      setComments(commentsFromServer);
    } catch {
      setCommentsLoadingError(true);
    } finally {
      setCommentsLoader(false);
    }
  };

  const handleFormVisability = (boolean: boolean) => {
    setFormVisability(boolean);
  };

  const handleCommentAdd = async (
    author: string,
    email: string,
    comment: string,
  ) => {
    setCommentAdding(true);
    const newComment = {
      id: 0,
      postId: selectedPostId,
      name: author,
      email,
      body: comment,
    };

    try {
      await addComment(selectedPostId, newComment);
      setComments((currentComments) => [...currentComments, newComment]);
    } catch {
      setCommentAddError(true);
    } finally {
      setCommentAdding(false);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      setComments((currentComments) => (
        currentComments.filter((comment) => comment.id !== commentId)
      ));
      await deleteComment(commentId);
    } catch {
      setCommentDeleteError(true);
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
                  setSelectedUser={handleSelectedUser}
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">

                {isLoader && <Loader />}

                {!selectedUserId && (
                  <p
                    data-cy="NoSelectedUser"
                  >
                    No user selected
                  </p>
                )}

                {isPostListVisible && (
                  <PostsList
                    posts={posts}
                    handleSelectedPost={handleSelectedPost}
                    selectedPostId={selectedPostId}
                  />
                )}

                {hasNoPosts && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {postLoadingError && (
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoader={isCommentsLoader}
                  isFormVisable={isFormVisible}
                  handleFormVisability={handleFormVisability}
                  handleCommentAdd={handleCommentAdd}
                  isCommentAdding={isCommentAdding}
                  handleCommentDelete={handleCommentDelete}
                  commentsLoadingError={commentsLoadingError}
                  commentAddError={commentAddError}
                  commentDeleteError={commentDeleteError}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};
