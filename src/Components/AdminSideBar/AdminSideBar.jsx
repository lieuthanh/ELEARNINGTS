import React from "react";
import "./AdminSideBar.scss";
import { NavLink } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { SiCoursera } from "react-icons/si";
import { ImHome } from "react-icons/im";
import { useSelector } from "react-redux";

export default function AdminSideBar() {
  const { isSideBarOpen } = useSelector((state) => state.navigateSlice);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="c-admin__sidebar space-y-2 font-medium">
          <li>
            <NavLink
              to={"/"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ImHome className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">Trang chủ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/quan-ly-khoa-hoc"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <SiCoursera className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Quản lý Khóa học
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin/quan-ly-nguoi-dung"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Quản lý Người dùng
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
