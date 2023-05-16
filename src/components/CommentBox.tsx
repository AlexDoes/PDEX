import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  reference: string;
  refId: string;
  userId: string;
}

const CommentBox = (props: Props) => {
  const { reference, refId, userId } = props;
  const [comment, setComment] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/comment/createComment", {
      method: "POST",
      body: JSON.stringify({
        reference: reference,
        refId: refId,
        comment: comment,
        userId: userId,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Comment posted!", {
          style: {
            background: "#e0f0e3",
            color: "#ffffff",
            textShadow: "0 0 0.5rem #000000",
          },
        });
        setComment("");
      } else {
        toast.error("Error posting comment!", {
          style: {
            background: "#e0f0e3",
            color: "#ffffff",
            textShadow: "0 0 0.5rem #000000",
          },
        });
      }
    });
  };
  return (
    <div className="h-full">
      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-row justify-center"
      >
        <div className="w-full flex flex-row justify-center items-center">
          <input
            className="w-[90%] h-full   bg-yellow-100 border-none rounded-l-2xl outline-none p-2 focus:ring-0 indent-3"
            type="text"
            placeholder={userId ? "Add a comment..." : "Login to comment!"}
            value={comment}
            onChange={onChange}
            minLength={4}
            maxLength={256}
            spellCheck={true}
            disabled={!userId}
          />
          <button
            className="w-[10%] h-[100%] flex justify-center items-center"
            type="submit"
          >
            <div className="text-center flex justify-center items-center h-full w-full text-blue-300">
              Post
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

CommentBox.propTypes = {
  reference: PropTypes.string,
  refId: PropTypes.string,
};

export default CommentBox;
