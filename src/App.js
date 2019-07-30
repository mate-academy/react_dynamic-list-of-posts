import React from 'react';
import './App.css';

import PostList from './components/PostList';

const getData = async() => {
  const usersUrl = 'https://jsonplaceholder.typicode.com/users';
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  const getPosts = async() => {
    const postsResponse = await fetch(postsUrl);

    return postsResponse.json();
  };

  const getUsers = async() => {
    const usersResponse = await fetch(usersUrl);

    return usersResponse.json();
  };

  const getComments = async() => {
    const commentsResponse = await fetch(commentsUrl);

    return commentsResponse.json();
  };

  const [posts, users, comments] = await Promise.all([
    getPosts(),
    getUsers(),
    getComments(),
  ]);

  return posts.map(post => (
    {
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));
};

class App extends React.Component {
  state = {
    postList: [],
  };

  async componentDidMount() {
    const posts = await getData();

    this.setState({
      postList: posts,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Dynamic list of posts
          {' '}
          {this.state.postList.length}
        </h1>
        <PostList postList={this.state.postList} />
      </div>
    );
  }
}

export default App;
