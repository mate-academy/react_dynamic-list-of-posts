import React from 'react';

function Content(props) {
  const list = props.list;
  let posts = props.list.posts;

  if(list.isLoaded && posts === null) {
    return <p>...loading</p>
  } else if (!list.isLoaded && posts === null) {
    return <p>not loaded</p>
  } else if (list.isLoaded && posts !== null) {
    if(props.list.value !== '') {
      posts = posts.filter(post => post.user.name.includes(props.list.value))
    }
    return posts.map(post => {
      const user = post.user;
      const comments = post.comments;
      return (
          <div className={'content'} key={post.id + post.title}>
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
                {comments.map(comment => <li key={comment.id + comment.body}>{comment.body}</li>)}
              </ul>
            </div>
          </div>
        )
      })
  }
}

export default Content;
