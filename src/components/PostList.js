import React, {Component} from 'react';
import './PostList.css';
import Post from './Post';
import Search from './Search'

class PostList extends Component {
    state = {
        users: this.props.users,
        posts: this.props.posts,
        comments: this.props.comments,
        foundPosts: [],
        searchBy: ''
    };
    componentDidMount() {
        this.setState(prevState => {
            return {
                foundPosts: prevState.posts
            }
        })
    }

    search = (event) => {
        const searchBy = event.target.value;

        this.setState(prevState => {
            const foundPosts = prevState.posts.filter(todo => todo.title.includes(searchBy));
            return {
                searchBy,
                foundPosts,
            };
        });
    };

    render() {
    const {users, foundPosts, comments, searchBy} = this.state;
    const postsForRender = foundPosts.map(post => {
        const {title, body, id, userId} = post;
        return (
          <Post title={title}
                body={body}
                id={id}
                user={users[userId]}
                key={id}
                comments={comments}
          />
        );
    });
        return (
          <>
              <Search search={this.search} value={searchBy}/>
              {postsForRender}
          </>
        )
    }
}

export default PostList;
