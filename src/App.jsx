import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
// eslint-disable-next-line max-len
import { getPosts, getUserPosts, getPostDetails, getPostComments, deletComment, createPost } from './api/post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postDetails, setPostdetails] = useState({});
  const [comments, setComments] = useState([]);
  const [commentId, setCommentID] = useState(0);
  const [userId, setSelectedUserID] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const loadPosts = async() => {
      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (userId !== 0) {
      const loadPostsbyUser = async() => {
        const postsFromServer = await getUserPosts(userId);

        setPosts(postsFromServer);
      };

      loadPostsbyUser();
    } else {
      const loadPosts = async() => {
        const postsFromServer = await getPosts();

        setPosts(postsFromServer);
      };

      loadPosts();
    }
  }, [userId]);

  useEffect(() => {
    if (selectedPostId !== 0) {
      const loadPostByID = async() => {
        const commentsFromServer = getPostComments(selectedPostId);
        const postDetailsFromServer = await getPostDetails(selectedPostId);
        const commentsArray = await commentsFromServer;

        setPostdetails(postDetailsFromServer);
        setComments(commentsArray);
      };

      loadPostByID();
    }
  }, [selectedPostId]);

  useEffect(() => {
    if (commentId !== 0) {
      const reloadCommentsList = async() => {
        await deletComment(commentId);
        const commentsArray = await getPostComments(selectedPostId);

        setComments(commentsArray);
      };

      reloadCommentsList();
    }
  }, [commentId]);

  const postNewComment = async(comment) => {
    await createPost(comment);
    const commentsArray = await getPostComments(selectedPostId);

    setComments(commentsArray);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => {
              setSelectedUserID(Number(event.target.value));
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
          {posts.length > 0
          && (
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            selectPost={(selectedPost) => {
              setSelectedPostId(selectedPost);
            }}
          />
          )}
        </div>

        <div className="App__content">
          {selectedPostId > 0 && (
          <PostDetails
            postDetails={postDetails}
            comments={comments}
            removeComment={commentID => setCommentID(commentID)}
            postComment={postNewComment}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
