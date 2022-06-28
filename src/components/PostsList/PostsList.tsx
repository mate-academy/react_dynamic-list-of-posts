import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getPosts } from '../../api/posts';

type Props = {
  userPosts: number;
  onAdd: (id: number) => void;
  onRemove: () => void;
};

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

export const PostsList: React.FC <Props> = ({ userPosts, onAdd, onRemove }) => {
  const [posts, setPosts] = useState<Post []>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(postsFromServer => {
        if (userPosts === 0) {
          setPosts(postsFromServer);
        } else {
          const thePosts = postsFromServer.filter((post: Post) => {
            return post.userId === userPosts;
          });

          setPosts(thePosts);
        }
      });
  }, [userPosts]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul
        className="PostsList__list"
        data-cy="postDetails"
      >
        {posts.map((post => (
          <li className="PostsList__item">
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button--opened button"
                onClick={() => {
                  setSelectedPostId(0);
                  onRemove();
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  onAdd(post.id);
                  setSelectedPostId(post.id);
                }}
              >
                Open
              </button>
            )}
          </li>
        )))}
      </ul>
    </div>
  );
};

// <li className="PostsList__item">
//       <div>
//         <b>[User #1]: </b>
//         sunt aut facere repellat provident occaecati excepturi optio
//       </div>
//       <button
//         type="button"
//         className="PostsList__button button"
//       >
//         Close
//       </button>
//     </li>

//     <li className="PostsList__item">
//       <div>
//         <b>[User #2]: </b>
//         et ea vero quia laudantium autem
//       </div>

//       <button
//         type="button"
//         className="PostsList__button button"
//       >
//         Open
//       </button>
//     </li>
