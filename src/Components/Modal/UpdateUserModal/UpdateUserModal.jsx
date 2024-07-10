import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localServ } from "../../../service/localStorageService";
import { setIsUpdateUser, setUserAccessToken } from "../../../redux/modalSlice";
import { https } from "../../../service/config";
import { MdOutlineClose } from "react-icons/md";
import { message } from "antd";
import { setUserList } from "../../../redux/userSlice";
import { RxUpdate } from "react-icons/rx";

export default function UpdateUserModal() {
  const { isUpdateUser, userAccessToken } = useSelector(
    (state) => state.modalSlice
  );

  const accessToken = localServ.getAccessToken();

  const [userType, setUserType] = useState("");

  const initialUserInfo = {
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "",
    email: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAccessToken) {
      https
        .post(
          "/api/QuanLyNguoiDung/ThongTinNguoiDung",
          {},
          {
            headers: {
              Authorization: `Bearer ${userAccessToken}`,
            },
          }
        )
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    https
      .get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
      .then((res) => {
        setUserType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userAccessToken]);

  let resetUserInfo = () => {
    setUserInfo(initialUserInfo);
  };

  let handleCloseModal = () => {
    resetUserInfo();
    dispatch(setUserAccessToken(""));
    dispatch(setIsUpdateUser(false));
  };

  let handleUpdate = (event) => {
    event.preventDefault();

    https
      .put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        message.success("Cập nhật thành công");

        if (userAccessToken !== accessToken) {
          https
            .get("/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01")
            .then((res) => {
              dispatch(setUserList(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          localServ.setUser(res.data);

          https
            .get("/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01")
            .then((res) => {
              dispatch(setUserList(res.data));
            })
            .catch((err) => {
              console.log(err);
            });
        }

        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isUpdateUser? (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cập nhật người dùng <br />
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
          <form onSubmit={handleUpdate}>
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
                  disabled
                  value={userInfo.taiKhoan}
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
                  disabled={accessToken === userAccessToken}
                  onChange={(e) => {
                    setUserInfo((prevState) => ({
                      ...prevState,
                      maLoaiNguoiDung: e.target.value,
                    }));
                  }}
                >
                  <option value={userInfo.maLoaiNguoiDung}>
                    {userType.find(
                      (type) =>
                        type.maLoaiNguoiDung === userInfo.maLoaiNguoiDung
                    )?.tenLoaiNguoiDung || ""}
                  </option>
                  {userType
                    ? userType
                        .filter(
                          (type) =>
                            type.maLoaiNguoiDung !== userInfo.maLoaiNguoiDung
                        )
                        .map((type) => (
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
                className="flex-auto sm:flex-initial text-white inline-flex items-center justify-center space-x-1 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                <RxUpdate />
                <span>Cập nhật</span>
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
