import React from 'react';
import { Post } from './interfaces';

interface Props {
  posts: Post[];
}

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
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
          {post.comments.map(comm => (
            <div className="post__comm" key={comm.id}>
              <div className="comm">
                <p className="comm__name">
                  {comm.name}
                </p>
                <p className="comm__email">
                  {comm.email}
                </p>
                <p className="comm__body">
                  {comm.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
