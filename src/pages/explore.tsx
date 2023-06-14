import React from "react";
import { useState, useEffect } from "react";
import ExploreCollectionCard from "@/components/ExploreCollectionCard";
import prisma from "lib/prisma";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  collections: any;
  pagination: any;
}

const explore = ({ collections, pagination }: Props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagination.page]);

  return (
    <div className="w-full h-full items-center ">
      <div className="flex items-center justify-center w-full text-center text-2xl p-2 mb-2 rounded-xl text-[#fffbcc]">
        <div className="backdrop-blur-[2px] backdrop-invert-[20%] xs:w-[80%] md:w-full rounded-xl">
          Explore other people's collections:
        </div>
      </div>
      <div className=" flex flex-wrap justify-center gap-4 ">
        {collections.map((collection: any, i: number) => (
          <div key={i}>
            <ExploreCollectionCard collection={collection} />
          </div>
        ))}
      </div>
      <div className=" w-full  text-3xl text-white flex gap-2 justify-center items-center mt-5">
        {pagination.page > 1 && (
          <Link href={`/explore?page=${pagination.page - 1}`}>Previous</Link>
        )}

        <span className="text-lg">Page {pagination.page}</span>

        {pagination.page < pagination.totalPages && (
          <Link href={`/explore?page=${pagination.page + 1}`}>Next</Link>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (params: any) => {
  const page = params.query.page ? parseInt(params.query.page) : 1;
  const limit = 10;

  const collections = await prisma.plantCollection.findMany({
    where: {
      public: true,
    },
    take: limit,
    skip: (page - 1) * limit,
    include: {
      plantContents: {
        select: {
          id: true,
          image: true,
          name: true,
        },
      },
      owner: {
        select: {
          nickname: true,
          id: true,
        },
      },
    },
  });

  // const totalCollections = await prisma.plantCollection.count({
  //   where: {
  //     public: true,
  //   },
  // });

  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
      pagination: {
        page: page,
        limit: limit,
        // totalPages: Math.ceil(totalCollections / limit),
      },
    },
  };
};

export default explore;
