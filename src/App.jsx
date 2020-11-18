import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getComments } from './api/comment';
import { Loader } from './components/Loader/Loader';
import { UserSelect } from './components/UserSelect';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [selectedComments, setSelectedComments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [activePostId, setActivePostId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setPosts(await getUserPosts(0));
      setComments(await getComments());
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const updatedPost = posts
      .find(post => post.id === activePostId);
    const updatedComments = comments
      .filter(comment => comment.postId === activePostId);

    setSelectedPost(updatedPost);
    setSelectedComments(updatedComments);
  }, [activePostId]);

  const handleSelectChange = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCommentAdd = (comment) => {
    const newComment = Object.assign(comment, { id: comments.length });

    setSelectedComments(selectedComments.concat(newComment));
    setComments(comments.concat(newComment));
  };

  const handleCommentDelete = (commentId) => {
    setSelectedComments(selectedComments
      .filter(comment => comment.id !== commentId));
    setComments(comments
      .filter(comment => comment.id !== commentId));
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect onUserSelect={handleSelectChange} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {loading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                selectedUserId={selectedUserId}
                onActivePostChange={setActivePostId}
              />
            )
          }
        </div>

        <div className="App__content">
          {activePostId
            ? (
              <PostDetails
                {...selectedPost}
                comments={selectedComments}
                onCommentDelete={handleCommentDelete}
                onCommentAdd={handleCommentAdd}
              />
            )
            : <p>Choose the post from the list</p>
          }
        </div>
      </main>
    </div>
  );
};

export default App;
