import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import { getComment } from '../utils/servicesPost';
import { Comment } from '../types/Comment';
import { CommentsState } from '../types/CommentState';
import { OpenState } from '../App';

type Props = {
  posts: Post[];
  setComments: Dispatch<SetStateAction<CommentsState>>;
  setOpenOrCloseMenu: Dispatch<SetStateAction<boolean>>;
  setOpenMenu: Dispatch<any>;
  openMenu: OpenState;
  setLoadingComments: Dispatch<SetStateAction<boolean>>;
  setErrorComments: Dispatch<SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setComments,
  setOpenOrCloseMenu,
  setOpenMenu,
  openMenu,
  setLoadingComments,
  setErrorComments,
}) => {
  const handlerOpenMenu = (postId: number) => {
    const postIdString = postId.toString();

    if (openMenu.postId === postId) {
      // Close the current open menu
      setOpenMenu({ postId: null });
      setComments(prevState => ({
        ...prevState,
        [postIdString]: null,
      }));

      setOpenOrCloseMenu(false);
    } else {
      setLoadingComments(true);

      getComment(postId)
        .then((result: Comment[]) => {
          setComments(prevState => ({
            ...prevState,
            [postIdString]: result,
          }));
          setOpenMenu({ postId });
          setOpenOrCloseMenu(true);
        })
        .catch(() => {
          setErrorComments(true);
        })
        .finally(() => {
          setLoadingComments(false);
          setErrorComments(false);
        });
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': openMenu.postId !== post.id,
                  })}
                  onClick={() => handlerOpenMenu(post.id)}
                >
                  {openMenu.postId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}

          {/* <tr data-cy="Post">
          <td data-cy="PostId">18</td>

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
          <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
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
    </div>
  );
};
