import React, { FC } from 'react';
import { PreparedPost } from '../interfaces/interfaces';

interface Props {
  postsList: PreparedPost[];
}

export const PostsLists: FC<Props> = (props) => {
  return (
    <ul>
      {props.postsList.map(post => (
        <li key={post.id}>
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: '20rem' }}
          >
            <div className="card-header">{post.user.username}</div>
            <div className="card-body">
              <h4 className="card-title">{post.title}</h4>
              <p className="card-text">{post.body}</p>
              <h6 className="card-title">{`Comments ${post.comments.length}`}</h6>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
