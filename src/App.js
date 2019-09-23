import React, { Component } from 'react';
import PostList from './PostList/PostList';
import './App.css';

class App extends Component {
  state ={
    isLoading: false,
    isLoaded: false,
    isSorted: false,
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
          preparedPosts,
          isLoaded: true,
        });
      });
  }

  sort = () => {
    this.setState(({ isSorted }) => ({
      isSorted: !isSorted,
    }));
  }

  render() {
    const {
      preparedPosts,
      isLoading,
      isLoaded,
      isSorted,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of posts</h1>
        {
          (isLoaded && (
            <>
              <button type="button" onClick={this.sort}>Sort</button>
              <PostList
                posts={isSorted
                  ? [...preparedPosts].sort((a, b) => (
                    a.title.charCodeAt(0) - b.title.charCodeAt(0)
                  ))
                  : preparedPosts}
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
