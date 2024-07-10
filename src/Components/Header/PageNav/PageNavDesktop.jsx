import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { https } from "../../../service/config";
import { setCategoryList } from "../../../redux/navigateSlice";
import { FiChevronDown } from "react-icons/fi";

export default function PageNavDesktop() {
  const { navigateList, categoryList } = useSelector(
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

  let renderCategoryList = () => {
    return categoryList.map(({ maDanhMuc, tenDanhMuc }) => {
      return (
        <li key={maDanhMuc}>
          <NavLink to={`/khoa-hoc/${maDanhMuc}`}>{tenDanhMuc}</NavLink>
        </li>
      );
    });
  };

  let renderNavigateList = () => {
    return navigateList.map(({ id, title, href }) => {
      return id == "khoa-hoc" ? (
        <li key={id} className="page-dropdown">
          <NavLink to={href} className="page-nav__link page-nav__link--drop">
            <span>{title}</span>
            <FiChevronDown />
          </NavLink>
          <ul className="page-dropdown__nav">{renderCategoryList()}</ul>
        </li>
      ) : (
        <li key={id}>
          <NavLink to={href} className="page-nav__link">
            {title}
          </NavLink>
        </li>
      );
    });
  };

  return <ul className="page-nav">{renderNavigateList()}</ul>;
}
