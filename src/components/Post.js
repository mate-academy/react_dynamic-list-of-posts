import React from 'react';

function Post(props) {
  return (
    <div className='posts'>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  );
}

export default Post;
