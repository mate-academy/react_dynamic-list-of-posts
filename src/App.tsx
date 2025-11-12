import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { MainContent } from './components/MainContent';
import { Sidebar } from './components/SideBar';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './utils/user';
import { Post } from './types/Post';
import { getPosts } from './utils/post';
import { TypeErrorMessages } from './types/ErrorMessages';
import {
  getComents,
  postComment,
  deleteComment as delCom,
} from './utils/coments';
import { Comment as AppComment, CommentData } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postErrMes, setPostErrMes] = useState<TypeErrorMessages | null>(null);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [comments, setComments] = useState<AppComment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [comErrMes, setComPostErrMes] = useState<TypeErrorMessages | null>(
    null,
  );
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    async function getAllUsers() {
      const usersList = await getUsers();

      setUsers(usersList);
    }

    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectUser === null) {
      return;
    }

    const getUserPosts = async () => {
      try {
        setPostErrMes(null);
        setPosts([]);
        setComments([]);
        setSelectedPost(null);
        setLoadingPost(true);

        const userPosts = await getPosts(selectUser.id);

        if (userPosts.length === 0) {
          setPostErrMes(TypeErrorMessages.noPosts);

          return;
        }

        setPosts(userPosts);
      } catch {
        setPostErrMes(TypeErrorMessages.Wrong);
      } finally {
        setLoadingPost(false);
      }
    };

    getUserPosts();
  }, [selectUser]);

  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    const getPostComments = async () => {
      try {
        setComPostErrMes(null);
        setComments([]);
        setLoadingComments(true);

        const postComments = await getComents(selectedPost.id);

        if (postComments.length === 0) {
          setComPostErrMes(TypeErrorMessages.noComments);

          return;
        }

        setComments(postComments);
      } catch {
        setComPostErrMes(TypeErrorMessages.Wrong);
      } finally {
        setLoadingComments(false);
      }
    };

    getPostComments();
  }, [selectedPost]);

  useEffect(() => {
    setShowForm(false);
  }, [selectedPost]);

  const onUser = (user: User) => setSelectUser(user);

  const onPost = (post: Post | null) => setSelectedPost(post);

  const addNewComment = async (postId: number, data: CommentData) => {
    try {
      const newComment = await postComment({ postId: postId, ...data });

      setComments(curr => [...curr, newComment]);

      setComPostErrMes(null);

      return newComment;
    } catch {
      throw new Error();
    }
  };

  const onNewComment = () => {
    setShowForm(true);
  };

  const deleteComment = async (commentId: number) => {
    const deletedComment = comments.find(c => c.id === commentId);

    setComments(curr => {
      const update = curr.filter(com => com.id !== commentId);

      if (update.length === 0) {
        setComPostErrMes(TypeErrorMessages.noComments);
      }

      return update;
    });

    try {
      await delCom(commentId);
    } catch {
      if (deletedComment) {
        setComments(curr => [...curr, deletedComment]);
        setComPostErrMes(null);
      }

      throw new Error();
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
                  selectUser={selectUser}
                  onUser={onUser}
                />
              </div>

              <MainContent
                selectUser={selectUser}
                posts={posts}
                errorMes={postErrMes}
                loadingPost={loadingPost}
                selectedPost={selectedPost}
                onPost={onPost}
              />
            </div>
          </div>

          <Sidebar
            selectedPost={selectedPost}
            comments={comments}
            loadingComments={loadingComments}
            errorMes={comErrMes}
            showForm={showForm}
            onNewComment={onNewComment}
            addNewComment={addNewComment}
            deleteComment={deleteComment}
          />
        </div>
      </div>
    </main>
  );
};
