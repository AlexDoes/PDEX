import { get, update } from "lodash";
import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { useState, useEffect, useRef } from "react";
import CommentBox from "@/components/CommentBox";
import { getSession } from "next-auth/react";
import Link from "next/link";
import DeleteCommentButton from "@/components/DeleteCommentButton";
import { SlPencil } from "react-icons/sl";

const defaultAvatars = [
  "https://pdex.s3.amazonaws.com/defaultavatar-1.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-2.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-3.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-4.jpg",
];

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

export default function plantPublicDisplayPage({
  plant,
  comments,
  user,
  userInfo,
  likedId,
  likerId,
}: any) {
  const router = useRouter();
  const latestComment = useRef<HTMLDivElement>(null);
  const [commentsToDisplayState, setCommentsToDisplay] = useState(comments);

  const handleDeleteFromParent = (deletedId: string) => {
    const newComments = commentsToDisplayState.filter(
      (comment: any) => comment.id !== deletedId
    );
    setCommentsToDisplay(newComments);
  };

  if (!plant) {
    return <div> Weird, you shouldn't be here</div>;
  }
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (scroll) {
      if (latestComment.current) {
        latestComment.current.scrollTop = latestComment.current.scrollHeight;
      }
    }
    scroll && setScroll(false);
  }, [commentsToDisplayState]);

  const commentsToDisplay = () => {
    if (commentsToDisplayState.length === 0) {
      return (
        <div className="border-y border-black h-full xs:h-[90px] text-center justify-center items-center flex">
          Be the first to comment!
        </div>
      );
    }
    return (
      <div
        className="flex flex-col gap-3 border-y border-black px-4 h-full overflow-y-auto p-2 transition-all duration-500 ease-in-out scroll-smooth pt-4 scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
        scrollbar-rounded-sm snap-y snap-mandatory"
        ref={latestComment}
      >
        {commentsToDisplayState.map((comment: any) => (
          <div
            key={comment.id}
            className="relative flex flex-row items-center gap-4 px-2 pb-5 mr-2 group snap-center"
          >
            <div className="absolute bottom-0 flex items-center justify-center w-full">
              <div className="bottom-0 right-[50%] h-[2px] w-[50%] group-hover:bg-gray-200"></div>
            </div>
            <Link
              href={
                comment.author.nickname
                  ? `/u/${comment.author.nickname}`
                  : `/u/${comment.author.id}`
              }
            >
              <img
                src={
                  comment.author.image || defaultAvatars[comment.author.id % 4]
                }
                alt={comment.author.image}
                className="w-8 h-8 rounded-full"
              />
            </Link>
            <div className="flex flex-col w-full gap-1 border-black">
              <div className="flex flex-col w-full gap-1">
                <div className="relative w-full">
                  <Link
                    className="flex flex-row gap-1 items-center w-[10%]"
                    href={
                      comment.author.nickname
                        ? `/u/${comment.author.nickname}`
                        : `/u/${comment.author.id}`
                    }
                  >
                    <p className="font-semibold">
                      {comment.author.nickname ||
                        comment.author.name.split(" ")[0]}
                    </p>
                    <p className="text-xs font-bold text-blue-400">
                      {comment.author.id === plant.ownerId ? "Author" : ""}
                    </p>
                  </Link>
                  <div className="absolute top-0 bottom-0 right-0 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                    {comment.author.id === user ? (
                      <DeleteCommentButton
                        commentId={comment.id}
                        userId={user}
                        onConfirm={handleDeleteFromParent}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-xs italic text-gray-500">
                    {comment.createdAt}
                  </p>
                </div>
              </div>
              <p className="text-sm font-light">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleCommentSubmit = (comment: any) => {
    comment.author = userInfo;
    comment.createdAt = "just now";
    setScroll(true);
    const newComments = [...commentsToDisplayState, comment];
    setCommentsToDisplay(newComments);
  };
  return (
    <div
      className=" mt-[10px] border-[#c1e1c1] bg-orange-100 rounded-xl p-4  lg:justify-center  pb-6  lg:items-center  focus:focus-within hover:relative hover:transition-all focus:transition-all 
      w-full  focus:outline-none overflow-x-hidden flex flex-col lg:flex-row gap-8 lg:gap-20  h-[88vh] border-8
       "
      tabIndex={0}
    >
      <div className="relative h-full group w-inherit  items-center justify-center flex  ">
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.name}
            className="
            rounded-xl
            xs:w-[80vw] xs:h-[95vw] sm:w-[100vw]  
            lg:max-h-[80vh] lg:max-w-[80vh] xl:max-w-[80vh] xl:max-h-[80vh]
            sm:max-w-[80vw] mb-2
            hover:brightness-90
            hover:outline-none
            lg:w-[45vw]
            "
          />
          <div className="absolute left-0 right-0  flex flex-col px-2 py-2 mx-auto transition-opacity duration-100 ease-in-out bg-gray-800 opacity-0 bottom-2   group-hover:opacity-70 group-focus:opacity-70 rounded-b-xl ">
            <h3 className="text-lg text-white">{plant.name}</h3>
            <div className="text-sm font-light text-white">
              <p className="italic">
                {!plant.species2
                  ? plant.species
                  : plant.species + " / " + plant.species2}
              </p>
              <p className="italic">
                By {plant.ownedBy.name || plant.ownedBy.nickname}{" "}
              </p>
              <div className="flex flex-row gap-1">
                <p>{plant.plantHeight && "H: " + plant.plantHeight + " cm"}</p>
                <p>{plant.plantWidth && "W: " + plant.plantWidth + " cm"}</p>
              </div>
              {plant.light ? <p>Sunlight: {plant.light}</p> : null}
              {plant.water ? <p>Water: {plant.water}</p> : null}
              <div>{plant.description} </div>
            </div>
          </div>
        </div>
      </div>
      {/* comment section */}
      <div
        className="relative grid   border border-black xs:items-center xs:justify-center  gap-2 px-2 h-full   
        max-w-[800px]
        rounded-xl
      "
      >
        <div
          className="h-[30%] border border-red-500 flex 
        flex-col items-start justify-evenly relative  gap-2 "
        >
          <div className=" flex flex-row text-xl elipsis font-bold">
            {plant.name}{" "}
            <div className="text-sm font-light text-blue-300 rounded-sm">
              {user === plant.ownerId ? (
                <div className="ml-1 rounded-sm hover:border hover:backdrop-brightness-90">
                  <Link href={`/myplants/${plant.id}`}>
                    <SlPencil />
                  </Link>
                </div>
              ) : (
                ""
              )}{" "}
            </div>
          </div>
          <div className="italic font-light">
            {plant.species} {plant.species2 ? "x " + plant.species2 : null}{" "}
          </div>
          <div className="relative flex flex-col justify-center">
            <div
              className="
 
              rounded-lg font-light
              xs:max-h-[92px]
              md:h-full
              lg:h-[90px]
              xl:h-[90px]
              max-h-[92px]
              text-ellipsis
              text-center
              flex
              pl-2
              xs:text-sm sm:text-sm md:text-md items-center 
              relative
            "
            >
              <p
                className=" border-t-2 border-b-2 border-[#C1E1C1]  h-full text-center justify-center flex  font-semibold overflow-y-auto scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
        scrollbar-rounded-sm snap-y snap-mandatory  "
              >
                {plant.description
                  ? plant.description +
                    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Null lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Null"
                  : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tells us more about it! lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Null`}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[55%] w-full mb-auto">{commentsToDisplay()}</div>
        <div className="h-[12%] w-full bottom-0  justify-center py-3  ">
          <CommentBox
            reference={"UniquePlant"}
            refId={plant.id}
            userId={user}
            onAction={handleCommentSubmit}
            likedId={likedId}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  let user: string | null = null;
  let userInfo = null;
  if (session) {
    user = (session.user as User).id;
    userInfo = await prisma.user.findUnique({
      where: {
        id: user,
      },
      select: {
        id: true,
        name: true,
        nickname: true,
        image: true,
      },
    });
  }

  const plant = await prisma.uniquePlant.findUnique({
    where: {
      id: String(context.params.plantId),
    },
    include: {
      ownedBy: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      Comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              nickname: true,
              image: true,
            },
          },
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
  });

  const likerId = plant?.likes[0]?.userId || null;
  const likedId = plant?.likes[0]?.id || null;

  const plantsWithFormattedTime = plant?.Comments.map((comment: any) => {
    const date = new Date(comment.createdAt);
    const dateString = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    const formattedString = `${dateString}, ${timeString}`;
    return { ...comment, createdAt: formattedString };
  });

  return {
    props: {
      plant: JSON.parse(JSON.stringify(plant)),
      comments: JSON.parse(JSON.stringify(plantsWithFormattedTime)),
      user,
      userInfo,
      likedId,
      likerId,
    },
  };
}
