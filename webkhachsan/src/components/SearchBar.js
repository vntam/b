import React from "react";
import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="Search-Bar">
            <input type ="text" placeholder="Bạn muốn đi đâu" />
            <input type ="date" />
            <input type = "date" />
            <button > Tìm Khách Sạn </button>
        </div>
    );
}

export default SearchBar;