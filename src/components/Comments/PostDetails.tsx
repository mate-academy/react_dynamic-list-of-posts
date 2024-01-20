import React, { useContext } from 'react';
import classNames from 'classnames';
import { MainContext } from '../MainContext';
import { CommentsList } from './CommentsList';
import { Loader } from '../Notices/Loader/Loader';
import { Load } from '../../types/Load';
import { Notification } from '../Notices/Notification';
import { Error } from '../../types/Message';
import { NewCommentForm } from '../Form/NewCommentForm';
import { AddButton } from './AddButton';

export const PostDetails: React.FC = () => {
  const {
    isForm,
    comments,
    loadType,
    currentPost,
    notification,
  } = useContext(MainContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>
          <p data-cy="PostBody">
            {currentPost?.body}
          </p>
        </div>

        <div className="block">
          {loadType === Load.Comments && <Loader />}

          {notification === Error.getComments
            ? <Notification />
            : (
              <p
                className={classNames('title is-4',
                  { 'is-active': comments.length },
                  {
                    'is-hidden': !comments.length
                    || loadType === Load.Comments,
                  })}
                data-cy="NoCommentsMessage"
              >
                No comments yet
              </p>
            )}

          <CommentsList />
          <AddButton />
          {isForm && <NewCommentForm />}
        </div>
      </div>
    </div>
  );
};
