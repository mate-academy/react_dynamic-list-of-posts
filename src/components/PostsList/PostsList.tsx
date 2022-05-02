import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  setSelectedPostId: (arg0: number) => void;
  selectedPostId: number | undefined;
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, setSelectedPostId, selectedPostId } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 ? (posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            {
              selectedPostId !== post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      setSelectedPostId(post.id);
                    }}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      setSelectedPostId(0);
                    }}
                  >
                    Close
                  </button>
                )
            }

          </li>
        ))) : 'No posts yet'}

      </ul>
    </div>
  );
};
