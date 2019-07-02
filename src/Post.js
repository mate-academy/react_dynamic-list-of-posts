import React from 'react';
import User from './User';
import Comment from './Comment'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenComments: false
        }
    }

    openComments = () => {
        return this.state.isOpenComments ?
            this.setState({ isOpenComments: false }) :
            this.setState({ isOpenComments: true })
    }
    render() {
        return (
            this.props.posts.map(post => {
                return (
                    <div className="post" key={post.id}>
                        <h4 className="post_title">{post.title}</h4>
                        <p className="post_body">{post.body}</p>
                        <User user={post.user} />
                        <button className="show_comments" onClick={() => this.openComments()}>Comments</button>
                        {this.state.isOpenComments ? <Comment comments={post.comments} /> : null}
                        
                    </div>
                )
            })
        )
    }
}

export default Post;