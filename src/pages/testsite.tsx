import SearchBar from "@/components/NewSearchBar";

interface props {
  speciesInDatabase: any;
  users: any;
}

export default function TestSite(props: props) {
  const UniqueSpecies: Set<string> = new Set();

  props.speciesInDatabase.map((species: any) => {
    const specie = species.species;
    UniqueSpecies.add(specie);
  });

  // console.log(props.users);
  // props.users.map((user: any) => {
  //   const username = user.username;
  //   user.username && UniqueSpecies.add(username);
  // });

  const SUGGESTIONS: string[] = Array.from(UniqueSpecies);

  return (
    <>
      <SearchBar data={SUGGESTIONS} width="w-[20vw]" />
    </>
  );
}

export async function getStaticProps() {
  const speciesInDatabase = await prisma.uniquePlant.findMany({
    select: {
      species: true,
    },
  });

  // const users = await prisma.user.findMany({
  //   select: {
  //     username: true,
  //   },
  // });

  return {
    props: {
      speciesInDatabase,
      // users,
    },
  };
}
