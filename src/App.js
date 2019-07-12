import React, { Component } from 'react';
import './App.css';

import LoadButton from './components/LoadButton/LoadButton';
import PostList from './components/PostList/PostList';

import { getUsers, getComments, getPosts } from './components/fetchData';

class App extends Component {
  state = {
    posts: [],
    filteredPosts: [],
    isLoaded: false,
    isLoading: false,
  };

  loadPosts = async() => {
    this.setState({ isLoading: true });

    const [users, comments, posts] = await Promise.all([
      getUsers(),
      getComments(),
      getPosts(),
    ]);

    const postsWithData = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: postsWithData,
      filteredPosts: postsWithData,
      isLoading: false,
      isLoaded: true,
    });
  }

  handleFilter = (event) => {
    const { value } = event.target;
    const callback = post => (
      post.body.includes(value) || post.title.includes(value)
    );

    this.setState(prevState => ({
      filteredPosts: prevState.posts.filter(callback),
    }));
  }

  render() {
    const { filteredPosts, isLoading, isLoaded } = this.state;
    return (
      <main className="container">
        <h1 className="container__header">List of posts</h1>
        {
          isLoaded
            ? (
              <PostList
                posts={filteredPosts}
                handleFilter={this.handleFilter}
              />
            ) : (
              <LoadButton
                isLoading={isLoading}
                handleClick={this.loadPosts}
              />
            )
        }
      </main>
    );
  }
}

export default App;
