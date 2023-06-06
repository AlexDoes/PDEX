import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
  data: string[];
  width: string;
  placeHolder: string;
  onChange: (entry: string) => void;
}

export default function NewSearchBar({
  data,
  width,
  onChange,
  placeHolder,
}: Props) {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleOnChange = (e: any) => {
    onChange(e.target.value);
    const input = e.target.value;
    setSearchText(input);
    const newSuggestions = getSuggestions(input);
    setSuggestions(newSuggestions);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const input = e.target.value;
  };

  const getSuggestions = (input: string) => {
    const suggestions = data.filter((item: any) => {
      const res = item.toLowerCase().includes(input.toLowerCase());
      return res;
    });
    if (suggestions[0] === input) {
      return [];
    }
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
      w-full
      border-none
      z-20
      `}
      >
        {suggestions.slice(0, 3).map((item: string) => (
          <li
            key={item}
            onClick={handleClickingSuggestion}
            className="
            bg-[#d5f3a9]
            cursor-pointer
            hover:bg-gray-100
            indent-3
            z-index
            text-lg
            font-light
            min-h-[30px]
            rounded-bl-lg
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
    <div className="flex flex-col items-start relative">
      <div className="flex flex-row justify-center items-center gap-2 w-full">
        <input
          type="text"
          placeholder={placeHolder}
          value={searchText}
          onChange={handleOnChange}
          onBlur={() => setSuggestions([])}
          className={`w-full border-none rounded-r-md bg-[#efe6c1] ${
            suggestions.length > 0 && `rounded-br-none`
          }`}
        />
      </div>
      {renderSuggestions()}
    </div>
  );
}
