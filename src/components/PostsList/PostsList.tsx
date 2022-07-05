import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

interface Props {
  posts: Post[],
  getChangePost: (postId: number) => void,
  selectedPostId: number,
}

export const PostsList: React.FC<Props> = ({
  posts,
  getChangePost,
  selectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list" data-cy="postDetails">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              {'User '}
              {post.userId}
              {': '}
            </b>
            {post.title}
          </div>
          {
            selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button PostsList__button--open button"
                  onClick={() => getChangePost(post.id)}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => getChangePost(post.id)}
                >
                  Open
                </button>
              )
          }
        </li>
      ))}
    </ul>
  </div>
);
