import React from 'react';
import { useAppContext } from './HooksContext';
import classNames from 'classnames';
import { CurError } from '../utils/servises';

export const PostsList: React.FC = () => {
  const { posts, activePost, setActivePost, setNewComment, errorMessage } =
    useAppContext();

  if (errorMessage !== CurError.LoadPosts) {
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
            {posts.map(curPost => {
              return (
                <tr data-cy="Post" key={curPost.id}>
                  <td data-cy="PostId">{curPost.id}</td>

                  <td data-cy="PostTitle">{curPost.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button is-link', {
                        'is-light': activePost?.id !== curPost.id,
                      })}
                      onClick={() => {
                        if (!activePost || curPost.id !== activePost.id) {
                          setActivePost(curPost);
                          setNewComment(null);
                        } else {
                          setActivePost(null);
                        }
                      }}
                    >
                      {activePost?.id !== curPost.id ? 'Open' : 'Close'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
