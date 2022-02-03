import React from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

type Props = {
  posts: Post[],
  loading: boolean,
  setSelectedPostId: (selectedPostId: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPostId, selectedPostId,
  loading,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {loading ? (
        <ul className="PostsList__list">
          {posts.map((post: Post) => (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>
                  {`[User #${post.userId}]:`}
                </b>
                {post.title}
              </div>
              {selectedPostId !== post.id && (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    setSelectedPostId(post.id);
                  }}
                >
                  Open
                </button>
              )}
              {selectedPostId === post.id && (
                <button
                  type="button"
                  className="PostsList__button button"
                  disabled
                >
                  Close
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
};
