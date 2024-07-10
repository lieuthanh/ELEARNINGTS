import React from "react";
import { NavLink } from "react-router-dom";
import { localServ } from "../../../service/localStorageService";
import { useDispatch } from "react-redux";
import { setExpandUser } from "../../../redux/navigateSlice";

export default function UserNavTablet() {
  const userLogin = localServ.getUser();

  const dispatch = useDispatch();

  let handleLogout = () => {
    localServ.removeUser();

    localServ.removeAccessToken();

    window.location.href = "/";
  };

  let handleCloseUserNav = () => {
    dispatch(setExpandUser(false));
  };

  return (
    <>
      {userLogin ? (
        <ul className="user-dropdown__nav">
          {userLogin.maLoaiNguoiDung === "GV" && (
            <>
              <li>
                <NavLink to="/admin/quan-ly-khoa-hoc">Quản lý Khóa học</NavLink>
              </li>
              <li>
                <NavLink to="/admin/quan-ly-nguoi-dung">
                  Quản lý Người dùng
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink onClick={handleCloseUserNav} to="/tai-khoan">
              Tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout}>Đăng xuất</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="user-dropdown__nav">
          <li>
            <NavLink onClick={handleCloseUserNav} to={"/dang-nhap"}>
              Đăng nhập
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleCloseUserNav} to={"/dang-ky"}>
              Đăng ký
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}
