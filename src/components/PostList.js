import React from 'react';
import './PostList.css';
import Post from './Post';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      loaded: false,
      postsList: [],
      postsFound: []
    }
    this.loadItems = this.loadItems.bind(this);
    this.searchPost = this.searchPost.bind(this);
  }

  loadApi(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data);
  }

  loadItems() {
    this.setState({
      requested: true
    });

    Promise.all([
      this.loadApi('https://jsonplaceholder.typicode.com/posts'),
      this.loadApi('https://jsonplaceholder.typicode.com/users'),
      this.loadApi('https://jsonplaceholder.typicode.com/comments')
    ])
    .then(([posts, users, comments]) => this.setState({
      loaded: true,
      postsList: posts.map((post) => ({
        ...post,
        user: users.find(user => post.userId === user.id),
        comments: comments.filter(comment => comment.postId === post.id)
      }))
    }))
  }

  searchPost(event) {
    const inputValue = event.target.value.trim();
    this.setState({
      postsFound: this.state.postsList.filter((post) => {
        return post.title.includes(inputValue) || post.body.includes(inputValue)
      })
    });
  }

  render() {
    if (!this.state.requested) {
      return <button onClick={this.loadItems}>Load</button>;
    } else if (this.state.loaded) {
      return (
        <div className="posts-page">
          <input type="text" onInput={this.searchPost} placeholder="Search..." />
          <section className="posts-list">
            {this.state.postsFound.length === 0 ?
              this.state.postsList.map((item) => Post(item)) :
                this.state.postsFound.map((item) => Post(item))
            }
          </section>
        </div>
      );
    } else {
      return <button>Loading...</button>
    }
  }
}

export default PostList;
