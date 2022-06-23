import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

type Props = {
  userId: number,
  selectedPostId: number,
  setSelectedPostId: (postId: number) => void
  setPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  userId,
  setSelectedPostId,
  selectedPostId,
  setPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(allPosts => setPosts(allPosts))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {posts && posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    setSelectedPostId(0);
                    setPost(null);
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
                    setPost(post);
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
