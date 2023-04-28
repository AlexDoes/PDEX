import { useEffect, useState } from "react";
import SearchBar from "../components/oldSearchBar";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  other_name?: string[];
  default_image: {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    full: string;
  };
}

const divStyle = {
  justifyContent: "space-between",
  width: "50px",
  height: "50px",
  // backgroundColor: "lightgreen",
};

const divStyle2 = {
  padding: "10px",
  margin: "0 auto",
  width: "80%",
  font: "20px",
  backgroundColor: "lightblue",
  fontSize: "30px",
  color: "coral",
};

const divstyle3 = {
  margin: "0 auto",
  // width: "50%",
  display: "flex",
  justifyContent: "center",
  gap: "5px",
};

function toTitleCase(str: string) {
  const res = str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      const target = word[0] == "'" ? word[1] : word[0];
      return word.replace(target, target.toUpperCase());
    })
    .join(" ");
  return res;
}

function plantdex() {
  let [plantsIndex, setPlantsIndex] = useState<any>([]);
  let [page, setPage] = useState<number>(1);
  let [search, setSearch] = useState<any>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    setPage(Number(button.textContent));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`data/page${page}.json`);
      const json = await res.json();
      setPlantsIndex(json.data);
    }
    async function fetchSearch() {
      const res = await fetch(`data/species.json`);
      const json = await res.json();
      setSearch(json);
    }
    fetchSearch();
    fetchData();
  }, [page]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(`data/species.json`);
  //     const json = await res.json();
  //     setSearch(json);
  //   }
  //   fetchData();
  // }, []);

  const pageNumbers: number[] = [];
  for (let i = page - 3; i <= page + 3; i++) {
    if (i > 0 && i <= 200) {
      pageNumbers.push(i);
    }
  }

  return (
    <div style={divStyle2}>
      <SearchBar props={search} />
      <div style={divstyle3}>
        <button
          className="h-12 w-12 bg-[rgb(74,233,154)] flex justify-center items-center"
          onClick={() => setPage(1)}
        >
          {<FaAngleDoubleLeft />}
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            className={` ${
              pageNumber === page
                ? "h-12 w-12 bg-[rgb(84,80,80)] pointer-events-none flex justify-center items-center"
                : "h-12 w-12 bg-[rgb(74,233,154)] flex justify-center items-center"
            }`}
            key={pageNumber}
            onClick={handleClick}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="h-12 w-12 bg-[rgb(74,233,154)] flex justify-center items-center"
          onClick={() => setPage(200)}
        >
          {<FaAngleDoubleRight />}
        </button>
      </div>
      <ul>
        {plantsIndex.map((plant: any) => (
          <li key={plant.id}>
            Plant ID: {plant.id} <br></br>
            Scientific name: {plant.scientific_name} <br></br>
            Common names: {plant["common_name"]} <br></br>
            {plant.other_name && (
              <p>
                {"Other names: "}
                {plant.other_name
                  .map((names: string) => {
                    return toTitleCase(names);
                  })
                  .join(", ")}
              </p>
            )}
            {plant.default_image && (
              <img
                width="300px"
                height="50px"
                src={plant.default_image.thumbnail}
                alt={plant.common_name}
              />
            )}{" "}
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default plantdex;
