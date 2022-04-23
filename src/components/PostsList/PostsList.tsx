import React from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  posts: Post[];
  postId: number;
  isLoadPost: boolean;
  changePostId: (post: Post, id: number) => void;
  changeIsClicked: (v: boolean) => void;
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  postId,
  isLoadPost: load,
  changePostId,
  changeIsClicked,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <>
        {posts.length > 0 ? (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    changePostId(post, post.id);
                    changeIsClicked(true);
                  }}
                >
                  {postId === post.id ? 'Closed' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            {load ? <Loader /> : <h3>User has no posts</h3>}
          </>
        )}
      </>
    </div>
  );
});
