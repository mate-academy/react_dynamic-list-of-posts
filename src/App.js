import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList/PostList';

const URL = 'https://jsonplaceholder.typicode.com/';

class App extends Component {
  state = {
    posts: [],
    isLoading: false,
    hasError: false,
  }

  handleClickLoad = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });
    Promise.all([
      fetch(`${URL}posts`).then(resolve => resolve.json()),
      fetch(`${URL}users`).then(resolve => resolve.json()),
      fetch(`${URL}comments`).then(resolve => resolve.json()),
    ]).then((data) => {
      const [posts, users, comments] = data;

      this.setState({
        posts: [...posts].map(post => (
          {
            ...post,
            user: users.find(person => person.id === post.userId),
            comments: comments.filter(comment => comment.postId === post.id)
              .map(item => ({
                ...item,
                user: users.find(person => person.email === item.email),
              })),
            isLoading: false,
          }
        )),
      });
    }).catch(() => this.setState({ hasError: true, isLoading: false }));
  }

  render() {
    const { posts, isLoading, hasError } = this.state;
    const titleButton = (hasError ? 'Try again' : 'Load posts');
    const classForButton = (
      isLoading
        ? 'btn btn-secondary'
        : 'btn btn-primary'
    );

    return (
      <div className="App">
        <h1>Static list of posts</h1>

        {posts.length
          ? (
            <>
              <span>posts: </span>
              {posts.length}
            </>
          )
          : (
            <>
              <p>No posts yet..</p>
              {hasError
                ? <p className="alert alert-danger">Error occurred!</p>
                : null
              }
              <button
                type="button"
                className={classForButton}
                onClick={this.handleClickLoad}
                disabled={isLoading}
              >
                {isLoading
                  ? 'Loading...'
                  : titleButton
                }
              </button>
            </>
          )
        }
        <PostList posts={posts} />
      </div>
    );
  }
}

export default App;
