import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { https } from "../../../service/config";
import {
  setCategoryList,
  setDropdown,
  setExpandNav,
} from "../../../redux/navigateSlice";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function PageNavTablet() {
  const { navigateList, categoryList, dropdown } = useSelector(
    (state) => state.navigateSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    https
      .get("/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
      .then((res) => {
        dispatch(setCategoryList(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  let handleClearExpand = () => {
    dispatch(setExpandNav(false));
  };

  let handleClearDropdown = () => {
    dispatch(setDropdown(false));
  };

  let handleDropDown = () => {
    dispatch(setDropdown(!dropdown));
  };

  let renderCategoryList = () => {
    return (
      <ul
        className={`page-dropdown__nav ${
          dropdown ? "page-dropdown__nav--drop" : ""
        }`}
      >
        {categoryList.map(({ maDanhMuc, tenDanhMuc }) => {
          return (
            <li key={maDanhMuc}>
              <NavLink
                onClick={() => {
                  handleClearExpand();
                  handleClearDropdown();
                }}
                to={`/khoa-hoc/${maDanhMuc}`}
              >
                {tenDanhMuc}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  };

  let renderNavigateList = () => {
    return navigateList.map(({ id, title, href }) => {
      return id == "khoa-hoc" ? (
        <li key={id} className="page-dropdown">
          <span
            onClick={handleDropDown}
            className="page-nav__link page-nav__link--drop"
          >
            <span>{title}</span>
            {dropdown ? <FiChevronUp /> : <FiChevronDown />}
          </span>
          {renderCategoryList()}
        </li>
      ) : (
        <li key={id}>
          <NavLink
            onClick={() => {
              handleClearExpand();
              handleClearDropdown();
            }}
            to={href}
            className="page-nav__link"
          >
            {title}
          </NavLink>
        </li>
      );
    });
  };

  return <ul className="page-nav">{renderNavigateList()}</ul>;
}
