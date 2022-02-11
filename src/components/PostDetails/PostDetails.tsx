import React, { useEffect, useState, useCallback } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import * as commentsAPI from '../../api/comments';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [commentsVisibility, setCommentsVisibility] = useState(false);

  const loadData = async (postId: number) => {
    const commentsFromServer = await commentsAPI.getPostComments(postId);

    setPostComments(commentsFromServer);
  };

  const commentsVisibilityHandler = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  const deleteCommentHandler = useCallback(async (postId: number) => {
    await commentsAPI.deleteSelectedComment(postId);
    await loadData(selectedPost.id);
  }, []);

  useEffect(() => {
    loadData(selectedPost.id);
  }, [selectedPost]);

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
            commentsVisibilityHandler();
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
                        deleteCommentHandler(postComment.id);
                      }}
                    >
                      X
                    </button>
                    <h4>
                      {postComment.title}
                    </h4>
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
          <NewCommentForm selectedPostId={selectedPost.id} loadData={loadData} />
        </div>
      </section>
    </div>
  );
};
