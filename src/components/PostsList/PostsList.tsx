import React, { useState } from 'react';
import './PostsList.scss';

type Props = {
  posts: Posts[],
  setSeletedPostId: React.Dispatch<React.SetStateAction<number | undefined>>
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSeletedPostId,
}) => {
  const [postId, setPostId] = useState(0);

  return (
    <>
      {posts
        && (
          <div className="PostsList">
            <h2>Posts:</h2>
            <ul
              data-cy="postDetails"
              className="PostsList__list"
            >
              {posts.map(post => (
                <li
                  key={post.id}
                  className="PostsList__item"
                >
                  <div>
                    <b>{`[User #${post.userId}]:`}</b>
                    {post.title}
                  </div>

                  {postId === post.id
                    ? (
                      <button
                        type="button"
                        className="PostsList__button button"
                        onClick={() => {
                          setSeletedPostId(0);
                          setPostId(0);
                        }}
                      >
                        Close
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        className="PostsList__button button"
                        onClick={() => {
                          setSeletedPostId(post.id);
                          setPostId(post.id);
                        }}
                      >
                        Open
                      </button>
                    )}

                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
};
