import React from 'react';
import './PostsList.scss';

interface PostsListProps {
  posts: Post[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  // const [userPosts, setUserPosts] = useState<Post[] | null>([]);
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts?.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>
                  {`[User #${post.userId}]:`}
                </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
              >
                Open
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
