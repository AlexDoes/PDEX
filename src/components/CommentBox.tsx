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
  if (!userId) return null;
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
    <>
      <form
        onSubmit={onSubmit}
        className="w-full h-full border-2 flex justify-center items-center"
      >
        <div className="w-full flex flex-row justify-center">
          <input
            className="w-[90%] h-full focus:outline-none focus:ring border-none"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={onChange}
            minLength={4}
            maxLength={256}
          />
          <Button
            className="h-full w-[10%] flex justify-center items-center"
            type="submit"
          >
            <div
              className="border-y border-right h-full w-full 
            text-center flex items-center justify-center"
            >
              Post
            </div>
          </Button>
        </div>
      </form>
    </>
  );
};

CommentBox.propTypes = {
  reference: PropTypes.string,
  refId: PropTypes.string,
};

export default CommentBox;
