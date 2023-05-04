import SearchBar from "@/components/NewSearchBar";
import { useState } from "react";
import NavBarSearchBar from "@/components/NavBarSearchbarPrefetch";

interface props {
  speciesInDatabase: any;
  users: any;
}

export default function TestSite(props: props) {
  const UniqueSpecies: Set<string> = new Set();
  const [text, setText] = useState<string>("");

  props.speciesInDatabase.map((species: any) => {
    const specie = species.species;
    UniqueSpecies.add(specie);
  });

  const SUGGESTIONS: string[] = Array.from(UniqueSpecies);

  function handleChange(entry: any) {
    setText(entry);
  }

  return (
    <>
      {/* {text} */}
      {/* <SearchBar data={SUGGESTIONS} onChange={handleChange} width="w-[20vw]" /> */}
      <NavBarSearchBar />
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
