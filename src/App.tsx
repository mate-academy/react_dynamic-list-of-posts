import React, { useState, ChangeEvent } from 'react';
import './App.css';
import {
  getPosts, getUsers, getComments, Post
} from './Helpers/api';
import { PostList } from './Components/PostList/PostList';

const emptyUser = {
  id: null,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: null,
  },
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);

    const postsFromServer = await getPosts();
    const usersFromServer = await getUsers();
    const commentsFromServer = await getComments();

    const preparedPosts = postsFromServer.map(post => ({
      ...post,
      user: usersFromServer.find(user => user.id === post.userId) || emptyUser,
      comments: commentsFromServer.filter(comment => comment.postId === post.userId),
    }));

    setPosts(preparedPosts);
    setIsLoaded(true);
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault();

    console.log(event.target.value);
    setInput(event.target.value);
  }

  const visiblePosts = [...posts].filter(post => (
    post.title.toLowerCase()
      .includes(input.toLowerCase())
  ));

  return (
    <>
      {!isLoaded ? (
          <button type="button" onClick={loadPosts} disabled={loading}>
            {!loading ? 'Load' : 'Loading'}
          </button>
      ) : (
      <>
        <input type="text" value={input} onChange={(event) => handleInput(event)} />
        <PostList posts={visiblePosts} />
      </>
      )}
    </>
  );
}

export default App;
