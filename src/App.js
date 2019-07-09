import React from 'react';
import ButtonPosts from './components/ButtonPosts'
import PostList from './components/PostList'

class App extends React.Component {
  state = {
    currentPosts: [],
    isLoading: false,
    isLoaded: false,
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
      isLoading: false,
      isLoaded: true,
    })
  }


  render() {
    return (
      <div>
        {
          this.state.isLoaded
            ? <PostList 
                currentPosts={this.state.currentPosts}
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
