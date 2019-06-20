import React from 'react';
import './App.css';
import PostList from "./PostList.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 0,
      posts: [],
      users: [],
	comments: [],
	query: "",
    }
  }
  
  loadUrl(url) {
    return fetch(url)
      .then(res => res.json())
  }
  
  loadContent() {
    Promise.all([
      this.loadUrl('https://jsonplaceholder.typicode.com/posts'),
      this.loadUrl('https://jsonplaceholder.typicode.com/users'),
      this.loadUrl('https://jsonplaceholder.typicode.com/comments')
    ]).then( ([posts, users, comments]) => {
      this.setState({
        buttonState: 2,
        posts: posts,
        users: users,
	comments: comments
      });
    });
	
    this.setState({buttonState: 1});
  }
  
  handleChange(event) {
    this.setState({query: event.target.value});
  }
  
  getQueryed() {
    return this.state.posts.filter((value) => {
      if(value.title.indexOf(this.state.query.trim()) > -1 || value.body.indexOf(this.state.query.trim()) > -1) {
        return true;
      }
      return false;
    });
  }
  
  render() {
    switch(this.state.buttonState) {
      case 0: {
        return ( <button onClick={this.loadContent.bind(this)}> Load </button>);
      }
    
      case 1: {
        return ( <button disabled> Loading... </button>);
      }
    
      case 2: {
        return (
			<>
				<input type="text" placeholder="search..." onChange={this.handleChange.bind(this)} />
				<PostList posts={this.getQueryed()} users={this.state.users} comments={this.state.comments}/>
			</>
		)
	  }
    }
  }
}

export default App;
