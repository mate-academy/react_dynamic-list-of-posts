import React from 'react';
import ButtonPosts from './components/ButtonPosts'
import PostList from './components/PostList'
import LoadData from './components/FetchData'

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

    const postsWithUser = await LoadData();

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
      filteredPosts: prevState.currentPosts
      .filter(post => (post.title + post.body)
      .includes(value))
      }))
  }


  render() {
    const {isLoaded, 
      currentPosts,
      inputValue,
      filteredPosts,
      isLoading,
      } = this.state;
      
    return (
      <div className='App'>
        <h1 className='site__title'>Dynamic list of posts</h1>
        {
          isLoaded
            ? <PostList 
                currentPosts={currentPosts}
                inputValue={inputValue}
                searchByFilter={this.searchByFilter}
                filteredPosts={filteredPosts}
              />
            : <ButtonPosts 
                isLoading={isLoading}
                getData={this.getData} 
              />
        }
      </div>
    )
  }
}

export default App;
