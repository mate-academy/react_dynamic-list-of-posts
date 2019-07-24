import React from 'react';

const Post = ({ name, email, address, title, body }) => {
  return (
    <div className="post">
      <div className="postUp">
        <div className="author">
          {name}
        </div>
        <div className="author">
          {email}
        </div>
      </div>

      <div className="postTitle">
        <h1>{title}</h1>
      </div>

      <div className="postBody">
        <p className="postText">{body}</p>
      </div>

      <div className="postFooter">
        <div className="author">
          Come and get me sucker ---
        </div>
        <div className="author">
          Here is my IRL address!!!
        </div>
        <div className="author">
          --- {address.zipcode},&nbsp;
              {address.city},&nbsp;
              {address.street} str.,&nbsp;
              {address.suite}
        </div>
      </div>
    </div>
  );
};

export default Post;
