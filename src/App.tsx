import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts } from './api/posts';
import { addComment, deleteComment, getComments } from './api/comments';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [writeComment, setWriteComment] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserPosts()
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedUser]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => selectedUser?.id === post.userId);
  }, [posts]);
  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  const getUsersComments = (postId: number) => {
    getComments(postId)
      .then((data) => {
        setComments(data);
        setIsCommentError(false);
      })
      .catch(() => setIsCommentError(true))
      .finally(() => setIsLoading(false));
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost((currPost) => {
      if (currPost?.id === post.id) {
        return null;
      }

      return post;
    });

    getUsersComments(post.id);
    setWriteComment(false);
  };

  const handleAddNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => {
    const newComment = await addComment(postId, name, email, body);

    const filteredComments
      = comments.filter(comment => selectedPost?.id === comment.postId);

    setComments([...filteredComments, newComment]);
  };

  const handleDeleteComment = async (commentId: number) => {
    const filteredComments
      = comments.filter(comment => comment.id !== commentId);

    setComments(filteredComments);
    await deleteComment(commentId);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
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

                {isLoading && (<Loader />)}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {(selectedUser && !filteredPosts.length && !isLoading) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(selectedUser && !!filteredPosts.length && !isLoading) && (
                  <PostsList
                    posts={filteredPosts}
                    selectedPost={selectedPost}
                    onSelectPost={handleSelectPost}
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
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  isCommentError={isCommentError}
                  writeComment={writeComment}
                  setWriteComment={setWriteComment}
                  onAddNewComment={handleAddNewComment}
                  onDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};
