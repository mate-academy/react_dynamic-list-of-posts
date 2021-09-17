import React, { useEffect, useState } from 'react';
import { createComment, getComments, deleteComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [post, resetPost] = useState(null as Post | null);
  const [commentsVisible, showHideComments] = useState(true);
  const [comments, setComments] = useState([] as Comment[]);

  const updateComments = async () => {
    const commentsFromServer = await getComments(selectedPostId);

    setComments(commentsFromServer);
  };

  const addComment = async (comment: Partial<Comment>) => {
    await createComment(comment);
    updateComments();
  };

  const deleteThisComment = async (id: number) => {
    await deleteComment(id);
    updateComments();
  };

  useEffect(() => {
    if (selectedPostId === 0) {
      resetPost(null);

      return;
    }

    getPostDetails(selectedPostId)
      .then(response => resetPost(response));

    updateComments();
  }, [selectedPostId]);

  if (!post || !comments) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => showHideComments(current => !current)}
        >
          {commentsVisible ? 'Hide ' : 'Show '}
          {comments.length}
          {' comments'}
        </button>
        {commentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteThisComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            onAdd={addComment}
          />
        </div>
      </section>
    </div>
  );
};
