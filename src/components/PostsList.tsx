import React, { useContext } from 'react';
import classNames from 'classnames';

// Types

import { Post } from '../types/Post';

import { Context } from './Context';

// Api

import { getComments } from '../api';

type Props = {
  postList: Post[] | undefined
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  selectedPost: Post | null
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
};

export const PostsList: React.FC<Props> = ({
  postList,
  setSelectedPost,
  selectedPost,
  setOpenForm,
}) => {
  const { setCommentList, setCommentListError } = useContext(Context);

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
          {postList && postList.map((post) => {
            const { id, title } = post;

            const openInfoOfPost = () => {
              setSelectedPost(post);
              setOpenForm(false);

              if ((selectedPost && selectedPost.id === id)) {
                setSelectedPost(null);

                return;
              }

              setCommentList(undefined);

              getComments(id)
                .then((Comments) => {
                  setCommentList(Comments);
                  setCommentListError(false);
                })
                .catch(() => {
                  setCommentList([]);
                  setCommentListError(true);
                });
            };

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      { 'is-light': !(selectedPost && selectedPost.id === id) },
                    )}
                    onClick={openInfoOfPost}
                  >
                    {(selectedPost
                      && (selectedPost.id === id) ? 'Close' : 'Open')}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
