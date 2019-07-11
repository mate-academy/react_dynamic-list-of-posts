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

    getPostsWithUsers().then((data) => {
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

      for (let i = 0; i < 2; i += 1) {
        if (searchForm.searchBy[i].checked) {
          byField += searchForm.searchBy[i].value;
        }
      }

      switch (byField) {
        case 'body':
          filtrField = post => post.body.includes(userValue);
          break;
        case 'titlebody':
          filtrField = post => post.title.includes(userValue) || post.body.includes(userValue);
          break;
        default:
          filtrField = post => post.title.includes(userValue);
      }

      const newFilter = this.state.postsWhithUser.filter(filtrField);
      this.setState({
        filter: [...newFilter],
      });
    } else {
      this.setState(prevState => ({ filter: [...prevState.postsWhithUser] }));
    }
  }

  filterBlur = () => {
    const searchForm = document.searchForm.elements;
    const userValue = searchForm.searchInput.value;

    if (userValue === '') {
      this.setState(prevState => ({ filter: [...prevState.postsWhithUser] }));
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
                type="button"
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
                  onSubmit={(event) => { event.preventDefault(); this.filtredBy(); }}
                >
                  <input
                    className="search-form__input"
                    name="searchInput"
                    type="search"
                    onBlur={this.filterBlur}
                  />

                  <button
                    type="submit"
                  >
                    Search
                  </button>

                  <br />

                  <label htmlFor="checkTitle">
                    <input
                      name="searchBy"
                      type="checkbox"
                      value="title"
                      defaultChecked="true"
                      id="checkTitle"
                    />
                    by post title
                  </label>

                  <label htmlFor="checkBody">
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
