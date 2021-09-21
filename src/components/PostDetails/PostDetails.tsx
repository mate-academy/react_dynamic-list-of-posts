import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/post';
import { getPostComments, handleMethodRequest } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  postId: number;
};

type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
};

export const PostDetails: React.FC<Props> = (props) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComment] = useState<Comment[]>([]);
  const [showComment, setShowComment] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState<number>(0);

  const handleRequest = async () => {
    const responsePost = await getPostDetails(props.postId);
    const responseComment = await getPostComments(props.postId);

    setPostDetails(responsePost);
    setPostComment(responseComment);
  };

  const addComment = (newComment: Comment) => {
    handleMethodRequest(newComment, 'POST');
    handleRequest();
  };

  useEffect(() => {
    handleRequest();
  }, [props.postId]);

  useEffect(() => {
    if (deletedCommentId) {
      handleRequest();
    }
  }, [deletedCommentId]);

  const deleteCommentOnClick = async (comment: Comment) => {
    setDeletedCommentId(comment.id);
    handleMethodRequest(comment, 'DELETE');
  };

  const ShowCommentOnClick = () => {
    if (postComments.length) {
      setShowComment(!showComment);
    }
  };

  return (
    <>
      {postDetails && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{ postDetails.body }</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              style={{ marginBottom: '10px' }}
              onClick={() => ShowCommentOnClick()}
            >
              {`${showComment ? 'Hide' : 'Show'} ${postComments.length} comments`}
            </button>
            {showComment && (
              <ul className="PostDetails__list">
                {postComments.map(postComment => {
                  const { id, body } = postComment;

                  return (
                    <li className="PostDetails__list-item" key={id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => deleteCommentOnClick(postComment)}
                      >
                        X
                      </button>
                      <p>{body}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                deletedCommentId={deletedCommentId}
                addComment={addComment}
                postComments={postComments}
                postId={props.postId}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};
