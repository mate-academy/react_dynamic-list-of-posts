import React from 'react';
import classNames from 'classnames';
import { Pos } from '../../types/pos';
import './PostsList.scss';

interface Props {
  posts: Pos[],
  setPost: (arg0:string) => void,
  selectedPost: string,
}

export const PostsList: React.FC<Props>
= ({ posts, setPost, selectedPost }) => {
  const postClickHandler = (postId:string) => (
    (postId === selectedPost)
      ? setPost('')
      : setPost(postId)
  );

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map((onePost:Pos) => (
          <li className="PostsList__item" key={onePost.id}>
            <div>
              <b>
                [User #
                {onePost.userId}
                ]:&#160;
              </b>
              {onePost.title}
            </div>
            <button
              type="button"
              className={classNames('PostsList__button', 'button',
                { 'special-close': selectedPost === onePost.id })}
              onClick={() => postClickHandler(onePost.id)}
            >
              {(selectedPost !== onePost.id
                ? 'Open'
                : 'Close'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
