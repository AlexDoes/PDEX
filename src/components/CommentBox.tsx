import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  reference: string;
  refId: string;
  userId: string;
  onAction: any;
}

const CommentBox = (props: Props) => {
  const { reference, refId, userId, onAction } = props;
  const [comment, setComment] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onLike = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    await fetch("/api/likes/makeLike", {
      method: "POST",
      body: JSON.stringify({
        reference: reference,
        refId: refId,
        userId: userId,
      }),
    }).then((res) => {
      if (res.ok) {
        toast.success("Comment liked!", {
          style: {
            background: "#e0f0e3",
            color: "#ffffff",
            textShadow: "0 0 0.5rem #000000",
          },
        });
        res.json().then((data) => {
          console.log(data);
          onAction(data);
        });
      } else {
        toast.error("Error liking comment!", {
          style: {
            background: "#e0f0e3",
            color: "#ffffff",
            textShadow: "0 0 0.5rem #000000",
          },
        });
      }
    });
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
        res.json().then((data) => {
          console.log(data);
          onAction(data);
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
        <div
          className="w-[5%] border-2 flex justify-center items-center"
          onClick={onLike}
        >
          ❤️
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <input
            className="w-[90%] h-full   bg-yellow-100 border-none rounded-l-2xl outline-none p-2 focus:ring-0 indent-3 font-light"
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
            className="w-[10%] h-[100%] flex justify-center items-center border-t border-b border-r hover:backdrop-brightness-90 rounded-r-xl 
            hover:text-green-300 transition duration-300 ease-in-out
            "
            type="submit"
          >
            <div className="text-center flex justify-center items-center h-full w-full text-blue-300 hover:text-green-100">
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
  userId: PropTypes.string,
  onAction: PropTypes.func,
};

export default CommentBox;
