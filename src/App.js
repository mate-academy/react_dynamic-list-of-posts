import React from 'react';
import './App.css';
import PostList from './components/PostList';
import {getPosts, getUsers, getComments} from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postItems: [],
      isLoaded: false,
      isDisabled: false,
      shownPosts: [],
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
    ])

    this.setState({
      posts: this.getPostsWithUsersAndComments(posts, users, comments),
      shownPosts: this.getPostsWithUsersAndComments(posts, users, comments)
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

  showComments = (postId) => {
    this.setState(prevState => {
      const copyPostItems = {...prevState.postItems};
      copyPostItems[postId] = !copyPostItems[postId];

      return { postItems:copyPostItems };
    })
  }

  filterBy = (event) => {
    const copyPosts = this.state.posts.filter(post => (
      post.title.toLowerCase().includes(event.target.value) ||
      post.body.toLowerCase().includes(event.target.value)
    ));

    this.setState({
      value: event.target.value,
      shownPosts: copyPosts
    })
  }

  render() {
    return (
      <section className="section-wrap">
        <h1>React static list of posts</h1>
        {this.state.isLoaded ?
          <PostList
            posts={this.state.shownPosts}
            postItems={this.state.postItems}
            showComments={this.showComments}
            filterBy={this.filterBy}
            value={this.state.value}
          /> :
          <button
            className="btn-load"
            onClick={this.onLoad}
          >
            {this.state.isDisabled ? "Loading..." : "Load"}
          </button>
        }
      </section>
    );
  }
}

export default App;
