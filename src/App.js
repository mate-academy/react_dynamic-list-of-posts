import React from 'react';

import './App.css';

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
    title: '',
  }

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

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  findTitle = (event) => {
    event.preventDefault();
    this.setState(prevstete => ({
      postsWithUsersAndComment:
      [...prevstete.postsWithUsersAndComment].filter(item => (
        item.title.includes(prevstete.title)
        || item.body.includes(prevstete.title))),
    }));
  };

  render() {
    return (
      <>
        <div className="App">
          <h1>Dunamic list of posts</h1>
          {!this.state.loading
            && <button type="button" onClick={this.LoadPosts}>Load</button>
          }
          {this.state.loading && !this.state.postsWithUsersAndComment.length
            ? 'loading...' : ''}
          {this.state.loading && this.state.postsWithUsersAndComment.length
            ? (
              <form onSubmit={this.findTitle}>
                <input
                  placeholder="find post"
                  onChange={this.onInputChange}
                  value={this.state.title}
                />
              </form>
            )
            : ''}
          {this.state.postsWithUsersAndComment.length && this.state.loading
            ? <PostList posts={this.state.postsWithUsersAndComment} /> : ''
          }
        </div>
      </>
    );
  }
}

export default App;
