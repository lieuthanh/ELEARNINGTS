import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreateUser } from "../../../redux/modalSlice";
import { MdOutlineClose } from "react-icons/md";
import { https } from "../../../service/config";
import { AiOutlinePlus } from "react-icons/ai";
import { localServ } from "../../../service/localStorageService";
import { message } from "antd";
import { setUserList } from "../../../redux/userSlice";

export default function CreateUserModal() {
  const { isCreateUser } = useSelector((state) => state.modalSlice);

  const accessToken = localServ.getAccessToken();

  const [userType, setUserType] = useState("");

  const initialUserInfo = {
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
    email: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    https
      .get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
      .then((res) => {
        setUserType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let resetUserInfo = () => {
    setUserInfo(initialUserInfo)
  };

  let handleCloseModal = () => {
    resetUserInfo();
    dispatch(setIsCreateUser(false));
  };

  let handleCreate = (event) => {
    event.preventDefault();
    https
      .post("/api/QuanLyNguoiDung/ThemNguoiDung", userInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        message.success("Thêm người dùng thành công");
        
        https
          .get("/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01")
          .then((res) => {
            dispatch(setUserList(res.data));
          })
          .catch((err) => {
            console.log(err);
          });

        handleCloseModal();
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };

  return isCreateUser ? (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Thêm người dùng <br />
              <span className="text-xs sm:text-sm text-gray-400">
                (Mã nhóm {userInfo.maNhom})
              </span>
            </h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <MdOutlineClose className="w-5 h-5" />
              <span className="sr-only">Đóng</span>
            </button>
          </div>
          {/* Modal body */}
          <form onSubmit={handleCreate}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="taiKhoan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  name="taiKhoan"
                  id="taiKhoan"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  placeholder="Nhập tài khoản"
                  required
                  value={userInfo.taiKhoan}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      taiKhoan: e.target.value.trim(),
                    }));
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="matKhau"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="matKhau"
                  id="matKhau"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  placeholder="Nhập mật khẩu"
                  required
                  value={userInfo.matKhau}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      matKhau: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="hoTen"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  name="hoTen"
                  id="hoTen"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  placeholder="Nhập họ tên"
                  required
                  value={userInfo.hoTen}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      hoTen: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  placeholder="Nhập email"
                  required
                  value={userInfo.email}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="soDT"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="soDT"
                  id="soDT"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  placeholder="Nhập số điện thoại"
                  required
                  value={userInfo.soDT}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      soDT: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="maLoaiNguoiDung"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loại người dùng
                </label>
                <select
                  id="maLoaiNguoiDung"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      maLoaiNguoiDung: e.target.value,
                    }));
                  }}
                >
                  {userType
                    ? userType.map((type) => (
                        <option
                          key={type.maLoaiNguoiDung}
                          value={type.maLoaiNguoiDung}
                        >
                          {type.tenLoaiNguoiDung}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="flex-auto sm:flex-initial text-white inline-flex items-center justify-center space-x-1 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <AiOutlinePlus />
                <span>Thêm</span>
              </button>
              <button
                onClick={handleCloseModal}
                type="button"
                className="flex-auto sm:flex-initial text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
