import React from 'react';
import ButtonPosts from './components/ButtonPosts'
import PostList from './components/PostList'
import './App.css' 

import { getPosts, getUsers, getComments} from './api/data'

const getData = async () => {
  const posts = await getPosts();
  const users = await getUsers();
  const comments = await getComments();

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => post.id === comment.postId),
  }));
}

class App extends React.Component {
  state = {
    currentPosts: [],
    isLoading: false,
    isLoaded: false,
  }

  loadData = async () => {
    this.setState({
      isLoading: true,
    })   

    const posts = await getData();

    this.setState({ 
      currentPosts: posts,
      isLoading: false,
      isLoaded: true, 
    });
  }

  render() {
    const { currentPosts, isLoading, isLoaded } = this.state;
    return (
      <div className='App'>
        <h1 className='site__title'>Dynamic list of posts</h1>
        {
          isLoaded
            ? <PostList 
                currentPosts={currentPosts}
              />
            : <ButtonPosts 
                isLoading={isLoading}
                getData={this.loadData} 
              />
        }
      </div>
    )
  }
}

export default App;
