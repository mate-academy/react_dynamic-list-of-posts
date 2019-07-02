import React from 'react';
import { getPosts, getUsers, getComments } from './postService';
import Post from './Post'

class PostList extends React.Component {

    state = {
        posts: [],
        isLoad: false
    }

    async componentDidMount() {
        const [posts, users, comments] = await Promise.all([getPosts(), getUsers(), getComments()]);

        let postWithUser = posts.map(post => {
            return {
                ...post,
                user: users.find((user) => user.id === post.userId),
                comments: comments.filter((comment) => post.id === comment.postId)
            }
        })

        this.setState({
            posts: postWithUser,
            isLoad: true,
        })

    }

    render() {
        return (
            <div className="post_list">
                <h1 className="main_title">POST - LIST</h1>
                {this.state.isLoad ? <Post posts={this.state.posts} /> : "Loading..."}
            </div>
        )
    }
}

export default PostList;