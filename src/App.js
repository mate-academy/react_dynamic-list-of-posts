import React from 'react';
import PostList from './components/PostList/PostList';

import './App.css';

function getFullPosts(posts, comments, usersMapApi) {
  return posts.map(post => ({
    ...post,
    comments: comments.filter(comment => comment.postId === post.id),
    user: usersMapApi[post.userId],
  }));
}

class App extends React.Component {
  state = {
    preparedPosts: [],
    filteredPosts: [],
    templateForFilter: '',
    isLoading: false,
    hasError: false,
    isInitialized: false,
  };

  receivePosts = () => {
    this.setState({
      isLoading: true,
      hasError: false,
      isInitialized: true,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ])
      .then(([responsePosts, responseUsers, responseComments]) => Promise
        .all([
          responsePosts.json(),
          responseUsers.json(),
          responseComments.json(),
        ]))
      .then(([posts, users, comments]) => {
        const usersMapApi = users
          .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

        const preparedPosts = getFullPosts(posts, comments, usersMapApi);

        this.setState({
          preparedPosts,
          filteredPosts: [...preparedPosts],
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
          isLoading: false,
        });
      });
  }

  addTextForFilter = ({ target: { value } }) => {
    this.setState({
      templateForFilter: value,
    });
  }

  sortPosts = (event) => {
    event.preventDefault();

    const { templateForFilter } = this.state;

    this.setState(({ filteredPosts }) => ({
      filteredPosts: filteredPosts
        .filter(post => post.title.includes(templateForFilter)
        || post.body.includes(templateForFilter)),
      templateForFilter: '',
    }));
  }

  resetFilter = () => {
    this.setState(({ preparedPosts }) => ({
      filteredPosts: [...preparedPosts],
    }));
  }

  render() {
    const {
      filteredPosts,
      templateForFilter,
      isLoading,
      hasError,
      isInitialized,
    } = this.state;

    if (isLoading) {
      return <p className="loading">Loading...</p>;
    }

    if (hasError) {
      return (
        <>
          <h1 className="app__title">You want to upload again.</h1>
          <button
            type="button"
            className="btn btn-warning load load-again"
            onClick={this.receivePosts}
          >
            Load again
          </button>
        </>
      );
    }

    if (!isInitialized) {
      return (
        <>
          <h1 className="app__title">Want to upload a list of posts?</h1>
          <button
            type="button"
            className="btn btn-primary load"
            onClick={this.receivePosts}
          >
            Load
          </button>
        </>
      );
    }

    return (
      <div className="app">
        <h1 className="app__title">Static list of posts</h1>
        <form onSubmit={event => this.sortPosts(event)}>
          <input
            onChange={event => this.addTextForFilter(event)}
            value={templateForFilter}
            type="text"
            className="text-template"
          />
        </form>
        <button
          onClick={this.resetFilter}
          type="button"
          className="button_reset btn btn-primary load"
        >
          Reset
        </button>
        <PostList fullPosts={filteredPosts} />
      </div>
    );
  }
}

export default App;
