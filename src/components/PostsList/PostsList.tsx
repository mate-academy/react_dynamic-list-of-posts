import React from 'react';
import './PostsList.scss';
import { Post } from '../../Types/Post';

type Props = {
  posts: Post[];
  selectedPost: number;
  selectedPostId: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  selectedPostId,
}) => {
  const selectPost = (postId: number) => (selectedPost === postId
    ? selectedPostId(0)
    : selectedPostId(postId));

  return (
    <div className="PostsList">
      {posts.length ? (
        <>
          <h2>Posts:</h2>
          <ul className="PostsList__list">
            {posts.map(post => (
              <li key={post.id} className="PostsList__item">
                <div>
                  <b>
                    {`[User #${post.userId}]:`}
                  </b>
                  {post.title}
                </div>
                <button
                  onClick={() => selectPost(post.id)}
                  type="button"
                  className={selectedPost === post.id
                    ? 'PostsList__button button button--selected'
                    : 'PostsList__button button'}
                >
                  {selectedPost === post.id ? 'Close' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : <h2>No posts.</h2>}
    </div>
  );
};
