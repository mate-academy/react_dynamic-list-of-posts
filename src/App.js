import React, { Component } from 'react';
import Button from './components/Button/Button';
import SearchPanel from './components/SearchPanel/SearchPanel';
import PostList from './components/PostList/PostList';

import './App.css';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

class App extends Component {
  state = {
    posts: [],
    isLoading: false,
    term: '',
  };

  handleShow = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(POSTS_URL),
      fetch(USERS_URL),
      fetch(COMMENTS_URL),
    ])
      .then(([resPosts, resUsers, resComments]) => Promise.all(
        [resPosts.json(), resUsers.json(), resComments.json()]
      ))
      .then(([dataPosts, dataUsers, dataComments]) => this.setState({
        posts: dataPosts.map(post => ({
          ...post,
          comments: dataComments.filter(comment => comment.postId === post.id),
          user: dataUsers.find(user => user.id === post.userId),
        })),
        isLoading: false,
      }));
  };

  searchPosts = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => ((item.title
      .toLowerCase().indexOf(term.toLowerCase()) > -1))
      || (item.body
        .toLowerCase().indexOf(term.toLowerCase()) > -1));
  }

  onSearchChange = (term) => {
    this.setState({ term });
  };

  render() {
    const {
      posts,
      term,
      isLoading,
    } = this.state;

    const visiblePosts = this.searchPosts(posts, term);

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {posts.length === 0
          ? (
            <>
              {isLoading
                ? <p>Loading...</p>
                : ''
              }
              <div>
                <Button
                  className="btn--start"
                  text="Load"
                  onClick={this.handleShow}
                />
              </div>
            </>
          )
          : (
            <>
              <SearchPanel
                onSearchChange={this.onSearchChange}
              />
              <PostList posts={visiblePosts} />
            </>
          )
        }
      </div>
    );
  }
}

export default App;
