import React from 'react';

const Comments = ({ post }) => (

  <div className="Comments">
    <h4>Comments</h4>
    {post.comments.map(comment => (
      <div className="CommentItem" key={comment.id}>
        <div className="AuthorContact">
          <p>
            Author name: {comment.name}
          </p>
          <p>
            E-maill: {comment.email}
          </p>
        </div>
        <p>
          <b>Text:</b> {comment.body}
        </p>
      </div>
    ))}

  </div>
);

export default Comments;
