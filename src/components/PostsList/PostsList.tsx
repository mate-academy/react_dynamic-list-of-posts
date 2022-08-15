import classNames from 'classnames';
import React from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  postsList: Post[];
  selectedPostId: string;
  downLoadComments: (id: string) => void;
  downloadPostDetails: (postId: string) => void;
};

export const PostsList: React.FC<Props> = ({
  postsList,
  selectedPostId,
  downLoadComments,
  downloadPostDetails,
}) => {
  // const [showPostsLoader, setShowPostsLoader] = useState(false);

  const postsListHandle = (postId: string) => {
    downLoadComments(postId);
    downloadPostDetails(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <p>{`Count posts: ${postsList.length}`}</p>
      {postsList.length > 0 || (
        <Loader />
      )}

      <ul className="PostsList__list">
        {postsList.map((post: Post) => (
          <li
            key={post.id}
            className={classNames('PostsList__item',
              { 'PostsList__item--active': (post.id === selectedPostId) })}
            data-cy="postDetails"
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.id}
              :
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => postsListHandle(post.id)}
            >
              {(selectedPostId === post.id) ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
