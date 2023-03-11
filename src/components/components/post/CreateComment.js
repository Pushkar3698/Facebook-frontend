import React, { useRef } from "react";
import { API_URL } from "../../api-url/api";

const CreateComment = ({ token, data }) => {
  const ref = useRef();

  const createCommentHandler = async () => {
    const postData = {
      ...data,
      comment: ref.current.value,
    };

    const fetchData = await fetch(`${API_URL}/feed/addComment`, {
      method: "POST",

      headers: {
        Authorization: "Bearer=" + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const res = await fetchData.json();
    console.log(res);
    ref.current.value = "";
  };

  return (
    <div className="comment-input">
      <div className="user-img">
        <img
          src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
          alt=""
        />
      </div>
      <div className="add-comment">
        <input
          type="text"
          name=""
          id=""
          placeholder="Add a comment"
          ref={ref}
        />
      </div>
      <div className="add-cmnt-btn">
        <button onClick={createCommentHandler}>add comment</button>
      </div>
    </div>
  );
};

export default CreateComment;
