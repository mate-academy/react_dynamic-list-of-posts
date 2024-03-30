import React, { useContext } from 'react';
import { UserListContext } from './listContext';

export const PostsList: React.FC = () => {
  const {
    post,
    setDetail,
    detail,
    selectedPostId,
    setSelectedPostId,
    setIsLoaderDetails,
  } = useContext(UserListContext);

  const handlePostClick = (postId: number) => {
    setIsLoaderDetails(true);
    if (postId === selectedPostId && detail) {
      setSelectedPostId(null);
      setDetail(false);
    } else {
      setSelectedPostId(postId);
      setDetail(true);
    }

    setTimeout(() => {
      setIsLoaderDetails(false);
    }, 800);
  };

  return (
    <div data-cy="PostsList">
      {post.length > 0 && <p className="title">Posts:</p>}
      {post.length > 0 && (
        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {post.map(po => (
              <tr key={po.id} data-cy="Post">
                <td data-cy="PostId">{po.id}</td>
                <td data-cy="PostTitle">{po.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button is-link ${
                      po.id === selectedPostId && detail ? '' : 'is-light'
                    }`}
                    onClick={() => handlePostClick(po.id)}
                  >
                    {detail && po.id === selectedPostId ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}

            {/* <tr data-cy="Post">
            <td data-cy="PostId">{id}</td>

            <td data-cy="PostTitle">
              voluptate et itaque vero tempora molestiae
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
              >
                Close
              </button>
            </td>
          </tr>

          <tr data-cy="Post">
            <td data-cy="PostId">19</td>
            <td data-cy="PostTitle">
              adipisci placeat illum aut reiciendis qui
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr> */}

            {/* <tr data-cy="Post">
            <td data-cy="PostId">20</td>
            <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
              >
                Open
              </button>
            </td>
          </tr> */}
          </tbody>
        </table>
      )}
    </div>
  );
};
