import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { getPosts, getPost } from './api/posts';
import { getComments, removeComment, addComment } from './api/comments';
import { getUsers } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState(0);
  const [IsRenderPost, setIsRenderPost] = useState(false);
  const [comments, setComments] = useState([]);
  const [loaderPosts, setLoaderPosts] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    loadUsers();
    selectPost();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [value]);

  const deleteComment = async(commentId) => {
    await removeComment(commentId);
  };

  const createComment = async(name, email, bodyOfComment, id) => {
    if (!name || !email || !bodyOfComment) {
      return;
    }

    const newComment = {
      name,
      email,
      body: bodyOfComment,
      postId: id,
    };

    await addComment(newComment);
  };

  const loadComments = async(postId) => {
    const commentsFromServer = await getComments();

    setComments([...commentsFromServer.data].filter(
      comment => comment.postId === postId,
    ));
  };

  const loadUsers = async() => {
    setLoaderPosts(true);
    const usersFromServer = await getUsers();

    setLoaderPosts(false);
    setUsers(usersFromServer.data);
  };

  const loadPosts = async() => {
    const postsFromServer = await getPosts();

    setPosts(value === 0
      ? postsFromServer.data
      : [...postsFromServer.data]
        .filter(
          postsItem => postsItem.userId === value,
        ));
  };

  const selectPost = async(postId) => {
    if (postId === 0) {
      setIsRenderPost(false);

      return;
    }

    const postFromServer = await getPost(postId);

    setIsRenderPost(true);
    setPost(postFromServer.data);
  };

  return (

    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={value}
            onChange={({ target }) => setValue(+target.value)}
            className="App__user-selector"
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {!posts.length && !loaderPosts
            ? <div className="PostsList__item">No posts yet</div>
            : <PostsList posts={posts} onSelect={selectPost} />
          }
          { loaderPosts && <Loader />}
        </div>

        {IsRenderPost && post && (
          <div className="App__content">
            <PostDetails
              post={post}
              comments={comments}
              onLoadComments={loadComments}
              onDeleteComment={deleteComment}
              onAddComment={createComment}
            />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
