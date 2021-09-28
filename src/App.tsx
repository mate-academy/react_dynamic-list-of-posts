import React, { useEffect, useState } from 'react';
import { getUserPosts, getPostDetails } from './api/posts';
import { getPostComments, addingComment, deleteComment } from './api/comments';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { Comment } from './components/types/Comment';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setPostId] = useState(0);
  const [openPost, postSwitch] = useState(false);
  const [postDetails, setDetails] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserPosts(0).then(post => setPosts(post));
  }, []);

  useEffect(() => {
    getPostDetails(selectedPostId).then(detail => setDetails(detail));
    getPostComments(selectedPostId).then(info => setComments(info));
  }, [selectedPostId]);

  const filteredPosts = (userId: number) => {
    getUserPosts(userId).then(post => setPosts(post));
  };

  const removeComment = async (idOfComment: number) => {
    await deleteComment(idOfComment);
    getPostComments(selectedPostId).then(info => setComments(info));
  };

  const addComment = async (data: Comment) => {
    const newComment = data;

    newComment.postId = selectedPostId;
    await addingComment(newComment);
    getPostComments(selectedPostId).then(info => setComments(info));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(e) => {
              filteredPosts(+e.target.value);
            }}
          >
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
            selectedPostId={selectedPostId}
            openPost={openPost}
            postSwitch={postSwitch}
            setPostId={setPostId}
            posts={posts}
          />
        </div>

        {openPost && (
          <div className="App__content">
            <PostDetails
              postDetails={postDetails}
              removeComment={removeComment}
              comments={comments}
              addComment={addComment}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
