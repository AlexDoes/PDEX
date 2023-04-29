import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  data: string[];
  width: string;
  onChange: (entry: string) => void;
}

export default function SearchBar({ data, width, onChange }: Props) {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  //   const data = props.data;
  //   const width = props.width;
  const handleOnChange = (e: any) => {
    onChange(e.target.value);
    const input = e.target.value;
    setSearchText(input);
    const newSuggestions = getSuggestions(input);
    setSuggestions(newSuggestions);
  };

  const getSuggestions = (input: string) => {
    const suggestions = data.filter((item: any) => {
      const res = item.toLowerCase().includes(input.toLowerCase());
      return res;
    });
    return suggestions || [];
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    if (searchText.length < 2) {
      return null;
    }
    return (
      <ul
        className={`w-inherit
      absolute  
      top-[100%]
      ${width}
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
    onChange(input);
  };

  return (
    <div className="flex flex-col border-8 items-start relative">
      <div className="flex flex-row justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleOnChange}
          className={width}
        />
        <button>
          <FaSearch />
        </button>
      </div>
      {renderSuggestions()}
    </div>
  );
}
