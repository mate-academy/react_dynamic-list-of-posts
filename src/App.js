import React from 'react';
import './App.css';
import PostList from './components/PostList';
import { getPostsWithUsers } from './components/loadingData';

class App extends React.Component {
  state = {
    renderButton: true,
    postsWhithUser: [],
    filter: [],
  }

  handleClick = () => {
    const loadButton = document.querySelector('.load-button');
    loadButton.disabled = true;
    loadButton.textContent = 'Loading...';

    getPostsWithUsers('https://jsonplaceholder.typicode.com/').then((data) => {
      this.setState({
        postsWhithUser: [...data],
        filter: [...data],
        renderButton: false,
      });
    });
  }

  filtredBy = () => {
    const searchForm = document.searchForm.elements;
    const userValue = searchForm.searchInput.value;

    if (userValue !== '') {
      let byField = '';
      let filtrField;

      for (let i = 0; i < 2; i++) {
        if (searchForm.searchBy[i].checked) {
          byField += searchForm.searchBy[i].value;
        }
      }

      switch (byField) {
        case 'body':
          filtrField = (post) => { post.body.includes(userValue); };
          break;
        case 'titlebody':
          filtrField = (post) => {
            post.title.includes(userValue) || post.body.includes(userValue);
          };
          break;
        default:
          filtrField = (post) => { post.title.includes(userValue) };
      }

      const newFilter = this.state.postsWhithUser.filter(post => filtrField(post));

      this.setState({
        filter: [...newFilter],
      });
    } else {
      this.setState((prevState) => { 
        return {filter: [...prevState.postsWhithUser],};
      });
    }
  }

  filterBlur = () => {
    const searchForm = document.searchForm.elements;
    const userValue = searchForm.searchInput.value;

    if (userValue === '') {
      this.setState((prevState) => {
        return {filter: [...prevState.postsWhithUser]};
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {
          (this.state.renderButton)
            ? (
              <button
                className="load-button"
                onClick={this.handleClick}
              >
                Load
              </button>
            )
            : (
              <div>
                <form 
                  className="search-form"
                  name="searchForm" 
                  action="" 
                  onSubmit={event => event.preventDefault()}
                >
                  <input
                    className="search-form__input"
                    name="searchInput"
                    type="search"
                    onKeyUp={(event) => {if (event.keyCode === 13) this.filtredBy()}}
                    onBlur={this.filterBlur}
                  />

                  <button onClick={this.filtredBy}>Search</button>

                  <br />

                  <label forHTML="checkTitle"> 
                    <input 
                      name="searchBy" 
                      type="checkbox" 
                      value="title" 
                      defaultChecked="true" 
                      id="checkTitle" 
                    /> 
                    by post title
                  </label>

                  <label forHTML="checkBody">
                    <input 
                      name="searchBy"
                      type="checkbox"
                      value="body"
                      id="checkBody"
                    /> 
                    by post text
                  </label>
                </form>

                <PostList posts={this.state.filter} />
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
