import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import * as commentsAPI from '../../api/comments';

type Props = {
  selectedPost: Post,
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPost, selectedPostId }) => {
  const [postComments, setPostComments] = useState([] as PostComment[]);
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  useEffect(() => {
    const loadData = async (postId: number) => {
      const commentsFromServer = await commentsAPI.getPostComments(postId);

      setPostComments(commentsFromServer);
    };

    loadData(selectedPostId);
  }, [selectedPostId, postComments]);

  const commentsHandler = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  const deletePostComment = (commentId: number) => {
    commentsAPI.deleteSelectedComment(commentId);
  };

  return (
    <div className="PostDetails">
      <h2>
        Post details:
      </h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            commentsHandler();
          }}
        >
          {commentsVisibility && ' Hide ' }
          {!commentsVisibility && ' Show ' }
          {postComments.length}
          {' comments '}
        </button>
        {
          commentsVisibility
          && (
            <ul className="PostDetails__list">
              {postComments.map((postComment) => {
                return (
                  <li
                    className="PostDetails__list-item"
                    key={postComment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        deletePostComment(postComment.id);
                      }}
                    >
                      X
                    </button>
                    <p>{postComment.body}</p>
                  </li>
                );
              })}
            </ul>
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm selectedPostId={selectedPostId} />
        </div>
      </section>
    </div>
  );
};
