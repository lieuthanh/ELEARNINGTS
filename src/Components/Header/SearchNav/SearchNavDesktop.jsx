import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdSearchOff } from "react-icons/md";
import { useNavigate } from "react-router";

export default function SearchNavDesktop() {
  const [expand, setExpand] = useState(false);

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  let handleExpandInput = () => {
    setExpand(!expand);
  };

  let handleOnChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  let handleSearch = (event) => {
    event.preventDefault();

    searchText
      ? (() => {
          navigate(`/tim-kiem/${searchText}`);
          setSearchText("");
        })()
      : navigate("/");
  };

  return (
    <form onSubmit={handleSearch} className="c-search">
      <input
        className={`c-search__input ${expand ? "c-search__input--expand" : ""}`}
        type="text"
        id="searchCourse"
        placeholder="Tìm kiếm khóa học"
        autoFocus={expand}
        value={searchText}
        onChange={handleOnChange}
      />
      <span onClick={handleExpandInput} className="c-search__btn">
        {expand ? (
          <MdSearchOff className="c-search__icon" />
        ) : (
          <AiOutlineSearch className="c-search__icon" />
        )}
      </span>
    </form>
  );
}
