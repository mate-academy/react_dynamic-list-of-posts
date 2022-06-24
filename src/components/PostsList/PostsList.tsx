import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Props {
  idOfUser: number;
  selectedPostId: number;
  setSelectedPostId: (arg: number) => void;
  setPost: (arg: Post | null) => void;
}

export const PostsList: React.FC<Props>
  = ({
    idOfUser,
    selectedPostId,
    setSelectedPostId,
    setPost,
  }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = async (userId: number) => {
      try {
        const postsFromS = await getUserPosts(userId);

        setPosts(postsFromS);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error, 'Request failed');
      }
    };

    useEffect(() => {
      getPosts(idOfUser);
    }, [idOfUser]);

    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul
          className="PostsList__list"
          data-cy="postDetails"
        >
          {posts && (posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
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
          )))}
        </ul>
      </div>
    );
  };
