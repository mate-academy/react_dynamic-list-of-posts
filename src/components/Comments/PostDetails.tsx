import React, { useContext } from 'react';
import { MainContext } from '../MainContext';
import { CommentsList } from './CommentsList';
import { Loader } from '../Notices/Loader/Loader';
import { Load } from '../../types/Load';
import { Notification } from '../Notices/Notification';
import { Error } from '../../types/Message';
import { NewCommentForm } from '../Form/NewCommentForm';
import { AddButton } from './AddButton';
import { NoteEmpty } from './NoteEmpty';

export const PostDetails: React.FC = () => {
  const {
    isForm,
    loadType,
    isAddButton,
    currentPost,
    notification,
  } = useContext(MainContext);

  const isButtonActive = (
    !(notification === Error.getComments)
    || isAddButton
    || !isForm
  );

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
            : loadType === Load.None && <NoteEmpty />}

          <CommentsList />
          {isButtonActive && <AddButton />}
          {isForm && <NewCommentForm />}
        </div>
      </div>
    </div>
  );
};
