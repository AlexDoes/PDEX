import { useState } from "react";

export default function SearchBar() {
  const listBox = {
    displayField: "Plant name",
    data: async (query: string) => {
      const response = await fetch(`public/species.json`);
      const data = await response.json();
      console.log(data);
      return data;
    },
    searchType: "startsWith",
  };

  return (
    <div>
      <div className="search-bar">
        <div className="search-bar__input">
          <input type="text" placeholder="Search for a plant" />
        </div>
        <div className="search-bar__button">
          <button>Search</button>
        </div>
      </div>
      <div className="search-bar__list">
        <div className="search-bar__list__item">
          <div className="search-bar__list__item__image">
            <i className="fas fa-leaf" style={{ fontSize: "2rem" }}></i>
          </div>
          <div className="search-bar__list__item__name">
            <p>Plant name</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// async function check() {
//     // species.json is in the public folder
//     // fetch from species.json
//     // let response = await fetch(`./public/species.json`)
//     let response = await fetch(`/Users/alex/Desktop/pdex/public/data/page200.json`)
//     let data = await response.json()
//     console.log(data)
//     return data
// }

// check();
