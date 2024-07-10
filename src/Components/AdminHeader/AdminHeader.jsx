import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { localServ } from "../../service/localStorageService";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdateUser, setUserAccessToken } from "../../redux/modalSlice";
import UpdateUserModal from "../Modal/UpdateUserModal/UpdateUserModal";
import { setIsSideBarOpen } from "../../redux/navigateSlice";

export default function AdminHeader() {
  const { isSideBarOpen } = useSelector((state) => state.navigateSlice);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = localServ.getUser();

  const accessToken = localServ.getAccessToken();

  const handleToggleMenu = (event) => {
    // Ngăn chặn sự kiện click document lan truyền đến phần tử menu btn
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Bắt sự kiện click trên toàn bộ tài liệu (document)
    const handleDocumentClick = () => {
      if (isMenuOpen) {
        // Nếu không phải click vào menu thì đóng menu
        handleCloseMenu();
      }
    };

    // Thêm sự kiện vào tài liệu khi component mount
    document.addEventListener("click", handleDocumentClick);

    // Xóa sự kiện khi component unmount để tránh rò rỉ bộ nhớ
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMenuOpen]);

  let handleAccountChange = () => {
    dispatch(setIsUpdateUser(true));
    dispatch(setUserAccessToken(accessToken));
  };

  let handleLogOut = () => {
    localServ.removeUser();
    localServ.removeAccessToken();
    window.location.href = "/";
  };

  let handleToggleSideBar = () => {
    dispatch(setIsSideBarOpen(!isSideBarOpen));
  };

  return (
    <>
      {/* admin header */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={handleToggleSideBar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Mở thanh điều hướng</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <NavLink to={"/"} className="brand ml-2 sm:ml-0">
                <img
                  src="/assets/img/logo.svg"
                  alt="brand"
                  className="brand-logo"
                />
                <span className="brand-text text-white">PBTC</span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div>
                  <button
                    onClick={handleToggleMenu}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Mở tùy chọn người dùng</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://ui-avatars.com/api/?background=random&name=${user.hoTen}`}
                      alt={user.hoTen}
                    />
                  </button>
                </div>
                <div
                  id="userMenu"
                  onClick={(event) => event.stopPropagation()} //ngăn chặn sự kiện click document lan truyền tới menu
                  className={`absolute right-0 z-50 my-3 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${
                    isMenuOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user.hoTen}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button
                        onClick={handleAccountChange}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Cập nhật thông tin
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Update User modal */}
      <UpdateUserModal />
    </>
  );
}
