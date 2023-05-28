import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

interface Props {
  reference: string;
  refId: string;
  userId: string;
  onAction: any;
  likedId: string;
}

interface MyObject {
  [key: string]: string;
}

const CommentBox = (props: Props) => {
  const { reference, refId, userId, onAction } = props;
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(props.likedId ? true : false);
  const [likeId, setLikeId] = useState(props.likedId);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const map: MyObject = {
    UniquePlant: "unique plant",
    Comment: "comment",
    Collection: "plant collection",
  };

  const onLike = async (e: any) => {
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
        setLiked(true);
        toast.success(`You've liked the ${map[reference]}.`, {
          style: {
            background: "#e0f0e3",
            color: "#ffffff",
            textShadow: "0 0 0.5rem #000000",
          },
        });
        res.json().then((data) => {
          const newlikeId = data.id;
          setLikeId(newlikeId);
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

  const unlike = async (e: any) => {
    e.preventDefault();
    await fetch("/api/likes/unlike", {
      method: "DELETE",
      body: JSON.stringify({
        id: likeId,
      }),
    }).then((res) => {
      setLikeId("");
      setLiked(false);
      toast.success(`${reference} unliked.`, {
        style: {
          background: "#e0f0e3",
          color: "#ffffff",
          textShadow: "0 0 0.5rem #000000",
        },
      });
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    {
      comment.length >= 3 &&
        (await fetch("/api/comment/createComment", {
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
        }));
    }
  };

  return (
    <div className="h-full flex items-center">
      <button
        className="w-[10%] h-full flex justify-center items-center hover:backdrop-brightness-95 rounded-r-xl transition duration-300 ease-in-out group"
        onClick={!liked ? onLike : unlike}
      >
        {liked ? (
          <IoHeart className="text-red-500 h-full w-full" />
        ) : (
          <IoHeartOutline className="text-red-500 h-full w-full group-hover:animate-pulse" />
        )}
      </button>
      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-row justify-center"
      >
        <div className="w-full flex flex-row justify-center items-center">
          <input
            className="w-full h-full   bg-yellow-100 border-none rounded-l-2xl outline-none p-2 focus:ring-0 indent-3 font-light"
            type="text"
            placeholder={userId ? "Add a comment..." : "Login to comment!"}
            value={comment}
            onChange={onChange}
            minLength={3}
            maxLength={256}
            spellCheck={true}
            disabled={!userId}
          />
          <button
            className="w-[10%] min-w-[50px] h-[100%] flex justify-center items-center border-t border-b border-r hover:backdrop-brightness-90 rounded-r-xl 
            hover:text-green-300 transition duration-300 ease-in-out
            "
            type="submit"
            disabled={!userId || comment.length < 3}
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
  liked: PropTypes.bool,
};

export default CommentBox;
