import React from 'react';

import './App.css';
import PostsList from './components/PostsList/PostsList';
import Header from './components/Header/Header';

import { posts } from './api/posts';
import { comments } from './api/comments';
import { users } from './api/users';

function getPostsWithData(posts, users, comments) {
  return posts.map(post => ({
    ...post,
    user: users.find(item => item.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }
  ));
}

class App extends React.Component {
  state = {
    posts: [],
    originPosts: [],
    users: [],
    comments: [],
    isLoading: false,
    isLoaded: false,
  };

  getData = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([posts(), comments(), users()])
      .then(([posts, comments, users]) => {
        this.setState({
          isLoaded: true,
          users,
          comments,
          posts,
          originPosts: posts,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  searchFunc = (event) => {
    const { originPosts } = this.state;

    this.setState({
      posts: [...originPosts].filter(v => (v.title.toLowerCase().includes(event.target.value.toLowerCase()))
      || (v.body.toLowerCase().includes(event.target.value.toLowerCase()))),
    });
  };

  render() {
    const {
      posts, users, comments, isLoading, isLoaded,
    } = this.state;
    const preparedPosts = getPostsWithData(posts, users, comments);

    return (
      <div className="app">
        {isLoaded && (
          <Header posts={preparedPosts} searchFunc={this.searchFunc} />
        )}
        {!users.length && !posts.length && !comments.length && !isLoading && (
          <button onClick={this.getData} className="positive ui button">
            Click
          </button>
        )}
        {isLoading && (
          <div className="ui segment">
            <div className="ui active dimmer">
              <div className="ui indeterminate text loader">
                Preparing Files
              </div>
            </div>
          </div>
        )}
        {isLoaded && <PostsList posts={preparedPosts} />}
      </div>
    );
  }
}

export default App;
