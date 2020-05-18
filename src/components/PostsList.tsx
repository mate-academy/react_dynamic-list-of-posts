import React from 'react';
import { Post } from './interfaces';

interface Props {
  posts: Post[];
}

export const PostsList: React.FC<Props> = ({ posts }) => (
  <>
    {posts.map(post => (
      <div className="post" key={post.id}>
        <p className="post__title">
          <span className="post__id">
            {post.id}
              .
            </span>
          {post.title}
        </p>
        <p className="post__body">
          {post.body}
        </p>
        {post.comments.map(comment => (
          <div className="post__comm" key={comment.id}>
            <div className="comm">
              <p className="comm__name">
                {comment.name}
              </p>
              <p className="comm__email">
                {comment.email}
              </p>
              <p className="comm__body">
                {comment.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);

