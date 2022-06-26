import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

type Props = {
  userSelect: number;
  setSelectedPostId: (postId: number) => void;
  selectedPostId: number;
  setPostDetails: (post: Post | null) => void
};

export const PostsList: React.FC<Props> = ({
  userSelect,
  setSelectedPostId,
  selectedPostId,
  setPostDetails,
}) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getUserPosts(userSelect)
      .then(result => setPosts(result))
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  }, [userSelect]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts && posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    setSelectedPostId(0);
                    setPostDetails(null);
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
                    setSelectedPostId(post.id);
                    setPostDetails(post);
                  }}
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
