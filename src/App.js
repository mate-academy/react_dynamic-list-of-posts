import React, { Component } from 'react';
import PostList from './PostList/PostList';
import './App.css';

class App extends Component {
  state ={
    isLoading: false,
    isLoaded: false,
    isFiltered: false,
    inputValue: '',
  }

  getData = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ])
      .then(([posts, users, comments]) => Promise.all([
        posts.json(),
        users.json(),
        comments.json(),
      ]))
      .then(([posts, users, comments]) => {
        const usersMap = users.reduce((acc, user) => ({
          ...acc,
          [user.id]: user,
        }), {});

        const preparedPosts = posts
          .map(post => ({
            ...post,
            comments: comments.filter(comment => comment.postId === post.id),
            user: usersMap[post.userId],
          }));

        this.setState({
          posts: preparedPosts,
          filteredPosts: preparedPosts,
          isLoaded: true,
        });
      });
  }

  filterPostsByInput = (event) => {
    event.preventDefault();
    this.setState(({ posts, inputValue }) => ({
      isFiltered: true,
      filteredPosts: posts
        .filter(({ title, body }) => title.includes(inputValue)
          || body.includes(inputValue)),
      inputValue: '',
    }));
  }

  handleSearchInputChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  resetPostsFiltering = () => {
    this.setState({
      isFiltered: false,
    });
  }

  render() {
    const {
      posts,
      filteredPosts,
      isLoading,
      isLoaded,
      isFiltered,
      inputValue,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of posts</h1>
        {
          (isLoaded && (
            <>
              <form onSubmit={e => this.filterPostsByInput(e)}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => this.handleSearchInputChange(e.target.value)}
                />
              </form>
              <button
                type="button"
                onClick={this.resetPostsFiltering}
                className="mt-30"
              >
                Reset
              </button>
              <PostList
                posts={isFiltered
                  ? filteredPosts
                  : posts}
              />
            </>
          ))
          || (isLoading && (<button type="button" disabled>loading...</button>))
          || (<button type="button" onClick={this.getData}>Load</button>)
        }
      </div>
    );
  }
}

export default App;
