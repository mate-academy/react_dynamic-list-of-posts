import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { UserNotification } from './components/UserNotification';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './Api/Users';
import { Post } from './types/Post';
import { getUserPosts } from './Api/Posts';
import { MessageType } from './types/MessageType';
import { MESSAGES } from './const';
import { NotificationMessage } from './types/NotificationMessage';
import { Comment } from './types/Comment';
import {
  createPostComment,
  deleteComment,
  getPostComments,
} from './Api/Comments';
import { NewCommentFormProps } from './components/NewCommentForm';
import { CyData } from './types/CyData';

const newCommnet = {
  id: 0,
  postId: 0,
  name: '',
  email: '',
  body: '',
};

export const App = () => {
  const [message, setMessage] = useState<NotificationMessage | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false);
  const [newCommentValues, setNewCommentValues] = useState<Comment>(newCommnet);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (user?.id) {
      setMessage(null);
      setSelectedPost(null);
      setIsPostLoading(true);
      getUserPosts(user.id)
        .then(serverPosts => {
          setPosts(serverPosts);
          if (serverPosts.length > 0) {
            setMessage(null);
          } else {
            setMessage({
              text: MESSAGES.NO_POSTS,
              type: MessageType.Warning,
              cyData: CyData.NoPostsYet,
            });
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          setMessage({
            text: MESSAGES.ERROR,
            type: MessageType.Danger,
            cyData: CyData.PostsLoadingError,
          });
        })
        .finally(() => setIsPostLoading(false));
    } else {
      setPosts([]);
    }
  }, [user]);

  useEffect(() => {
    setMessage(null);
    setIsCommentError(false);
    if (!selectedPost) {
      setComments([]);

      return;
    }

    setIsCommentLoading(true);
    if (selectedPost) {
      getPostComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsCommentError(true))
        .finally(() => {
          setShowCommentForm(false);
          setNewCommentValues({ ...newCommnet });
          setIsCommentLoading(false);
        });
    }
  }, [selectedPost]);

  const onDeleteComment = (deletedComment: Comment) => {
    setIsCommentLoading(true);
    const deleteIndex = comments.indexOf(deletedComment);

    setComments(
      comments.filter(
        currentComment => deletedComment.id !== currentComment.id,
      ),
    );
    deleteComment(deletedComment.id)
      .catch(() => {
        setIsCommentError(true);
        comments.splice(deleteIndex, 0, deletedComment);
        setComments([...comments]);
      })
      .finally(() => setIsCommentLoading(false));
  };

  const onAddNewComment = () => {
    if (!selectedPost?.id) {
      return;
    }

    newCommentValues.postId = selectedPost.id;
    setIsNewCommentLoading(true);
    createPostComment(newCommentValues)
      .then((serverComment: Comment) => {
        setComments([...comments, serverComment]);
        setNewCommentValues({
          ...newCommentValues,
          id: 0,
          postId: 0,
          body: '',
        });
      })
      .catch(() => {
        setIsCommentError(true);
      })
      .finally(() => setIsNewCommentLoading(false));
  };

  const onClearComment = () => setNewCommentValues(newCommnet);

  const newCommentFormProps: NewCommentFormProps = {
    isNewCommentLoading,
    newCommentValues,
    setNewCommentValues,
    onAddNewComment,
    onClearComment,
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} user={user} onSelect={setUser} />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {isPostLoading && <Loader />}

                {message && <UserNotification message={message} />}
                {!isPostLoading && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPost={selectedPost}
                    onSelect={setSelectedPost}
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
                  isCommentLoading={isCommentLoading}
                  isCommentError={isCommentError}
                  showCommentForm={showCommentForm}
                  setShowCommentForm={setShowCommentForm}
                  deleteComment={onDeleteComment}
                  newCommentFormProps={newCommentFormProps}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
