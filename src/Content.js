import React from 'react';

function Content(props) {
  const posts = props.list.posts;
  console.log(posts)
  if(props.list.isLoaded && props.list.posts === null) {
    return <p>...loading</p>
  } else if (!props.list.isLoaded && props.list.posts === null) {
    return <p>not load</p>
  } else if (props.list.isLoaded && props.list.posts !== null) {
    return posts.map(post => {
      const user = post.user;
      const comments = post.comments;
      return (
          <div className={'content'} key={post.id}>
            <div>
              <p>Name: {user.name}</p>
              <p>email: {user.email}</p>
              <p>address: {user.address.city} {user.address.street}</p>
            </div>
            <div>
            <p>{post.title}</p>
            <p>{post.body}</p>
            </div>
            <div>
              <ul>
                {comments.map(comment => <li>{comment.body}</li>)}
              </ul>
            </div>
          </div>
        )
      })
  }
}

export default Content;
