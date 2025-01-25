import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  const handleActiveUser = (user: User) => {
    setActiveUser(null);
    setActivePost(null);
    setIsLoading(true);
    setIsError(false);

    setActiveUser(user);
    client
      .get<Post[]>(`/posts?userId=${user?.id}`)
      .then(setPosts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleActivePost = (post: Post | null) => {
    setIsCommentsLoading(true);
    setIsCommentsError(false);

    setActivePost(post);
    if (post !== null) {
      client
        .get<Comment[]>(`/comments?postId=${post?.id}`)
        .then(setComments)
        .catch(() => setIsCommentsError(true))
        .finally(() => setIsCommentsLoading(false));
    }
  };

  const handleAddComment = (newComment: Comment, postId: number) => {
    const comment = { ...newComment, postId: postId };

    return client
      .post<Comment>('/comments', comment)
      .then(commentFromServer =>
        setComments(prev => [...(prev || []), commentFromServer]),
      )
      .catch(() => setIsCommentsError(true));
  };

  const handleDeleteComment = (commentId: number) => {
    client
      .delete(`/comments/${commentId}`)
      .then(() =>
        setComments(prevComments =>
          prevComments.filter(prevComment => prevComment.id !== commentId),
        ),
      )
      .catch(() => setIsCommentsError(true));
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
                  activeUser={activeUser}
                  handleActiveUser={handleActiveUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
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

                {!isLoading && !isError && posts.length === 0 && activeUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && !isLoading && (
                  <PostsList
                    posts={posts}
                    activePost={activePost}
                    handleActivePost={handleActivePost}
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
              { 'Sidebar--open': activePost },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && (
                <PostDetails
                  activePost={activePost}
                  comments={comments}
                  isCommentsError={isCommentsError}
                  isCommentsLoading={isCommentsLoading}
                  handleDeleteComment={handleDeleteComment}
                  handleAddComment={handleAddComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
