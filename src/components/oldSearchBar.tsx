import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const suggestionsStyle = {
  position: "absolute" as "absolute",
  flexDirection: "column" as "column",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
  width: "75%",
  height: "",
  border: "2px solid black",
  cursor: "pointer",
};

const divStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  padding: "10px",
};

const buttonStyle = {
  border: "3px solid black",
  borderRadius: "5px",
  justifyContent: "center",
};

const searchBarStyle = {
  width: "80%",
  borderTopRightRadius: "30px",
  borderBottomRightRadius: "30px",
  textIndent: "10px",
  borderRadius: "30px",
};

export default function SearchBar2(datum: any) {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  let data = Object.keys(datum.props);

  const handleOnChange = (e: any) => {
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

  const handleSuggestionsonClick = (e: any) => {
    const input = e.target.innerText;
    setSearchText(input);
    setSuggestions([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const input = e.target.value;
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul style={suggestionsStyle}>
        {suggestions.slice(0, 5).map((item: string) => (
          <li
            onClick={handleSuggestionsonClick}
            key={item}
            style={{
              width: "100%",
              borderBottom: "1px solid gray",
              textIndent: "10px",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div style={divStyle}>
        <input
          style={searchBarStyle}
          className="searchBarInput"
          type="text"
          value={searchText}
          onChange={handleOnChange}
          placeholder={"Search for Plant"}
        />
        <div
          style={{
            display: "flex",
          }}
        >
          <button style={buttonStyle}>
            <FaSearch />
          </button>
        </div>
      </div>
      {renderSuggestions()}
    </div>
  );
}
