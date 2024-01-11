import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import cn from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as fetchUsers from './api/users';
import * as fetchPosts from './api/posts';
import * as fetchComments from './api/comments';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { client } from './utils/fetchClient';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isShowingComments, setIsShowingComments] = useState(false);
  const [openPostId, setOpenPostId] = useState(0);
  const [isShowingForm, setIsShowingForm] = useState(false);
  const [errorPosts, setErrorPosts] = useState(false);
  const [errorComments, setErrorComments] = useState(false);

  useEffect(() => {
    fetchUsers.getUsers('/users')
      .then(res => setUsers(res));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);
      setErrorPosts(false);

      fetchPosts.getPosts(`/posts?userId=${selectedUser.id}`)
        .then(res => setPosts(res))
        .catch(() => setErrorPosts(true))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUser]);

  const showPostDetails = (post: Post) => {
    setIsLoadingComments(true);
    if (post.id === openPostId) {
      setOpenPostId(0);
      setIsShowingComments(!isShowingComments);
    }

    if (!openPostId || openPostId !== post.id) {
      setIsShowingComments(true);
      setOpenPostId(post.id);
      setErrorComments(false);

      fetchComments.getComments(`/comments?postId=${post.id}`)
        .then(res => {
          setComments(res);
          setIsLoadingComments(false);
        })
        .catch(() => setErrorComments(true));
    }

    setSelectedPost(post);
    setIsShowingForm(false);
  };

  const handleDeleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`)
      .then(() => {
        const showingComments = comments
          .filter(comment => comment.id !== commentId);

        setComments(showingComments);
      });
  };

  const createNewComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  const handleChangeErrorState = (el: boolean) => {
    setErrorComments(el);
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
                  updateSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!errorPosts && isLoadingPosts
                  && <Loader />}

                {!errorPosts && !selectedUser && !isLoadingPosts && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(!isLoadingPosts
                  && posts.length > 0
                  && selectedUser
                  && !errorPosts)
                  && (
                    <PostsList
                      posts={posts}
                      showPostDetails={showPostDetails}
                      openPostId={openPostId}
                    />
                  )}

                {!isLoadingPosts
                  && !posts.length
                  && selectedUser
                  && !errorPosts
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {errorPosts && (
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
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': isShowingComments },
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails
                comments={comments}
                selectedPost={selectedPost}
                isLoadingComments={isLoadingComments}
                openPostId={openPostId}
                addComment={createNewComment}
                isShowingForm={isShowingForm}
                changeIsShowingForm={setIsShowingForm}
                onDelete={handleDeleteComment}
                error={errorComments}
                changeErrorState={handleChangeErrorState}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
