import React from 'react';

import './App.css';
import _ from 'lodash';

import PostList from './components/PostList';

const BaseUrl = 'https://jsonplaceholder.typicode.com/';

function getPostsWithUsersAndComment(posts, users, comments) {
  return posts.map(item => ({
    ...item,
    user: users.find(elem => item.userId === elem.id),
    commentsArray: comments.filter(elem => elem.postId === item.id),
  }));
}

class App extends React.Component {
  state = {
    loading: false,
    postsWithUsersAndComment: [],
  }

  setQueryWithDebounce = _.debounce((query) => {
    this.findTitle(query);
  }, 1000);

  LoadPosts = async() => {
    this.setState({
      loading: true,
    });
    this.setState({
      postsWithUsersAndComment: await this.getPostsList(),
    });
  };

  getPostsList = async() => {
    const [posts, users, comments] = await Promise.all([
      this.getDataFromServer('posts'),
      this.getDataFromServer('users'),
      this.getDataFromServer('comments'),
    ]);

    return getPostsWithUsersAndComment(posts, users, comments);
  };

  getDataFromServer = async(url) => {
    const response = await fetch(`${BaseUrl}${url}`);

    return response.json();
  };

  findTitle = (event) => {
    this.setState(prevstete => ({
      postsWithUsersAndComment:
      [...prevstete.postsWithUsersAndComment].filter(item => (
        (item.title + item.body).includes(event))),
    }));
  };

  render() {
    const { postsWithUsersAndComment, loading } = this.state;

    return (
      <>
        <div className="App">
          <h1>Dunamic list of posts</h1>
          {!loading
            && <button type="button" onClick={this.LoadPosts}>Load</button>
          }
          {loading && !postsWithUsersAndComment.length
            ? 'loading...' : ''}
          {loading && postsWithUsersAndComment.length
            ? (
              <input onChange={event => (
                this.setQueryWithDebounce(event.target.value))}
              />
            )
            : ''}
          {postsWithUsersAndComment.length && loading
            ? <PostList posts={postsWithUsersAndComment} /> : ''
          }
        </div>
      </>
    );
  }
}

export default App;
