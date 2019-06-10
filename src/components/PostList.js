import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonText: 'Load'
    }
    this.loadPosts = this.loadPosts.bind(this)
    this.loadUrl = this.loadUrl.bind(this)
    this.searchResults = this.searchResults.bind(this)
  }

  loadUrl(url) {
    return fetch(url)
    .then(response => response.json()).then(response => response)
  }

  loadPosts() {
    this.setState({
      loaded: "not loaded",
      buttonText: "Loading..."
    });

    Promise.all([
      this.loadUrl("https://jsonplaceholder.typicode.com/posts"),
      this.loadUrl("https://jsonplaceholder.typicode.com/users"),
      this.loadUrl("https://jsonplaceholder.typicode.com/comments")
    ]).then(([posts, users, comments]) => {
        posts.map(post => {
          post.user = users.find(user => user.id === post.userId);
          post.comments = comments.filter(comment => comment.postId === post.id);
      });

      const postComponentsList = [];
      posts.forEach((post) => {
        postComponentsList.push(
          <Post key = {post.id} title = {post.title} text = {post.body}
          user = {post.user} comments = {post.comments}/>
        )
      });
      
      this.setState({
      loaded: 'loaded',
      posts: posts,
      postComponents: postComponentsList,
      forRender: postComponentsList
    })
  });
  }

  searchResults(event){
    let newList = this.state.postComponents.filter((item =>
      item.props.title.includes(event.target.value.trim()) || item.props.text.includes(event.target.value.trim())
    ));
    this.setState({
      forRender: newList
    });
  }

  render() {
    if(this.state.loaded === 'loaded') {
      return <div>
        <input type = "text" placeholder="Search..." onInput = {this.searchResults}></input>
        {this.state.forRender}
      </div>
    } 

    return (
      <div>
        <button onClick = {this.loadPosts}>{this.state.buttonText}</button>
      </div>
    );
  }
}

export default PostList;