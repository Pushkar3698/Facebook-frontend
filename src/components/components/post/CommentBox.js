import React from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const CommentBox = ({ modalHandler, comments, data, token }) => {
  return (
    <>
      <div className="comments-container">
        {comments.length !== 0 && (
          <Comment
            modalHandler={modalHandler}
            comment={comments[comments.length - 1].comment}
            user={
              comments[comments.length - 1].userId.firstname +
              " " +
              comments[comments.length - 1].userId.lastname
            }
            number={0}
          />
        )}
      </div>
      <CreateComment data={data} token={token} />
    </>
  );
};

export default CommentBox;
