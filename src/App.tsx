import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  ComentsPost,
  DetailsPost,
  NewPostBody,
  Post,
} from './types/Post';
import {
  getAllPosts,
  getPostComments,
  getPostDetails,
  getUserPosts,
  postNewComment,
  removeComment,
} from './api/api';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setErorr] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<DetailsPost | null>(null);
  const [postComments, setPostComments] = useState<ComentsPost[] | null>(null);

  async function fetchPostList() {
    const result = await getAllPosts();

    setPosts(result);
  }

  useEffect(() => {
    fetchPostList();
  }, []);

  async function UserSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const result = await getUserPosts(+e.target.value);

    if (result.length < 1) {
      setPosts(null);
      setErorr('Dont find this user');

      return;
    }

    setErorr('');
    setPosts(result);
  }

  async function fetchPostComments(PostId: number) {
    const result = await getPostComments(PostId);

    setPostComments(result);
  }

  async function fetchpostDetails(postId: number) {
    if (postId === selectedPostId) {
      setSelectedPost(null);
      setSelectedPostId(0);

      return;
    }

    const result = await getPostDetails(postId);

    fetchPostComments(postId);

    setSelectedPostId(postId);
    setErorr('');
    setSelectedPost(result);
  }

  async function deleteComment(commentId: number) {
    await removeComment(commentId);
    fetchPostComments(selectedPostId);
  }

  async function postComment(newComment: NewPostBody) {
    const preparedData = {
      postId: selectedPostId,
      ...newComment,
    };

    await postNewComment(preparedData);
    fetchPostComments(selectedPostId);
  }

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select onChange={UserSelect} className="App__user-selector">
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            currentPostId={selectedPostId}
            // eslint-disable-next-line
            selectPostId={fetchpostDetails}
          />
          {error}
        </div>

        <div className="App__content">
          {selectedPost && (
            <PostDetails
              selectedPost={selectedPost}
              postComments={postComments}
              // eslint-disable-next-line
              deleteComment={deleteComment}
              // eslint-disable-next-line
              postComment={postComment}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
