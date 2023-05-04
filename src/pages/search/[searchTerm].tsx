import prisma from "lib/prisma";
import avatarImage from "public/images/avatar.jpg";

interface Props {
  searchTerm: string;
  uniquePlants: uniquePlant[];
  users: users[];
}

interface uniquePlant {
  name: string;
  species: string;
  image: string;
  description: string;
  plantHeight: number;
  plantWidth: number;
  plantDepth: number;
  plantWeight: number;
  plantContents: any;
  plantCollection: any;
  id: string;
  ownedBy: users;
}

interface species {
  name: string;
  species: string;
}

interface users {
  name: string;
  nickname: string;
  image: string;
}

export default function SearchResult({
  searchTerm,
  uniquePlants,
  users,
}: Props) {
  return (
    <div>
      <h1> Search Results for `{searchTerm}`</h1>
      <div className="border-2 border-black">
        <h2> User's personal plants related to {searchTerm}: </h2>
        {uniquePlants.length ? (
          uniquePlants.map((plant) => (
            <div key={plant.id} className="border border-red-400">
              <h3>Plant name: {plant.name}</h3>
              <h3>Owner: {plant.ownedBy.nickname}</h3>
              <h4>Plant species: {plant.species}</h4>
              <p>Plant Id: {plant.id}</p>
              <p>
                Plant description:{" "}
                {plant.description
                  ? plant.description
                  : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tell's us more about it!`}
              </p>
            </div>
          ))
        ) : (
          <p>No plants found related to `{searchTerm}`</p>
        )}
      </div>
      <div className="border-2 border-black">
        <h2> Users </h2>
        {users.length ? (
          users.map((user) => (
            <div key={user.nickname} className="border-2 border-red-500">
              <h4>{user.nickname}</h4>
              {user.image ? (
                <img src={user.image} alt="" className="w-20 h-20" />
              ) : (
                <img src={avatarImage.src} alt="" className="w-20 h-20" />
              )}
            </div>
          ))
        ) : (
          <p>No users found with the name `{searchTerm}`</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const searchTerm = context.params.searchTerm;
  const uniquePlants = await prisma.uniquePlant.findMany({
    where: {
      OR: [
        {
          species: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
        {
          species2: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      ownedBy: {
        select: {
          nickname: true,
        },
      },
    },
    take: 30,
  });

  const users = await prisma.user.findMany({
    where: {
      nickname: {
        contains: searchTerm as string,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      nickname: true,
      image: true,
    },
    take: 10,
  });

  return {
    props: {
      searchTerm,
      uniquePlants,
      users,
    },
  };
}
