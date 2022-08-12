import { useState } from 'react';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  setShowDetails: React.Dispatch<React.SetStateAction<number | null>>
  showDetails: number | null;
};

export const PostItem: React.FC<Props> = (
  {
    post, setShowDetails, showDetails,
  },
) => {
  const [button, setButton] = useState(true);

  return (
    <li className="PostsList__item">
      <div>
        <b>{`[User #${post.userId}]: `}</b>
        {post.title}
      </div>
      <button
        type="button"
        className={`PostsList__button button ${showDetails !== null && showDetails === post.id ? 'red' : ''}`}
        onClick={() => {
          if (showDetails !== null && showDetails === post.id) {
            setShowDetails(null);
          } else {
            setShowDetails(post.id);
          }

          setButton(prev => !prev);
        }}
        disabled={showDetails !== null && showDetails !== post.id}
      >
        {button ? 'Open' : 'Close'}
      </button>
    </li>
  );
};
