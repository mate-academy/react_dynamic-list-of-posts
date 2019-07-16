import React from 'react';
import './App.css';
import PostList from './components/PostList';
import { getPostsWithUsers } from './components/loadingData';

class App extends React.Component {
  state = {
    isLoadButtonVisible: true,
    textOfLoadButton: 'Load',
    postsWhithUser: [],
    filter: [],
    searchInput: '',
  }

  handleClick = (event) => {
    const loadButton = event.target;

    this.setState({
      textOfLoadButton: 'Loading...',
    });

    loadButton.disabled = this.state.textOfLoadButton === 'Loading...';

    getPostsWithUsers().then((data) => {
      this.setState({
        postsWhithUser: [...data],
        filter: [...data],
        isLoadButtonVisible: false,
      });
    });
  }

  filtredBy = (event) => {
    event.preventDefault();
    const { searchBy } = event.target;
    const value = this.state.searchInput;

    if (value !== '') {
      let byField = '';
      let filtrField;

      for (let i = 0; i < 2; i += 1) {
        if (searchBy[i].checked) {
          byField += searchBy[i].value;
        }
      }

      switch (byField) {
        case 'body':
          filtrField = post => post.body.includes(value);
          break;
        case 'titlebody':
          filtrField = post => post.title.includes(value) || post.body.includes(value);
          break;
        default:
          filtrField = post => post.title.includes(value);
      }

      const newFilter = this.state.postsWhithUser.filter(filtrField);

      this.setState({
        filter: [...newFilter],
      });
    } else {
      this.setState(prevState => ({ filter: [...prevState.postsWhithUser] }));
    }
  }

  filterBlur = (event) => {
    const { value } = event.target.value;

    if (value === '') {
      this.setState(prevState => ({ filter: [...prevState.postsWhithUser] }));
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { isLoadButtonVisible, filter, textOfLoadButton, searchInput } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {
          (isLoadButtonVisible)
            ? (
              <button
                type="button"
                className="load-button"
                onClick={this.handleClick}
              >
                {textOfLoadButton}
              </button>
            )
            : (
              <div>
                <form
                  className="search-form"
                  name="searchForm"
                  action=""
                  onSubmit={this.filtredBy}
                >
                  <input
                    className="search-form__input"
                    name="searchInput"
                    value={searchInput}
                    type="search"
                    onBlur={this.filterBlur}
                    onChange={this.handleChange}
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

                <PostList posts={filter} />
              </div>
            )
        }
      </div>
    );
  }
}

export default App;
