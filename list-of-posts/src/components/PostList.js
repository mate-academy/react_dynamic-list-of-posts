import React from 'react';
import Post from "./Post";

function PostList(props) {
  const postList = props.list.map(element => {
    return (
      <Post key={element.id}
            title={element.title}
            text={element.body}
            userList={props.users}
            userId={element.userId}
            comments={props.comments}
            post={element.id}/>
    );
  });
  return (
    <ul>
      {postList}
    </ul>
  );
}

export default PostList;
