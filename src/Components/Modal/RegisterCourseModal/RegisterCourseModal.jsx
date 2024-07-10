import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId, setIsRegisterCourse } from "../../../redux/modalSlice";
import { HiUserAdd } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { https } from "../../../service/config";
import { localServ } from "../../../service/localStorageService";
import { message } from "antd";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function RegisterCourseModal() {
  const { isRegisterCourse, courseId } = useSelector((state) => state.modalSlice);

  const postId = { maKhoaHoc: courseId };

  const accessToken = localServ.getAccessToken();

  const [unregisterList, setUnregisterList] = useState([]);

  const [waitList, setWaitList] = useState([]);

  const [joinList, setJoinList] = useState([]);

  const [registerInfo, setRegisterInfo] = useState({
    maKhoaHoc: "",
    taiKhoan: "",
  });

  //   pagination
  const itemsPerPage = 5;

  const [currentWaitListPage, setCurrentWaitListPage] = useState(1);
  const [currentJoinListPage, setCurrentJoinListPage] = useState(1);

  const startWaitListIndex = (currentWaitListPage - 1) * itemsPerPage;
  const startJoinListIndex = (currentJoinListPage - 1) * itemsPerPage;

  const waitListToDisplay = waitList.slice(
    (currentWaitListPage - 1) * itemsPerPage,
    currentWaitListPage * itemsPerPage
  );
  const joinListToDisplay = joinList.slice(
    (currentJoinListPage - 1) * itemsPerPage,
    currentJoinListPage * itemsPerPage
  );

  const totalWaitListPages = Math.ceil(waitList.length / itemsPerPage);
  const totalJoinListPages = Math.ceil(joinList.length / itemsPerPage);

  const handleWaitListPageChange = (newPage) => {
    setCurrentWaitListPage(newPage);
  };
  const handleJoinListPageChange = (newPage) => {
    setCurrentJoinListPage(newPage);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (postId.maKhoaHoc) {
      https
        .post("/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", postId, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUnregisterList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      https
        .post("/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", postId, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setWaitList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      https
        .post("/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", postId, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setJoinList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [courseId, accessToken]);

  let handleCloseModal = () => {
    dispatch(setIsRegisterCourse(false));
    dispatch(setCourseId(""));
    setCurrentWaitListPage(1);
    setCurrentJoinListPage(1);
  };

  let handleRegister = (event) => {
    event.preventDefault();

    https
      .post("/api/QuanLyKhoaHoc/GhiDanhKhoaHoc", registerInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        message.success(res.data);

        https
          .post("/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", postId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setJoinList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleAccept = (userAccount) => {
    const acceptInfo = { maKhoaHoc: courseId, taiKhoan: userAccount };

    https
      .post("/api/QuanLyKhoaHoc/GhiDanhKhoaHoc", acceptInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        message.success(res.data);

        https
          .post("/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", postId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setWaitList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        https
          .post("/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", postId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setJoinList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleCancel = (userAccount) => {
    const cancelInfo = { maKhoaHoc: courseId, taiKhoan: userAccount };

    https
      .post("/api/QuanLyKhoaHoc/HuyGhiDanh", cancelInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        message.success(res.data);

        https
          .post("/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", postId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setWaitList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        https
          .post("/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", postId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setJoinList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };

  return isRegisterCourse ? (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ghi danh khóa học{" "}
              <span className="text-gray-300">{courseId}</span>
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
          {/* register by name */}
          <form
            onSubmit={handleRegister}
            className="pb-4 mb-4 border-b sm:mb-5 dark:border-gray-600"
          >
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Ghi danh học viên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <HiUserAdd className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="unregistered-search"
                list="unregistered-list"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                placeholder="Tìm kiếm học viên muốn ghi danh"
                required
                onChange={(e) => {
                  setRegisterInfo((prevState) => ({
                    ...prevState,
                    taiKhoan: e.target.value,
                    maKhoaHoc: courseId,
                  }));
                }}
              />
              <datalist id="unregistered-list">
                {unregisterList.map((user) => {
                  return (
                    <option key={user.taiKhoan} value={user.taiKhoan}>
                      {user.hoTen}
                    </option>
                  );
                })}
              </datalist>

              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              >
                Ghi danh
              </button>
            </div>
          </form>

          {/* wait list */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-4 mb-4 border-b sm:mb-5 dark:border-gray-600">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h4 className="text-gray-500 font-medium text-lg dark:text-gray-200">
                  Học viên chờ xét duyệt
                </h4>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tài khoản
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Họ tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tùy chọn
                  </th>
                </tr>
              </thead>
              <tbody>
                {waitListToDisplay.length > 0 ? (
                  waitListToDisplay.map((user, index) => {
                    const absoluteIndex = startWaitListIndex + index + 1;
                    return (
                      <tr
                        key={user.taiKhoan}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">{absoluteIndex}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user.taiKhoan}
                        </th>
                        <td className="px-6 py-4">{user.hoTen}</td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center space-x-2">
                            {/* accept */}
                            <button
                              onClick={() => handleAccept(user.taiKhoan)}
                              type="button"
                              className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                            >
                              Duyệt
                            </button>

                            <span>|</span>

                            {/* cancel */}
                            <button
                              onClick={() => handleCancel(user.taiKhoan)}
                              type="button"
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            >
                              Hủy
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4 text-center" colSpan={4}>
                      Chưa có học viên chờ xét duyệt
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* pagination */}
            {totalWaitListPages > 1 ? (
              <nav
                className="flex items-center justify-center pt-4"
                aria-label="Table navigation"
              >
                <ul className="inline-flex -space-x-px text-sm h-8">
                  <li>
                    <button
                      onClick={() =>
                        handleWaitListPageChange(currentWaitListPage - 1)
                      }
                      disabled={currentWaitListPage === 1}
                      className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                        currentWaitListPage === 1
                          ? "cursor-not-allowed"
                          : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      <BsChevronLeft />
                    </button>
                  </li>
                  {Array.from({ length: totalWaitListPages }, (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleWaitListPageChange(index + 1)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:text-gray-400 ${
                          currentWaitListPage === index + 1
                            ? "dark:bg-gray-700 dark:text-white"
                            : "dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        handleWaitListPageChange(currentWaitListPage + 1)
                      }
                      disabled={currentWaitListPage === totalWaitListPages}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                        currentWaitListPage === totalWaitListPages
                          ? "cursor-not-allowed"
                          : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      <BsChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            ) : null}
          </div>

          {/* join list */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between pb-4">
              <div>
                <h4 className="text-gray-500 font-medium text-lg dark:text-gray-200">
                  Học viên đã tham gia
                </h4>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tài khoản
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Họ tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tùy chọn
                  </th>
                </tr>
              </thead>
              <tbody>
                {joinListToDisplay.length > 0 ? (
                  joinListToDisplay.map((user, index) => {
                    const absoluteIndex = startJoinListIndex + index + 1;
                    return (
                      <tr
                        key={user.taiKhoan}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">{absoluteIndex}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user.taiKhoan}
                        </th>
                        <td className="px-6 py-4">{user.hoTen}</td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center space-x-2">
                            {/* cancel */}
                            <button
                              onClick={() => handleCancel(user.taiKhoan)}
                              type="button"
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                            >
                              Hủy
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4 text-center" colSpan={4}>
                      Chưa có học viên tham gia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* pagination */}
            {totalJoinListPages > 1 ? (
              <nav
                className="flex items-center justify-center pt-4"
                aria-label="Table navigation"
              >
                <ul className="inline-flex -space-x-px text-sm h-8">
                  <li>
                    <button
                      onClick={() =>
                        handleJoinListPageChange(currentJoinListPage - 1)
                      }
                      disabled={currentJoinListPage === 1}
                      className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                        currentJoinListPage === 1
                          ? "cursor-not-allowed"
                          : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      <BsChevronLeft />
                    </button>
                  </li>
                  {Array.from({ length: totalJoinListPages }, (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleJoinListPageChange(index + 1)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:border-gray-700 dark:text-gray-400 ${
                          currentJoinListPage === index + 1
                            ? "dark:bg-gray-700 dark:text-white"
                            : "dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        handleJoinListPageChange(currentJoinListPage + 1)
                      }
                      disabled={currentJoinListPage === totalJoinListPages}
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
                        currentJoinListPage === totalJoinListPages
                          ? "cursor-not-allowed"
                          : "hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`}
                    >
                      <BsChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
