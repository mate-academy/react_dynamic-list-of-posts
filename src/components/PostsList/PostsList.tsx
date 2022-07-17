import React from 'react';
import './PostsList.scss';

interface PostsListProps {
  posts: Post[] | null;
  selectedPostId: number;
  onPostSelect: (postId: number) => void;
}

export const PostsList: React.FC<PostsListProps> = (
  { posts, selectedPostId, onPostSelect },
) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {
          posts?.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>
                  {`[User #${post.userId}]:`}
                </b>
                {post.title}
              </div>
              {
                selectedPostId === post.id
                  ? (
                    <button
                      type="button"
                      className="PostsList__button button"
                      onClick={() => {
                        onPostSelect(0);
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
                        onPostSelect(post.id);
                      }}
                    >
                      Open
                    </button>
                  )
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
};
