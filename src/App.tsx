import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  addComments,
  deleteComments,
  getComments,
  getPostComments,
  getPostDetails,
  getPosts,
  getUserPosts,
  getUsers,
} from './api/posts';
import { Comment } from './types/Comment';
import { Post } from './types/Post';
import { User } from './types/User';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectPostDetails, setSelectPostDetails] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [postName, setPostName] = useState<string>('');
  const [postEmail, setPostEmail] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isLoadingDetails, setIsloadingDetails] = useState<boolean>(true);
  const [isLoadingComments, setIsloadingComments] = useState<boolean>(false);
  const [isLoadingForm, setIsloadingForm] = useState<boolean>(false);

  useEffect(() => {
    const showPosts = async () => {
      const showAllPosts = await getPosts();

      setIsloading(false);

      setPosts(showAllPosts);
    };

    showPosts();

    const showUsers = async () => {
      const showAllUsers = await getUsers();

      setUsers(showAllUsers);
    };

    showUsers();
  }, []);

  const filterPosts = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsloading(true);
    let showAllUserPosts;

    if (+event.target.value === 0) {
      showAllUserPosts = await getPosts();
    } else {
      showAllUserPosts = await getUserPosts(+event.target.value);
    }

    setIsloading(false);

    setPosts(showAllUserPosts);
  };

  const loadComments = async (postId: number) => {
    const loadPostComments = await getPostComments(postId);

    setIsloadingComments(false);

    setPostComments(loadPostComments);
  };

  const selectPostId = async (postId: number) => {
    if (selectedPostId === postId) {
      setIsloadingDetails(true);
      setSelectedPostId(null);
    } else {
      setIsloadingDetails(true);
      setSelectedPostId(postId);
      setShowComments(false);
    }

    const selectedPost = await getPostDetails(postId);

    setIsloadingDetails(false);

    setSelectPostDetails(selectedPost);
  };

  const showOrHideComments = async () => {
    setIsloadingComments(true);
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }

    if (selectedPostId) {
      loadComments(selectedPostId);
    }
  };

  const removeComment = async (comment: Comment) => {
    setIsloadingComments(true);
    const remComment = await deleteComments(comment.id);

    loadComments(comment.postId);

    return remComment;
  };

  const uniqueId = async () => {
    const numbers: Comment[] = await getComments();

    return numbers[numbers.length - 1].id + 1;
  };

  const changeName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(value.target.value);
  };

  const changeEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPostEmail(value.target.value);
  };

  const changeBody = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(value.target.value);
  };

  const addComment = async () => {
    const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';

    if (!postName
      || !postEmail || !postEmail.match(emailPattern) || !postBody) {
      return null;
    }

    setIsloadingComments(true);
    setIsloadingForm(true);

    if (selectedPostId) {
      const addCom
      = await addComments(postName, postEmail, postBody,
        uniqueId, selectedPostId);

      loadComments(selectedPostId);
      setPostName('');
      setPostEmail('');
      setPostBody('');
      setIsloadingForm(false);

      return addCom;
    }

    return null;
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={filterPosts}>
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                selectPostId={selectPostId}
                selectedPostId={selectedPostId}
              />
            )}
        </div>

        {selectedPostId && (
          <div className="App__content">
            {isLoadingDetails
              ? <Loader />
              : (
                <PostDetails
                  selectPostDetails={selectPostDetails}
                  showOrHideComments={showOrHideComments}
                  showComments={showComments}
                  postComments={postComments}
                  deleteComment={removeComment}
                  changeName={changeName}
                  changeEmail={changeEmail}
                  changeBody={changeBody}
                  postName={postName}
                  postEmail={postEmail}
                  postBody={postBody}
                  addComment={addComment}
                  isLoadingComments={isLoadingComments}
                  isLoadingForm={isLoadingForm}
                />
              )}
          </div>
        )}
      </main>
    </div>
  );
};
