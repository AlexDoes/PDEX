import { update } from "lodash";
import { useRouter } from "next/router";

const defaultAvatars = [
  "https://pdex.s3.amazonaws.com/defaultavatar-1.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-2.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-3.jpg",
  "https://pdex.s3.amazonaws.com/defaultavatar-4.jpg",
];

export default function plantPublicDisplayPage({ plant, comments }: any) {
  const router = useRouter();

  if (!plant) {
    return <div> Weird, you shouldn't be here</div>;
  }

  const dateMaker = (date: string) => {
    const localeDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return localeDate;
  };

  const plantData = plant;

  const commentsToDisplay = () => {
    return (
      <div className="flex flex-col gap-1">
        {comments.map((comment: any) => (
          <div key={comment.id} className="flex flex-row gap-1 items-center">
            <img
              src={
                comment.author.image || defaultAvatars[comment.author.id % 4]
              }
              alt={comment.author.image}
              className="rounded-full w-6 h-6"
            />
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <div>
                  <p className="font-bold">
                    {comment.author.nickname ||
                      comment.author.name.split(" ")[0]}
                  </p>
                  <p className="italic text-xs text-gray-500">
                    {comment.createdAt}
                  </p>
                </div>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div
      className=" border-2 border-[#c1e1c1] bg-orange-100 rounded-xl p-2 m-2 pt-6 pb-6 items-center justify-center focus:focus-within hover:relative hover:transition-all focus:transition-all 
      w-inherit md:h-min-[492px] focus:outline-none overflow-x-hidden flex flex-col md:flex-row gap-6"
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
            border
            xs:w-[100vw] xs:h-w[110vw]
            md:w-[50vw] md:h-[50vw] md:max-w-[50vw] lg:max-h-[75vh] lg:max-w-[90vh]
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
      <div className="flex flex-col xs:items-center xs:justify-center md:items-start gap-1">
        <div className="elipsis"> {plant.name} </div>
        <div className="font-light italic">
          {" "}
          {plant.species} {plant.species2 ? "x " + plant.species2 : null}{" "}
        </div>
        <p
          className="
        bg-yellow-200
        rounded-lg
        w-[80%]
        overflow-x-hidden
        xs:max-h-[92px]
        md:h-[92px]
        lg:h-[90px]
        xl:h-[90px]
        max-h-[80px]
        overflow-y-auto
        ellipsis
        text-center
        flex
        p-2
        xs:text-sm sm:text-sm md:text-md
      "
        >
          {plant.description
            ? plant.description
            : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tells us more about it!`}
        </p>
        {commentsToDisplay()}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
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
    },
  };
}
