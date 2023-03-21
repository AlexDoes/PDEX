import SearchBar from "./searchBar";
import { useEffect, useState } from "react";

export default function PlantForm(tempdata: any) {
  const [user, setUser] = useState<string>("4");
  //   const [suggestions, setSuggestions] = useState<string[]>([]);
  //   const data = Object.keys(tempdata.props);
  //   console.log(data);

  return (
    <div>
      <form>
        <div>
          <label>Collection Name: </label>
          <input type="text" style={{ border: "1px solid black" }} />
          <label></label>
        </div>

        <div>
          <label> Species 1 </label>
          <SearchBar props={tempdata.props} />
        </div>

        <div>
          <label> Species 2</label>
          <SearchBar props={tempdata.props} />
        </div>
      </form>
    </div>
  );
}
