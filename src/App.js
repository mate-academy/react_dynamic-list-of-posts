/* eslint-disable react/no-unused-state */
import React from 'react';

import './App.css';
import PostsList from './components/PostsList/PostsList';

class App extends React.Component {
  state = {
    active: 0,
    titleFiltering: 0,
    userFiltering: 0,
    posts: [],
  }

  loadDatas = async() => {
    const [
      usersResponse,
      postsResponse,
      commentsResponse,
    ] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ]);

    const users = await usersResponse.json();
    const posts = await postsResponse.json();
    const comments = await commentsResponse.json();

    const preparedPosts = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: preparedPosts,
      active: 1,
    });
  }

  filterList = (str) => {
    switch (str) {
      case 'title':
        return this.setState(prevState => (
          prevState.titleFiltering === 0
            ? {
              posts: [...prevState.posts]
                .sort((a, b) => (a.title.localeCompare(b.title))),
              titleFiltering: 1,
            }
            : {
              posts: [...prevState.posts]
                .sort((a, b) => (b.title.localeCompare(a.title))),
              titleFiltering: 0,
            }
        ));

      case 'text':
        return this.setState(prevState => (
          prevState.userFiltering === 0
            ? {
              posts: [...prevState.posts]
                .sort((a, b) => (a.body.localeCompare(b.body))),
              userFiltering: 1,
            }
            : {
              posts: [...prevState.posts]
                .sort((a, b) => (b.body.localeCompare(a.body))),
              userFiltering: 0,
            }
        ));

      default:
        return this.state.posts;
    }
  }

  render() {
    const { posts, active } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        <div className={active === 1 ? 'button-back down' : 'button-back'}>
          Loading...
        </div>

        <button
          onClick={this.loadDatas}
          className={active === 1 ? 'button-start down' : 'button-start'}
          type="button"
        >
Load

        </button>

        {!!active && (
          <button
            type="button"
            className="sort sort-left"
            onClick={() => this.filterList('title')}
          >
            Title A-Z
          </button>
        )}

        {!!active && (
          <button
            type="button"
            className="sort"
            onClick={() => this.filterList('text')}
          >
            Text A-Z
          </button>
        )}
        <PostsList posts={posts} />
      </div>
    );
  }
}

export default App;
