import { get, update } from "lodash";
import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { useState, useEffect } from "react";
import CommentBox from "@/components/CommentBox";
import { getSession } from "next-auth/react";
import Link from "next/link";

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

export default function plantPublicDisplayPage({ plant, comments, user }: any) {
  const router = useRouter();

  const [commentsToDisplayState, setCommentsToDisplay] = useState(comments);
  console.log(plant.ownerId);
  useEffect(() => {
    setCommentsToDisplay(comments);
  }, [commentsToDisplayState]);

  if (!plant) {
    return <div> Weird, you shouldn't be here</div>;
  }

  const commentsToDisplay = () => {
    if (comments.length === 0) {
      return <div>Be the first to comment!</div>;
    }
    return (
      <div className="flex flex-col gap-1 border-y border-black px-4 h-full overflow-y-auto p-2">
        {commentsToDisplayState.map((comment: any) => (
          <div
            key={comment.id}
            className="flex flex-row gap-4 items-center mr-2 px-2"
          >
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
                className="rounded-full w-8 h-8"
              />
            </Link>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <div>
                  <Link
                    className="flex flex-row gap-1 items-center"
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
                  <p className="italic text-xs text-gray-500">
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

  return (
    <div
      className=" border border-[#c1e1c1] bg-orange-100 rounded-xl p-4 m-2 pt-6 pb-6 items-center justify-between focus:focus-within hover:relative hover:transition-all focus:transition-all 
      w-inherit md:h-min-[492px] h-inherit focus:outline-none overflow-x-hidden flex flex-col md:flex-row gap-2 md:items-stretch
      h-full"
      tabIndex={0}
    >
      <div
        className="relative 
      inline-block group w-inherit"
      >
        <img
          src={plant.image}
          alt={plant.name}
          className="
            rounded-xl
            xs:w-[80vw] xs:h-[95vw] sm:w-[50vw] sm:h-[60vw]
            md:w-[50vw] md:h-[50vw] md:max-w-[50vw] lg:max-h-[80vh] lg:max-w-[80vh] xl:max-w-[80vh] xl:max-h-[80vh]
            sm:max-w-[80] mb-2
            hover:brightness-90
            hover:outline-none
            "
        />
        <div
          className="absolute bottom-2 left-0 right-0 px-2 py-2 bg-gray-800 opacity-0 transition-opacity ease-in-out duration-100
          group-hover:opacity-70
          group-focus:opacity-70
          mx-auto
          rounded-b-xl
          flex flex-col
        "
        >
          <h3 className="text-lg text-white">{plant.name}</h3>
          <div className="text-sm text-white font-light">
            <p className="italic">
              {!plant.species2
                ? plant.species
                : plant.species + " / " + plant.species2}
            </p>
            <p className="italic">
              By {plant.ownedBy.name || plant.ownedBy.nickname}{" "}
            </p>
            <div className="flex flex-row gap-1">
              <p>{plant.plantHeight && "H: " + plant.plantHeight}</p>
              <p>{plant.plantWidth && "W: " + plant.plantWidth}</p>
            </div>
            {plant.light ? <p>Sunlight: {plant.light}</p> : null}
            {plant.water ? <p>Water: {plant.water}</p> : null}
            <div>{plant.description} </div>
          </div>
        </div>
      </div>
      <div
        className="relative flex flex-col xs:items-center xs:justify-center md:items-start gap-1 px-2 h-full lg:max-h-[80vh] xl:max-h-[80vh] md:max-h-[50vw]
        md:h-[50vw]
        md:justify-evenly
        lg:justify-start
      "
      >
        <div
          className="h-[30%] flex 
        flex-col items-start justify-evenly relative"
        >
          <div className="elipsis top-0 text-xl"> {plant.name} </div>
          <div className="font-light italic">
            {plant.species} {plant.species2 ? "x " + plant.species2 : null}{" "}
          </div>
          <div className="flex flex-col justify-center relative">
            <div
              className="
              border-2 border-slate-300
              rounded-lg font-light
              overflow-y-auto
              xs:max-h-[92px]
              md:h-full
              lg:h-[90px]
              xl:h-[90px]
              max-h-[92px]
              ellipsis
              text-center
              flex
              p-2
              xs:text-sm sm:text-sm md:text-md items-center 
              relative
            "
            >
              <p>
                {plant.description
                  ? plant.description
                  : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tells us more about it!`}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[55%] w-full mb-auto">{commentsToDisplay()}</div>
        <div className="h-[10%] w-full bottom-0">
          <CommentBox
            reference={"UniquePlant"}
            refId={plant.id}
            userId={user}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  let user = null;
  if (session) {
    user = (session.user as User).id;
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
    },
  });

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
    },
  };
}
