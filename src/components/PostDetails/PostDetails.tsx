import React, { useState, useEffect } from 'react';
import {
  getPostDetails,
  getPostComments,
  removeComment,
  addComment,
} from '../../api/api';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentNotHidden, setIsCommentNotHidden] = useState(true);

  useEffect(() => {
    (async () => {
      const [selectedPostFromApi, commentsFromApi] = await Promise.all([
        await getPostDetails(selectedPostId),
        await getPostComments(selectedPostId),
      ]);

      setSelectedPost(selectedPostFromApi);
      setComments(commentsFromApi);
    })();
  }, [selectedPostId]);

  if (!selectedPost) {
    return null;
  }

  const removePostComment = async (commentId: number) => {
    await removeComment(commentId);
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  const addAnotherComment = async (anotherComment: Partial<Comment>) => {
    const response = await addComment(anotherComment);
    const newComment: Comment = await response.json();

    setComments(prevComments => [...prevComments, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{selectedPost.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <button
            type="button"
            className="button"
            onClick={() => (
              setIsCommentNotHidden(current => !current)
            )}
          >
            {isCommentNotHidden ? 'Hide comments' : 'Show comments'}
          </button>
        ) : null}

        {isCommentNotHidden && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => (
                    removePostComment(comment.id)
                  )}
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
          <NewCommentForm postId={selectedPostId} addAnotherComment={addAnotherComment} />
        </div>
      </section>
    </div>
  );
};
