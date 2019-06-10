import React from 'react';
import './PostList.css';
import Post from './Post'



function PostList(props) {
    const {users, posts, comments} = props;
    return posts.map(item => {
        const {title, body, id, userId} = item;
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
}

export default PostList;