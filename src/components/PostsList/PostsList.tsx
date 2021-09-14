import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  openPost: boolean,
  setPostId: any,
  postSwitch: any,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  setPostId,
  openPost,
  postSwitch,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => {
          const condition = openPost && selectedPostId === post.id;

          return (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>
                  {`[User #${post.userId}]: `}
                </b>
                {post.title}
              </div>

              <button
                type="button"
                className={classNames('button', { button__selected: condition })}
                onClick={() => {
                  setPostId(post.id);
                  postSwitch(condition ? !openPost : true);
                }}
              >
                {condition ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
