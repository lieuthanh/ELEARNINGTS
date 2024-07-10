import React, { useEffect, useState } from "react";
import { RiGridFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import SearchNav from "./SearchNav/SearchNav";
import PageNav from "./PageNav/PageNav";
import UserNav from "./UserNav/UserNav";
import { useDispatch, useSelector } from "react-redux";
import {
  setDropdown,
  setExpandNav,
  setExpandSearch,
  setExpandUser,
} from "../../redux/navigateSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { localServ } from "../../service/localStorageService";
import { FaUserCog, FaUserTimes } from "react-icons/fa";
import { MdClose, MdSearchOff } from "react-icons/md";

export default function HeaderTablet() {
  const { expandNav, expandSearch, expandUser } = useSelector(
    (state) => state.navigateSlice
  );

  const userLogin = localServ.getUser();

  const dispatch = useDispatch();

  expandNav || expandSearch || expandUser
    ? document.body.classList.add("overflow-y-hidden")
    : document.body.classList.remove("overflow-y-hidden");

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    window.removeEventListener("scroll", onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("overflow-y-hidden");
      dispatch(setExpandNav(false));
      dispatch(setExpandSearch(false));
      dispatch(setExpandUser(false));
      dispatch(setDropdown(false));
    };
  }, [dispatch]);

  let handleClearDropdown = () => {
    dispatch(setDropdown(false));
  };

  let handleClearExpand = () => {
    dispatch(setExpandNav(false));
    dispatch(setExpandSearch(false));
    dispatch(setExpandUser(false));
  };

  let handleExpandNav = () => {
    dispatch(setExpandNav(!expandNav));

    dispatch(setExpandSearch(false));

    dispatch(setExpandUser(false));
  };

  let handleExpandSearch = () => {
    dispatch(setExpandSearch(!expandSearch));

    dispatch(setExpandNav(false));

    dispatch(setExpandUser(false));
  };

  let handleExpandUser = () => {
    dispatch(setExpandUser(!expandUser));

    dispatch(setExpandNav(false));

    dispatch(setExpandSearch(false));
  };

  return (
    <>
      <header className={`header ${offset > 0 ? "header-scroll" : ""}`}>
        <div className="container">
          <div className="header-content">
            {/* brand */}
            <NavLink
              to={"/"}
              onClick={() => {
                handleClearExpand();
                handleClearDropdown();
              }}
              className="brand"
            >
              <img
                src="/assets/img/logo.svg"
                alt="PBTC"
                className="brand-logo"
              />
              <span className="brand-text">PBTC</span>
            </NavLink>
            {/* expand nav btn */}
            <button
              onClick={handleExpandNav}
              type="button"
              className="c-res__burger"
            >
              {expandNav ? (
                <MdClose className="c-res__icon" />
              ) : (
                <RiGridFill className="c-res__icon" />
              )}
            </button>
            <div className="header-hyper">
              {/* expand search btn */}
              <button
                onClick={handleExpandSearch}
                type="button"
                className="c-res__burger"
              >
                {expandSearch ? (
                  <MdSearchOff className="c-res__icon" />
                ) : (
                  <AiOutlineSearch className="c-res__icon" />
                )}
              </button>
              {/* dropdown button */}
              {userLogin ? (
                <button
                  onClick={handleExpandUser}
                  type="button"
                  className="user-dropdown__btn"
                >
                  {/* avatar */}
                  <div className="user-dropdown__avatar">
                    <img
                      src={`https://ui-avatars.com/api/?background=random&name=${userLogin.hoTen}`}
                      alt={userLogin.hoTen}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {expandUser ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              ) : (
                <button
                  onClick={handleExpandUser}
                  className="c-res__burger"
                >
                  {expandUser ? <FaUserTimes className="c-res__burger c-res__icon" /> : <FaUserCog className="c-res__burger c-res__icon" />}
                </button>
              )}
            </div>
          </div>
          <div className={`c-res__nav ${expandNav ? "expanded" : ""}`}>
            <PageNav />
          </div>
          <div className={`c-res__search ${expandSearch ? "expanded" : ""}`}>
            <SearchNav />
          </div>
          <div className={`c-res__user ${expandUser ? "expanded" : ""}`}>
            <UserNav />
          </div>
        </div>
      </header>

      <div
        onClick={handleClearExpand}
        className={`c-res__overlay ${
          expandNav || expandSearch || expandUser ? "expanded" : ""
        }`}
      ></div>
    </>
  );
}
