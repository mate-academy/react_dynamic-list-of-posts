import React from 'react';
import ButtonPosts from './components/ButtonPosts'
import PostList from './components/PostList'

import './App.css' 

class App extends React.Component {
  state = {
    currentPosts: [],
    isLoading: false,
    isLoaded: false,
    inputValue: '',
    filteredPosts: [],
  }

  getData = async () => {
    this.setState({
      isLoading: true,
    })

    const responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const responseComments = await fetch('https://jsonplaceholder.typicode.com/comments');

    const posts = await responsePosts.json();
    const users = await responseUsers.json();
    const comments = await responseComments.json();

    const postsWithUser = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => post.id === comment.postId),
    }));

    this.setState({
      currentPosts: postsWithUser,
      filteredPosts: postsWithUser,
      isLoading: false,
      isLoaded: true,
    })
  }

  searchByFilter = (e) => {
    const {value} = e.target;
    this.setState(prevState => ({
      inputValue: value,
      filteredPosts: [...prevState.currentPosts].filter(post=> post.title.includes(value) || post.body.includes(value))
      }))
  }


  render() {
    return (
      <div className='App'>
        <h1 className='site__title'>Dynamic list of posts</h1>
        {
          this.state.isLoaded
            ? <PostList 
                currentPosts={this.state.currentPosts}
                inputValue={this.state.inputValue}
                searchByFilter={this.searchByFilter}
                filteredPosts={this.state.filteredPosts}
              />
            : <ButtonPosts 
                isLoading={this.state.isLoading}
                getData={this.getData} 
              />
        }
      </div>
    )
  }
}

export default App;
