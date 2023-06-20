import SearchBar from "./NewSearchBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch, FaLeaf, FaUser, FaStar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Link from "next/link";
import filter from "./Filter";

interface Data {
  plantsSuggestions: any;
  speciesSuggestions: any;
  usersSuggestions: any;
}
interface ArrayOfSuggestions {
  suggestions: string[];
}

export default function NavBarSearchBar({}) {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  let fetched = false;
  let data: Data;
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (searchText.length === 0) {
      return;
    }
    setSearchText("");
    setSuggestions([]);
    fetched = false;
    router.push(`/search/${filter.clean(searchText)}`);
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
    const plant: string[] = suggestions[0];
    const species: string[] = suggestions[1];
    const users: string = suggestions[2];
    const plantSuggestions: string[] = suggestions[0].slice(1);
    const speciesSuggestions: string[] = suggestions[1].slice(1);
    const usersSuggestions: string[] = suggestions[2].slice(1);
    if (!plant && !species && !users) {
      return null;
    }
    if (searchText.length < 3) {
      return null;
    }
    let i = 0;
    return (
      <ul
        className={`w-inherit absolute top-[100%] w-[100%] z-40 text-ellipsis overflow-hidden bg-[#f6f5e5] rounded-b-lg  `}
      >
        <div className={`border-slate-500 rounded-md`}>
          {speciesSuggestions.length > 0 && (
            <div>
              <h1 className="text-lg bg-slate-300 border-black pl-1">
                Species suggested:{" "}
              </h1>
            </div>
          )}
          {speciesSuggestions &&
            speciesSuggestions.slice(0, 5).map((item: any) => (
              <li
                key={item}
                onClick={handleClickingSuggestion}
                onKeyDown={handleKeyDown}
                className="
                text-ellipsis
                bg-green-300
                cursor-pointer
                hover:bg-gray-200
                 border-slate-500
                indent-3
                flex flex-row
                justify-between
                pr-3
                items-center
                "
                tabIndex={0}
              >
                <Link
                  className="flex justify-between w-full items-center                     xl:pr-3 lg:pr-2 md:pr-1 sm:pr-3 pr-2"
                  href={`/search/${item}`}
                >
                  {item}
                  <FaLeaf />
                </Link>
              </li>
            ))}
          {plantSuggestions.length > 0 && (
            <div>
              <h1 className="text-lg font-thin bg-slate-300 border-black pl-1">
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
                truncate ...
                bg-[#c7fcff]
                cursor-pointer
                hover:bg-gray-200
                 border-black
                indent-3
                flex flex-row
                justify-between
                pr-3
                items-center
                "
                data-value={item}
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <Link
                  className="flex justify-between w-full items-center                     xl:pr-3 lg:pr-2 md:pr-1 sm:pr-3 pr-2"
                  href={`/search/${item}`}
                >
                  {item}
                  <HiSparkles />
                </Link>
              </li>
            ))}
          {usersSuggestions.length > 0 && (
            <div>
              <h1 className="text-lg bg-slate-300  border-slate-500 pl-1">
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
              text-ellipsis
                rounded-
                cursor-pointer
                hover:bg-gray-200
                 border-slate-500
                bg-[#f6f5e5]
                indent-3
                flex flex-row
                justify-between
                pr-3
                items-center
                "
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <Link
                  href={`/u/${item}`}
                  className="
                text-ellipsis
                    flex flex-row
                    justify-between
                    w-full
                    items-center
                    xl:pr-3 lg:pr-2 md:pr-1 sm:pr-3 pr-2
              "
                >
                  {item}
                  <FaUser />
                </Link>
              </li>
            ))}
        </div>
      </ul>
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const input = searchText;
    console.log(input);
    if (input.length === 0) {
    } else {
      router.push(`/search/${input}`);
    }
  };

  const handleBlur = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      setSuggestions([]);
    }, 500);
  };

  const handleClickingSuggestion = (e: any) => {
    const input = e.target.innerText;
    setSearchText(input);
    setSuggestions([]);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.click();
    }
  };

  return (
    <form
      className="flex flex-row z-30 items-center justify-center h-[62px] outline-none focus:border-none active:border-none focus:outline-none active:outline-none "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col z-30 items-start relative overflow-visible rounded-full border-none outline-none border-transparent focus:border-transparent focus:ring-0 active:ring-0">
        <div className="flex flex-row justify-center items-center gap-2 relative focus:border-none active:border-none focus:outline-none active:outline-none">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleOnChange}
            className={`w-[45vw] bg-[#f6f5e5] 
              ${suggestions.length > 0 ? `rounded-t-xl` : `rounded-full`}
             text-black focus:outline-none outline-none active:outline-none border-none focus:border-none active:border-none`}
            tabIndex={0}
            ref={(input) => input}
            // onBlur={handleBlur}
          />
          <button
            type="submit"
            onClick={onSubmit}
            className="border-2 flex items-center justify-center absolute  z-30 right-0 h-full rounded-tr-lg md:w-[12%] w-[20%] border-none hover:backdrop-brightness-90 max-w-[60px]"
          >
            <FaSearch />
          </button>
        </div>
        {renderSuggestions()}
      </div>
    </form>
  );
}
