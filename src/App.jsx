import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts, getPostDetails } from './api/posts';
import { getPostComments, removeComment, createComment } from './api/comments';

const loadPosts = async(setPosts) => {
  const postsFromServer = await getPosts();

  setPosts(
    postsFromServer.filter(data => data.userId !== null && data.title !== null),
  );
};

const loadUserPost = async(setPosts, id) => {
  const postsFromServer = await getUserPosts(id);

  setPosts(postsFromServer);
};

const loadPostDetails = async(setDetails, setComments, postId) => {
  const postFromServer = await getPostDetails(postId);
  const commentsFromServer = await getPostComments(postId);

  setComments(commentsFromServer);
  setDetails(postFromServer);
};

const loadUpdatedComments = async(
  setComments, setCommentId, commentId, postId,
) => {
  await removeComment(commentId);
  const commentsFromServer = await getPostComments(postId);

  setComments(commentsFromServer);
  setCommentId(0);
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setSelectedUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(0);

  useEffect(() => {
    loadPosts(setPosts);
  }, []);

  useEffect(() => {
    if (userId > 0) {
      loadUserPost(setPosts, userId);
    } else {
      loadPosts(setPosts);
    }
  }, [userId]);

  useEffect(() => {
    if (postId > 0) {
      loadPostDetails(setPostDetails, setComments, postId);
    }

    if (commentId > 0) {
      loadUpdatedComments(setComments, setCommentId, commentId, postId);
    }
  }, [postId, commentId]);

  const addNewComment = async(comment) => {
    await createComment(comment);
    const loadNewComments = await getPostComments(postId);

    setComments(loadNewComments);
  };

  const deleteComment = id => setCommentId(id);
  const selectPost = post => setPostId(post);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(e) => {
              setSelectedUserId(+e.target.value);
              setPostId(0);
            }}
            value={userId}
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
            posts={posts}
            postId={postId}
            selectPost={selectPost}
          />
        </div>

        <div className="App__content">
          {postId > 0 && (
            <PostDetails
              postDetails={postDetails}
              comments={comments}
              deleteComment={deleteComment}
              onAdd={addNewComment}
              postId={postId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
