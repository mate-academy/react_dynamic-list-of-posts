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
    comments,
    isAddButton,
    currentPost,
    notification,
  } = useContext(MainContext);

  const isNoteOfEmpty = loadType === Load.None && !comments.length;
  const isButtonHidden = (
    notification === Error.getComments
    || loadType !== Load.None
    || !isAddButton
    || isForm
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
            : isNoteOfEmpty && <NoteEmpty />}

          <CommentsList />
          {!isButtonHidden && <AddButton />}
          {isForm && <NewCommentForm />}

        </div>
      </div>
    </div>
  );
};
