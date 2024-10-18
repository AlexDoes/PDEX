import SearchBar from "./NewSearchBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

const SAMPLEDATA = [
  "Amaryllis",
  "Begonia",
  "Carnation",
  "Daffodil",
  "Eustoma",
  "Freesia",
  "Geranium",
  "Hollyhock",
  "Iris",
  "Jasmine",
  "Kangaroo Paw",
  "Lavender",
  "Marigold",
  "Narcissus",
  "Orchid",
  "Petunia",
  "Queen Anne's Lace",
  "Rose",
  "Sunflower",
  "Tulip",
  "Umbrella Plant",
  "Violet",
  "Wisteria",
  "Xeranthemum",
  "Yellow Archangel",
  "Zinnia",
  "Bleeding Heart",
  "Coreopsis",
  "Dahlia",
  "English Bluebell",
  "Fuchsia",
  "Gardenia",
  "Hibiscus",
  "Iceland Poppy",
  "Jack-in-the-pulpit",
  "Kalmia",
  "Lily of the Valley",
  "Monkshood",
  "Nigella",
  "Oriental Poppy",
  "Pansy",
  "Queen of the Prairie",
  "Russian Sage",
  "Snapdragon",
  "Tiger Lily",
  "Uva Ursi",
  "Verbena",
  "White Campion",
  "Xanthoceras",
  "Yellow Flag",
  "Zantedeschia",
];

function memoize(func: any) {
  const [cache, setCache] = useState(new Map());
  return (...args: any) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    setCache(new Map(cache.set(key, result)));
    return result;
  };
}

export default function NavBarSearchBar({}) {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${searchText}`);
  };

  const handleOnChange = async (e: any) => {
    const input = e.target.value;
    setSearchText(input);
  };

  const getSuggestions = async (input: string) => {
    if (input.length <= 2) {
      return [];
    }
    const data = await fetch(
      `/api/search/getSearchBarData?searchTerm=${searchText}`
    );
    const response = await data.json();
    response.filter((item: any) => {
      const res = item.toLowerCase().includes(input.toLowerCase());
      return res;
    });
    return [response];
  };

  const memoizedGetSuggestions = memoize(getSuggestions);

  useEffect(() => {
    if (searchText.length > 2) {
      const res = memoizedGetSuggestions(searchText);
      Promise.resolve(res).then((value) => {
        setSuggestions(value[0]);
      });
    }
  }, [searchText]);

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    if (searchText.length <= 2) {
      return null;
    }

    return (
      <ul
        className={`w-inherit
      absolute
      top-[100%]
        w-[20vw]
      `}
      >
        {suggestions.slice(0, 6).map((item: string) => (
          <li
            key={item}
            onClick={handleClickingSuggestion}
            className="
            bg-white
            cursor-pointer
            hover:bg-gray-200
            border-2 border-black
            indent-3
            "
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const handleClickingSuggestion = (e: any) => {
    const input = e.target.innerText;
    setSearchText(input);
    setSuggestions([]);
  };

  return (
    <form>
      <div className="flex flex-col border-8 items-start relative">
        <div className="flex flex-row justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleOnChange}
            className="w-[20vw]"
          />
        </div>
        {renderSuggestions()}
      </div>
      <button type="submit" onClick={onSubmit}>
        <FaSearch />
      </button>
    </form>
  );
}
