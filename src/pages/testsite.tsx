import SearchBar from "@/components/NewSearchBar";

interface props {
  speciesInDatabase: any;
}

export default function TestSite(props: props) {
  const UniqueSpecies: Set<string> = new Set();

  props.speciesInDatabase.map((species: any) => {
    const specie = species.species;
    UniqueSpecies.add(specie);
  });

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

  return {
    props: {
      speciesInDatabase,
    },
  };
}
