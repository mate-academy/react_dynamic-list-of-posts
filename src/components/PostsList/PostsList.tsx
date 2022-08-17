import React from 'react';
import './PostsList.scss';

import { Post } from '../../types/Post';
import { Loader } from '../Loader';

type Props = {
  loading: boolean,
  posts: Post[],
  selectedPost: Post | null,
  setSelectedPost: (selectedPost: Post | null) => void,
  onSelectingPost: (selectedPost: Post) => void,
};

export const PostsList: React.FC<Props> = ({
  loading,
  posts,
  selectedPost,
  setSelectedPost,
  onSelectingPost,
}) => {
  return (loading
    ? (<Loader />)
    : (
      <div className="PostsList">
        <h2>Posts:</h2>

        {posts.length ? (
          <ul className="PostsList__list" data-cy="postDetails">
            {posts.map(post => (
              <li className="PostsList__item" key={post.id}>
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>

                {(selectedPost?.id !== post.id)
                  ? (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        onSelectingPost(post);
                      }}
                    >
                      Open
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        setSelectedPost(null);
                      }}
                    >
                      Close
                    </button>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            The selected user has no posts yet
          </div>
        )}
      </div>
    )
  );
};
