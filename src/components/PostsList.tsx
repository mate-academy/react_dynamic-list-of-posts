import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import * as postService from '../api/posts';

type Props = {
  userId: number | undefined;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setLoadingPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  userId,
  posts,
  setPosts,
  setLoadingPosts,
}) => {
  useEffect(() => {
    if (userId !== undefined) {
      setLoadingPosts(true);

      postService
        .getPosts({ id: userId })
        .then(fetchedPosts => {
          setPosts(fetchedPosts);
          setLoadingPosts(false);
        })
        .catch(() => {
          setLoadingPosts(false);
        });
    }
  }, [userId, setPosts, setLoadingPosts]);

  return (
    <div data-cy="PostsList">
      {posts.length > 0 && (
        <>
          <p className="title">Posts:</p>
          <table
            className="
              table
              is-fullwidth
              is-striped
              is-hoverable
              is-narrow"
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {posts.map(post => (
                <tr data-cy="Post" key={post.id}>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">{post.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                    >
                      Close/Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
