import SearchBar from "./NewSearchBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaLeaf, FaUser, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Link from "next/link";

interface Data {
  plantsSuggestions: any;
  speciesSuggestions: any;
  usersSuggestions: any;
}

export default function NavBarSearchBar({}) {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  let fetched = false;
  let data: Data;
  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${searchText}`);
  };

  const fetchData = async () => {
    if (searchText.length > 2 && !fetched) {
      let res = await fetch(`/api/search/getAllDataforSearchBar`);
      data = await res.json();
      fetched = true;
    }
  };

  const handleOnChange = async (e: any) => {
    const input = e.target.value;
    setSearchText(input);
    if (!fetched && input.length > 2) {
      await fetchData();
    }
    if (fetched) {
      const newSuggestions = getSuggestions(input);
      setSuggestions(newSuggestions);
    }
  };

  useEffect(() => {
    if (searchText.length > 2 && fetched) {
      const newSuggestions = getSuggestions(searchText);
      setSuggestions(newSuggestions);
      console.log("useEffect");
    }
  }, [searchText]);

  const getSuggestions = (input: string) => {
    let suggestions: any = [];
    const newData = Object.entries(data);
    newData.forEach((array) => {
      array[1] = array[1].filter((item: any) => {
        const res = item.toLowerCase().includes(input.toLowerCase());
        return res;
      });
      let type = array[0];
      suggestions.push([type, ...array[1]]);
    });
    return suggestions || [];
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    if (searchText.length < 3) {
      setSuggestions([]);
    }
    const plant = suggestions[0];
    const species = suggestions[1];
    const users = suggestions[2];
    const plantSuggestions: string[] | string = suggestions[0].slice(1);
    const speciesSuggestions: string[] | string = suggestions[1].slice(1);
    const usersSuggestions: string[] | string = suggestions[2].slice(1);
    if (!plant && !species && !users) {
      return null;
    }
    if (searchText.length < 3) {
      return null;
    }
    let i = 0;
    return (
      <ul className={`w-inherit absolute top-[100%] w-[40vw]`}>
        {speciesSuggestions.length > 0 && (
          <div>
            <h1 className="text-lg font-thin bg-slate-300 border-2 border-black">
              Species suggested:{" "}
            </h1>
          </div>
        )}
        {speciesSuggestions &&
          speciesSuggestions.slice(0, 5).map((item: any) => (
            <li
              key={item}
              onClick={handleClickingSuggestion}
              className="
                bg-white
                cursor-pointer
                hover:bg-gray-200
                border-2 border-black
                indent-3
                flex flex-row
                justify-between
                pr-3
                items-center
                "
              tabIndex={0}
            >
              {item}
              <FaLeaf />
            </li>
          ))}
        {plantSuggestions.length > 0 && (
          <div>
            <h1 className="text-lg font-thin bg-slate-300 border-2 border-black">
              Plants suggested:{" "}
            </h1>
          </div>
        )}
        {plantSuggestions &&
          plantSuggestions.slice(0, 3).map((item: any) => (
            <li
              key={item}
              onClick={handleClickingSuggestion}
              className="
                bg-white
                cursor-pointer
                hover:bg-gray-200
                border-2 border-black
                indent-3
                flex flex-row
                justify-between
                pr-3
                items-center
                "
              data-value={item}
              tabIndex={0}
            >
              {item}
              <HiSparkles />
            </li>
          ))}
        {usersSuggestions.length > 0 && (
          <div>
            <h1 className="text-lg font-thin bg-slate-300 border-2 border-black">
              Users suggested:{" "}
            </h1>
          </div>
        )}
        {usersSuggestions &&
          usersSuggestions.slice(0, 2).map((item: any) => (
            <li
              key={item}
              onClick={handleClickingSuggestion}
              className="
                bg-white
                cursor-pointer
                hover:bg-gray-200
                border-2 border-black
                indent-3
                flex flex-row
                justify-between
                pr-3
                items-center
                "
              tabIndex={0}
            >
              <Link
                href={`/u/${item}`}
                className="
                    flex flex-row
                    justify-between
                    w-full
                    items-center
              "
              >
                {item}
                <FaUser />
              </Link>
            </li>
          ))}
      </ul>
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const input = e.target.value;
    router.push(`/search/${input}`);
  };

  const handleClickingSuggestion = (e: any) => {
    const input = e.target.innerText;
    setSearchText(input);
    setSuggestions([]);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  return (
    <form className="flex flex-row" onSubmit={handleSubmit}>
      <div className="flex flex-col border-8 items-start relative">
        <div className="flex flex-row justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleOnChange}
            className="w-[40vw]"
            tabIndex={0}
          />
        </div>
        {renderSuggestions()}
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="border-2 flex items-center justify-center hover:bg-black"
      >
        <FaSearch />
      </button>
    </form>
  );
}
