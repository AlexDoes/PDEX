import React from "react";
import { useState } from "react";
import ExploreCollectionCard from "@/components/ExploreCollectionCard";
import { Prisma } from "@prisma/client";
import { Props } from "react-responsive-carousel/lib/ts/components/Thumbs";

interface Props {
  collections: any;
}

const explore = ({ collections }: Props) => {
  console.log(collections);
  return (
    <div className="w-full h-full bg-black">
      <div className=" flex flex-wrap justify-center  gap-4 bg-red-500">
        <div className="">
          <ExploreCollectionCard collection={collections[0]} />
        </div>
        {collections.map((collection: any) => (
          <ExploreCollectionCard collection={collection} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const collections = await prisma.plantCollection.findMany({
    where: {
      public: true,
    },
    include: {
      plantContents: {
        select: {
          id: true,
          image: true,
          name: true,
        },
      },
    },
  });
  console.log(collections);
  console.log("collections");
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};

export default explore;
