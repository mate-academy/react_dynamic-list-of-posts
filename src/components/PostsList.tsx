import React from 'react';
import { Post } from '../types/Post';

interface Props {
  userPosts: Post[],
  selectedPost: Post | undefined,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | undefined>>,
  setCreateNewComment: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedPost,
  setSelectedPost = () => {},
  setCreateNewComment = () => {},
}) => {
  const selectPost = (post: Post) => {
    setSelectedPost(post);
    setCreateNewComment(false);
  };

  const resetSelectedPost = () => {
    setSelectedPost(undefined);
    setCreateNewComment(false);
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
          {
            userPosts.map(post => {
              const { id, title } = post;

              return (
                <tr data-cy="Post" key={id}>
                  <td data-cy="PostId">{id}</td>

                  <td data-cy="PostTitle">
                    {title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    {
                      selectedPost && selectedPost.id === id
                        ? (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link is-blue"
                            onClick={resetSelectedPost}
                          >
                            Close
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-cy="PostButton"
                            className="button is-link is-light"
                            onClick={() => selectPost(post)}
                          >
                            Open
                          </button>
                        )
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};
