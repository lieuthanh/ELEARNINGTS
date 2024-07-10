import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setExpandSearch } from "../../../redux/navigateSlice";

export default function SearchNavTablet() {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let handleOnChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  let handleSearch = (event) => {
    event.preventDefault();

    dispatch(setExpandSearch(false));
    
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
        className={`c-search__input c-search__input--tablet`}
        type="text"
        id="searchCourse"
        placeholder="Tìm kiếm khóa học"
        value={searchText}
        onChange={handleOnChange}
      />
      <button onClick={handleSearch} type="button" className="c-search__btn">
        <AiOutlineSearch className="c-search__icon"></AiOutlineSearch>
      </button>
    </form>
  );
}
