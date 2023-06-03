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

export default function publicDisplayCollection({
  collection,
  comments,
  user,
  userInfo,
  likedId,
  likerId,
}: any) {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <div className="w-[800px] h-[800px]">
        {collection.plantContents && collection.plantContents.length > 0 ? (
          <CollectionImageCarousel
            images={collection.plantContents.map((plant: any) => {
              return plant.image;
            })}
          />
        ) : (
          "No images"
        )}
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
  console.log(plantsWithFormattedTime);

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
