import React from 'react';
import './PostsList.scss';
import { Post } from '../../types';
import { Loader } from '../Loader';

type Props = {
  userPost: Post[],
  selectedPostId: number,
  selectPost: (postId: number) => void,
};

export const PostsList: React.FC<Props> = React.memo(({
  userPost,
  selectedPostId,
  selectPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {userPost.length
          ? (userPost.map(post => {
            return (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>
                    [User #
                    {post.userId}
                    ]: &nbsp;
                  </b>
                  {post.title}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    selectPost(selectedPostId !== post.id ? post.id : 0);
                  }}
                >
                  {selectedPostId !== post.id ? 'Open' : 'Close'}
                </button>
              </li>
            );
          })
          ) : (<Loader />)}

      </ul>
    </div>
  );
});
