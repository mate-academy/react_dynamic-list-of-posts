import React, { useEffect, useState } from 'react';
// import classNames from 'classnames';
import { getPostsByUserId } from '../api/posts';
import { Post } from '../types/Post';
import { Loader } from './Loader';

type PropsTypes = {
  userId: number;
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null
};

export const PostsList: React.FC<PropsTypes> = ({
  userId,
  selectedPost,
  setSelectedPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isReceiving, setIsReceiving] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsReceiving(true);
    getPostsByUserId(userId)
      .then(receivedPosts => {
        setPosts(receivedPosts);
        setIsReceiving(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsReceiving(false);
      });
  }, [userId]);

  if (isReceiving) {
    return <Loader />;
  }

  if (!posts.length) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
        No posts yet
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  const handleClick = (value: Post | null) => {
    setSelectedPost(value);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const isSelected = post === selectedPost;

            return (
              <tr data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  {
                    isSelected
                      ? (
                        <button
                          type="button"
                          data-cy="PostButton"
                          className="button is-link"
                          onClick={() => handleClick(null)}
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          type="button"
                          data-cy="PostButton"
                          className="button is-link is-light"
                          onClick={() => {
                            handleClick(post);
                          }}
                        >
                          Open
                        </button>
                      )
                  }
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};
