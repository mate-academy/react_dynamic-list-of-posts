import React from 'react';
import PropTypes from 'prop-types';

import Post from '../post/Post';
import Filter from '../filter/Filter';

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsList: [],
      typeOfFilter: 'standart',
      filterValue: '',
    }
  }

  componentDidMount() {
    this.setState({ postsList: this.createDonePostList() })
  }

  createDonePostList = () => {
    const { posts, users, comments } = this.props;

    return posts.map((post) => {
      return {
        ...post,
        user: users.find(user => post.userId === user.id),
        comments: comments.filter(currentComments => currentComments.postId === post.id)
      }
    });
  }

  filteredPost = () => {
    const { postsList, typeOfFilter } = this.state;
    const sortList = [...postsList];
    if (typeOfFilter === 'name') {
      return sortList.sort((a, b) => a.user.name.localeCompare(b.user.name));
    } else if (typeOfFilter === 'title') {
      return sortList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (typeOfFilter === 'text') {
      return sortList.sort((a, b) => a.body.localeCompare(b.body));
    } else {
      return sortList;
    }
  }

  activeFilter = (type) => {
    this.setState(prev => {
      return {
        ...prev,
        typeOfFilter: type,
      }
    })
  }

  editFilter = (event) => {
    this.setState({ filterValue: event.target.value })
  }

  render() {
    const { filterValue } = this.state;
    return (
      <>
        <div className="filter">
          <Filter activeFilter={this.activeFilter}/>
          <input type="text" placeholder="Write filter text" value={this.state.filterValue} onChange={this.editFilter} />
        </div>
        <div className="postsEnvironment">
          {
            this.filteredPost()
              .filter(post => {
                if (post.body.includes(filterValue) || post.title.includes(filterValue)) {
                  return post;
                }
              })
              .map(post => (
              <Post
                post={post}
                key={post.id}
              />
            ))
          }
        </div>
      </>
    )
  }
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostsList;
