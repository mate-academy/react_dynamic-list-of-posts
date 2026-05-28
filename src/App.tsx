import classNames from 'classnames';
import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  const loadPosts = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setPosts([]);
    setComments([]);
    setPostsLoadingError(false);
    setIsPostsLoading(true);
    setIsCommentFormVisible(false);

    client
      .get<Post[]>(`/posts?userId=${user.id}`)
      .then(setPosts)
      .catch(() => {
        setPostsLoadingError(true);
      })
      .finally(() => {
        setIsPostsLoading(false);
      });
  };

  const loadComments = (post: Post | null) => {
    setSelectedPost(post);
    setComments([]);
    setCommentsLoadingError(false);
    setIsCommentFormVisible(false);

    if (!post) {
      return;
    }

    setIsCommentsLoading(true);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => {
        setCommentsLoadingError(true);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  };

  const addComment = (data: CommentData & { postId: number }) => {
    return client.post<Comment>('/comments', data).then(newComment => {
      setComments(currentComments => [...currentComments, newComment]);

      return newComment;
    });
  };

  const deleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`);
  };

  const shouldShowNoPosts =
    selectedUser && !isPostsLoading && !postsLoadingError && posts.length === 0;

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
                  onSelect={loadPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {shouldShowNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!isPostsLoading && !postsLoadingError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelect={loadComments}
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
                  post={selectedPost}
                  comments={comments}
                  isLoading={isCommentsLoading}
                  hasError={commentsLoadingError}
                  isFormVisible={isCommentFormVisible}
                  onShowForm={() => setIsCommentFormVisible(true)}
                  onAddComment={addComment}
                  onDeleteComment={deleteComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
