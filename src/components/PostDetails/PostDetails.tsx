import React, { useCallback, useEffect, useState } from 'react';
import {
  addPostComment,
  getPostById,
  getPostComments,
  removePostComment,
} from '../../api/api';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isShowComments, setShowComments] = useState(true);

  useEffect(() => {
    if (!postId) {
      setPost(null);
    } else {
      getPostById(postId).then(postFromServer => setPost(postFromServer));
      getPostComments(postId)
        .then(commentsFromServer => setComments(commentsFromServer));
    }
  }, [postId]);

  const handleDeleteComment = async (commentId: number) => {
    const deletedCommentId = await removePostComment(commentId);

    if (deletedCommentId) {
      const commentsFromServer = await getPostComments(postId);

      setComments(commentsFromServer);
    }
  };

  const handleOnSubmit = useCallback(async (
    event: React.FormEvent<HTMLFormElement>,
    newComment: NewComment,
  ) => {
    event.preventDefault();
    const addedComment = await addPostComment(newComment);

    if (addedComment) {
      const commentsFromServer = await getPostComments(postId);

      setComments(commentsFromServer);
    }
  }, [comments]);

  return (
    <div className="PostDetails">
      {
        post
          ? (
            <>
              <h2>Post details:</h2>

              <section className="PostDetails__post">
                <p>{post.title}</p>
              </section>

              <section className="PostDetails__comments">
                <button
                  type="button"
                  className="button"
                  onClick={() => setShowComments(!isShowComments)}
                >
                  { isShowComments
                    ? (`Hide ${comments.length}`)
                    : ('Show')}
                  {' '}
                  comments
                </button>
                {
                  isShowComments && (
                    <ul className="PostDetails__list">
                      {comments.map(comment => (
                        <li
                          className="PostDetails__list-item"
                          key={comment.id}
                        >
                          <button
                            type="button"
                            className="PostDetails__remove-button button"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            X
                          </button>
                          <p>{comment.body}</p>
                        </li>
                      ))}
                    </ul>
                  )
                }
              </section>

              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm
                    postId={postId}
                    onSubmit={handleOnSubmit}
                  />
                </div>
              </section>
            </>
          )
          : ('Choose the post')
      }
    </div>
  );
};
