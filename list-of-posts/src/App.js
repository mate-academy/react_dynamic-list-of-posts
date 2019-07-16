import React, {Component} from 'react';
import PostList from "./components/PostList";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      users: [],
      comments: [],
      foundPost: [],
      loading: false,
      loaded: false,
      disabled: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.loadData = this.loadData.bind(this);

  }

  filterPosts(event) {
    const inputValue = event.target.value.trim();
    this.setState({
      foundPost: this.state.posts.filter(post => {
        return post.title.includes(inputValue) || post.body.includes(inputValue)
      })
    })
  }

  loadData(url) {
    return fetch(url)
      .then(res => res.json())
  }

  handleClick() {
    this.setState({
      loading: true,
      disabled: true
    });

    Promise.all([
      this.loadData('https://jsonplaceholder.typicode.com/posts'),
      this.loadData('https://jsonplaceholder.typicode.com/users'),
      this.loadData('https://jsonplaceholder.typicode.com/comments')
    ])
      .then(([posts, users, comments]) => this.setState({
          loaded: true,
          posts: posts,
          users: users,
          comments: comments
        })
      )
  }

  render() {
    return (
      <>
        {this.state.loaded
          ? (
            <div>
              <input type="text" onInput={this.filterPosts} placeholder="search post"/>
              <PostList list={!this.state.foundPost.length
                ? this.state.posts
                : this.state.foundPost} users={this.state.users} comments={this.state.comments}/>
            </div>
          )
          : (
            <div>
              <button onClick={this.handleClick} disabled={this.state.disabled}>Load</button>
              {this.state.loading
                ? <p className="loading">Loading...</p>
                : null
              }
            </div>
          )
        }
      </>
    );
  }
}

export default App;
