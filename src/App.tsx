import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { Reset } from './types/Reset';

import { getUsersList } from './api/users';
import { getPosts } from './api/posts';
import { getComments, postComment, deleteComment } from './api/comments';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUsername] = useState('Choose a user');
  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post [] | null>(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isWrongPostResponse, setIsWrongPostResponse] = useState(false);
  const [isActiveList, setIsActiveList] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isWrongSidebarResponse, setIsWrongSidebarResponse] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentForm, setIsCommentForm] = useState(false);
  const [isLoadingNewComment, setIsloadingNewComment] = useState(false);
  const [isDangerSubmit, setIsDangerSubmit] = useState(false);
  const [isWarningUpdate, setIsWarningUpdate] = useState(false);

  useEffect(() => {
    getUsersList()
      .then(response => setUsers(response))
      .catch(() => setIsWrongPostResponse(true));
  }, []);

  const handleSelectButton = () => {
    setIsActiveList(isCurrent => !isCurrent);
  };

  const handleUserSelect = (
    selectedUserId: number,
    selectedUserName: string,
  ) => {
    setUserId(selectedUserId);
    setUsername(selectedUserName);
    setIsPostLoading(true);
    setIsActiveList(false);

    if (isWrongPostResponse) {
      setIsWrongPostResponse(false);
    }

    getPosts(selectedUserId)
      .then(response => setPosts(response))
      .catch(() => setIsWrongPostResponse(true))
      .finally(() => setIsPostLoading(false));
  };

  const handleSidebarButton = (currentPost: Post) => {
    setSelectedPost(current => {
      return current === currentPost ? null : currentPost;
    });
    setIsCommentsLoading(true);
    setIsCommentForm(false);

    getComments(currentPost.id)
      .then(response => setComments(response))
      .catch(() => setIsWrongSidebarResponse(true))
      .finally(() => setIsCommentsLoading(false));
  };

  const handleSubmitCommentForm = (
    event: React.FormEvent<HTMLFormElement>,
    reset: (inputType: Reset) => void,
    name: string,
    email: string,
    body: string,
    postId?: number,
  ) => {
    event.preventDefault();

    if (!name || !email || !body) {
      setIsDangerSubmit(true);

      return;
    }

    setIsloadingNewComment(true);

    const data = {
      postId,
      name,
      email,
      body,
    };

    const updateComments = (newComment: Comment) => {
      setComments(currenList => {
        return currenList
          ? [
            ...currenList,
            newComment,
          ]
          : [newComment];
      });

      setIsDangerSubmit(false);
      reset(Reset.comment);
    };

    setIsWarningUpdate(false);

    postComment(data)
      .then((response) => updateComments(response))
      .catch(() => setIsWarningUpdate(true))
      .finally(() => setIsloadingNewComment(false));
  };

  const canselDangerInput = () => {
    setIsDangerSubmit(false);
  };

  const handleDeleteComment = (commentId: number) => {
    const prevComments = comments;

    setComments(currentList => {
      if (currentList) {
        const list = currentList?.filter(comment => comment.id !== commentId);

        return list;
      }

      return currentList;
    });

    deleteComment(commentId)
      .then()
      .catch(() => setComments(prevComments));
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
                  userName={userName}
                  isActiveList={isActiveList}
                  onHandleUserSelect={handleUserSelect}
                  onHandleSelectButton={handleSelectButton}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userId && (
                  <p data-cy="Nopost">
                    No user selected
                  </p>
                )}

                {isPostLoading && <Loader />}

                {!isPostLoading
                && userId
                && !isWrongPostResponse
                && (
                  <PostsList
                    posts={posts}
                    onHandleSidebarButton={handleSidebarButton}
                    selectedId={selectedPost?.id}
                  />
                )}

                {isWrongPostResponse && (
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                comments={comments}
                postTitle={selectedPost?.title}
                postBody={selectedPost?.body}
                postId={selectedPost?.id}
                isWrongPostResponse={isWrongSidebarResponse}
                isPostLoading={isCommentsLoading}
                isCommentForm={isCommentForm}
                isLoadingNewComment={isLoadingNewComment}
                isDangerSubmit={isDangerSubmit}
                isWarningUpdate={isWarningUpdate}
                setIsCommentForm={setIsCommentForm}
                onHandleFormSubmit={handleSubmitCommentForm}
                canselDangerInput={canselDangerInput}
                onHandleDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
