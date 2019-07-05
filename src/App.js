import React from 'react';
import './App.css';
import PostList from './components/PostList';
import {getPosts, getUsers, getComments} from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      shownPosts: {},
      isLoaded: false,
      isDisabled: false,
      value: ''
    };
  }

  onLoad = () => {
    this.setState({isDisabled: true});
    this.loadData().then(() => {
      this.setState({isLoaded: true})
    });

  }

  loadData = async() => {
    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments()
    ]);

    const copiedPosts = this.getPostsWithUsersAndComments(posts, users, comments);

    this.setState({
      posts: copiedPosts,
      shownPosts: copiedPosts
    });
  }

  getPostsWithUsersAndComments(posts, users, comments) {
    return posts.map(post => ({
      ...post,
      title: this.convertFirstLetterToUpperCase(post.title),
      body: this.convertFirstLetterToUpperCase(post.body),
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id)
    }))
  }

  convertFirstLetterToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  filterBy = event => {
    const value = event.target.value.toLowerCase();
    const copiedPosts = this.state.posts.filter(post => (
      post.title.toLowerCase().includes(value) ||
      post.body.toLowerCase().includes(value)
    ));

    this.setState({
      value: event.target.value,
      shownPosts: copiedPosts
    })
  }

  render() {
    return (
      <section className="section-wrap">
        <h1>React dynamic list of posts</h1>
        {this.state.isLoaded ? (
            <PostList
              posts={this.state.shownPosts}
              filterBy={this.filterBy}
              value={this.state.value}
            />
          ): (
          <button
            className="btn-load"
            onClick={this.onLoad}
          >
            {this.state.isDisabled ? "Loading..." : "Load"}
          </button>
        )}
      </section>
    );
  }
}

export default App;
