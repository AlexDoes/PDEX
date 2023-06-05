import { useRouter } from "next/router";
import prisma from "lib/prisma";
import { useState, useEffect, useRef } from "react";
import CommentBox from "@/components/CommentBox";
import { getSession } from "next-auth/react";
import Link from "next/link";
import DeleteCommentButton from "@/components/DeleteCommentButton";
import { SlPencil } from "react-icons/sl";
import CollectionImageCarousel from "@/components/ImageCarouselComponentForCollection";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}
const defaultAvatars = [
  "https://pdex.s3.amazonaws.com/defaultavatar-1.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-2.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-3.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-4.jpg",
];

export default function publicDisplayCollection({
  collection,
  comments,
  user,
  userInfo,
  likedId,
  likerId,
}: any) {
  const router = useRouter();
  const latestComment = useRef<HTMLDivElement>(null);
  const [commentsToDisplayState, setCommentsToDisplay] = useState(comments);
  const [scroll, setScroll] = useState(false);

  const handleDeleteFromParent = (deletedId: string) => {
    const newComments = commentsToDisplayState.filter(
      (comment: any) => comment.id !== deletedId
    );
    setCommentsToDisplay(newComments);
  };
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
        <div className="border-y-2 border-[#bceac2] h-full xs:h-[90px] text-center justify-center items-center flex">
          Be the first to comment!
        </div>
      );
    }
    return (
      <div
        className="flex flex-col gap-3 border-y border-[#FFF4BD]px-4 h-full overflow-y-auto p-2 transition-all duration-500 ease-in-out scroll-smooth pt-4 scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
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
                      {comment.author.id === collection.ownerId ? "Author" : ""}
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

  // <div className="w-full h-full">
  //   <div
  //     className="xs:w-[80vw] xs:h-[95vw] sm:w-[100vw]
  //         lg:max-h-[80vh] lg:max-w-[80vh] xl:max-w-[80vh] xl:max-h-[80vh]
  //         sm:max-w-[80vw]"
  //   >
  //     {collection.plantContents && collection.plantContents.length > 0 ? (
  //       <CollectionImageCarousel
  //         images={collection.plantContents.map((plant: any) => {
  //           return plant.image;
  //         })}
  //       />
  //     ) : (
  //       "No images"
  //     )}
  //   </div>
  // </div>
  return (
    <div
      className=" mt-[10px] border-[#c1e1c1] bg-green-100 bg-opacity-80
      rounded-xl p-4  lg:justify-center  pb-6  lg:items-center  focus:focus-within hover:relative hover:transition-all focus:transition-all 
        w-full focus:outline-none overflow-x-hidden flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-14  min-h-[88vh] h-[88vh]
         "
      tabIndex={0}
    >
      <div className="relative h-full group w-inherit  items-center justify-center flex  ">
        <div className="relative flex">
          <div
            className=" outlie outline-8 outline-red-900
            xs:w-[80vw] xs:h-[80vw]
            lg:max-h-[80vh] lg:max-w-[80vh] 
            xl:max-w-[80vh] xl:max-h-[80vh]
            sm:max-w-[80vw]
            lg:w-[45vw] lg:h-[45vw]
            select-none
           "
          >
            {collection.plantContents && collection.plantContents.length > 0 ? (
              <CollectionImageCarousel
                images={collection.plantContents.map((plant: any) => {
                  return plant.image;
                })}
                names={collection.plantContents.map((plant: any, i: Number) => {
                  return {
                    name: plant.name,
                    id: plant.id,
                    species: plant.species,
                    species2: plant.species2,
                  };
                })}
              />
            ) : (
              "No images"
            )}
          </div>
          {/* <div className="absolute left-0 right-0  flex flex-col px-2 py-2 mx-auto transition-opacity duration-100 ease-in-out bg-gray-800 opacity-0 bottom-2   group-hover:opacity-70 group-focus:opacity-70 rounded-b-xl ">
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
          </div> */}
        </div>
      </div>
      {/* comment section */}
      {/* <div
        className="relative grid border border-black xs:items-center xs:justify-center  gap-2 px-2 h-full   
          max-w-[800px]
          rounded-xl
        "
      >
        <div
          className="h-[30%] border border-red-500 flex 
          flex-col items-start justify-evenly relative  gap-2 "
        >
          <div className=" flex flex-row text-xl elipsis font-bold">
            {collection.name}{" "}
            <div className="text-sm font-light text-blue-300 rounded-sm">
              {user === collection.ownerId ? (
                <div className="ml-1 rounded-sm hover:border hover:backdrop-brightness-90">
                  <Link href={`/mycollections/${collection.id}`}>
                    <SlPencil />
                  </Link>
                </div>
              ) : (
                ""
              )}{" "}
            </div>
          </div>
          <div className="italic font-light">
            Collection by -{" "}
            <Link
              href={`/u/${collection.owner.nickname || collection.ownerId}`}
            >
              {collection.owner.nickname || collection.owner.name}
            </Link>
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
                {collection.description
                  ? collection.description +
                    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Null lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Null"
                  : `There's not much known about ${collection.name} yet but check back later when ${collection.owner.nickname} tells us more about it! lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Nulllorem ipsum dolor sit amet, consectetur adipiscing elit. Null`}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[55%] w-full mb-auto">{commentsToDisplay()}</div>
        <div className="h-[12%] w-full bottom-0  justify-center py-3  ">
          <CommentBox
            reference={"Collection"}
            refId={collection.id}
            userId={user}
            onAction={handleCommentSubmit}
            likedId={likedId}
          />
        </div>
      </div> */}
      <div
        className="relative flex 
        flex-col   xs:items-center xs:justify-center  gap-2 px-2    
        
        min-w-[30vw]
        w-full
        border-8
        h-full
        rounded-xl
      "
      >
        <div
          className="h-[30%]  flex 
          flex-col  items-start justify-evenly relative w-full gap-1"
        >
          <div>
            <div className=" flex flex-row text-xl elipsis font-semibold">
              {collection.name}{" "}
              <div className="text-sm font-light text-blue-300 rounded-sm">
                {user === collection.ownerId ? (
                  <div className="ml-1 rounded-sm hover:border hover:backdrop-brightness-90"></div>
                ) : (
                  ""
                )}{" "}
              </div>
            </div>
            <div className=" font-extralight text-sm hover:text-blue-400">
              <Link
                href={`/u/${collection.owner.nickname || collection.ownerId}`}
              >
                By {collection.owner.name || collection.owner.nickname}
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col  justify-center w-full ">
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
              w-full
            "
            >
              <p
                className=" border-t-2 items-center border-b-2 p-2 border-[#FFF4BD]  h-full 
                w-full min-w-full text-center justify-center flex  font-light overflow-y-auto scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
        scrollbar-rounded-sm snap-y snap-mandatory  "
              >
                {collection.description
                  ? collection.description
                  : `There's not much known about ${
                      collection.name
                    } yet but check back later when ${
                      collection.owner.nickname ||
                      collection.owner.name.split(" ")[0]
                    } tells us more about it!`}
              </p>
            </div>
          </div>
        </div>
        <div className=" h-[55%] min-h-[300px] max-h-[300px] w-full   first-letter: overflow-y-auto  justify-center items-center mt-2 mb-auto">
          {commentsToDisplay()}
        </div>
        <div className="h-[12%] w-full first-letter: justify-center py-3  ">
          <CommentBox
            reference={"Collection"}
            refId={collection.id}
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
  const collection = await prisma.plantCollection.findUnique({
    where: {
      id: String(context.params.collectionID),
    },
    include: {
      plantContents: {},
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
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

  const likerId = collection?.likes[0]?.userId || null;
  const likedId = collection?.likes[0]?.id || null;

  const plantsWithFormattedTime = collection?.Comments.map((comment: any) => {
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
      collection: JSON.parse(JSON.stringify(collection)),
      comments: JSON.parse(JSON.stringify(plantsWithFormattedTime)),
      user,
      userInfo,
      likedId,
      likerId,
    },
  };
}