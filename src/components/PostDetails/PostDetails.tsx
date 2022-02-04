import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import {
  addComment, deleteComment, getPostComments, getPostDetails,
} from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDedails] = useState({} as Post);
  const [comments, setComments] = useState([] as Comment[]);
  const [isHidden, setHidden] = useState(false);

  const loadData = async () => {
    if (selectedPostId !== 0) {
      const [postFromServer, commentsFromServer] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      setPostDedails(postFromServer);
      setComments(commentsFromServer);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedPostId]);

  const handleVisabiliti = () => {
    setHidden(!isHidden);
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment(commentId);
    loadData();
  };

  const handleAdd = async (comment: NewComment) => {
    await addComment(comment);

    loadData();
  };

  return (
    <div className="PostDetails">
      {selectedPostId !== 0
        ? (
          <>
            <h2>Post details:</h2>
            <section className="PostDetails__post">
              <p>{postDetails.title}</p>
            </section>
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={handleVisabiliti}
              >
                {`Hide ${comments.length} comments`}
              </button>

              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    key={comment.id}
                    className={classNames(
                      'PostDetails__list-item',
                      {
                        hide: isHidden,
                      },
                    )}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleDelete(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm handleAdd={handleAdd} selectedPostId={selectedPostId} />
              </div>
            </section>
          </>
        )
        : 'No post selected'}
    </div>
  );
};
