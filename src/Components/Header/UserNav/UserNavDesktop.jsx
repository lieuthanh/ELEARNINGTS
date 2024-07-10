import React from "react";
import { NavLink } from "react-router-dom";
import { localServ } from "../../../service/localStorageService";
import { FiChevronDown } from "react-icons/fi";

export default function UserNavDesktop() {
  const userLogin = localServ.getUser();

  let handleLogout = () => {
    localServ.removeUser();

    localServ.removeAccessToken();

    window.location.href = "/";
  };

  return (
    <>
      {userLogin ? (
        <div className="user-dropdown">
          {/* dropdown button */}
          <button className="user-dropdown__btn">
            {/* avatar */}
            <div className="user-dropdown__avatar">
              <img
                src={`https://ui-avatars.com/api/?background=random&name=${userLogin.hoTen}`}
                alt={userLogin.hoTen}
                className="w-full h-full object-cover"
              />
            </div>
            <FiChevronDown />
          </button>

          {/* dropdown user */}
          <ul className="user-dropdown__nav">
            {userLogin.maLoaiNguoiDung === "GV" && (
              <>
                <li>
                  <NavLink to="/admin/quan-ly-khoa-hoc">
                    Quản lý Khóa học
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/quan-ly-nguoi-dung">
                    Quản lý Người dùng
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/tai-khoan">Tài khoản</NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout}>Đăng xuất</NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <ul className="user-nav">
          <li>
            <NavLink to={"/dang-nhap"} className="btn btn-pill btn-secondary">
              Đăng nhập
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dang-ky"} className="btn btn-pill btn-primary">
              Đăng ký
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}
